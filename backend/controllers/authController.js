import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { seedHotelsForUser } from '../seed/seedHotels.js';

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email
});

const buildResetUrl = (token) => {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  return `${frontendUrl}/reset-password/${token}`;
};

const sendEmailWithBrevoAPI = async (to, subject, text, html) => {
  const { BREVO_API_KEY } = process.env;
  
  if (!BREVO_API_KEY) {
    console.log(' No Brevo API key found, using Ethereal fallback');
    return null;
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        sender: {
          name: 'RED PRODUCT',
          email: 'seckf004@gmail.com'
        },
        to: [{
          email: to
        }],
        subject: subject,
        htmlContent: html,
        textContent: text
      })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo API error:', error);
      return null;
    }

    const result = await response.json();
    console.log('✅ Email sent via Brevo API:', result.messageId);
    return result;
  } catch (error) {
    console.error('Brevo API failed:', error.message);
    return null;
  }
};

const createEmailTransporter = async () => {
  // Fallback to Ethereal for testing
  console.log(' Using Ethereal for testing');
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log(' Ethereal test account created:');
    console.log(`   Email: ${testAccount.user}`);
    console.log(`   Password: ${testAccount.pass}`);
    console.log(`   URL: https://ethereal.email/messages`);
    
    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error('Failed to create Ethereal account:', error);
    return null;
  }
};

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
   

    if ( !email || !password) {
      return res.status(400).json({ msg: 'Email et mot de passe requis' });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: 'Le mot de passe doit contenir au moins 6 caracteres' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: normalizedEmail });
    if (user) return res.status(409).json({ msg: 'Utilisateur deja existant' });

    const hashedPassword = await bcrypt.hash(password, 10);

    user = new User({
      name: name?.trim() || 'Admin',
      email: normalizedEmail,
      password: hashedPassword
    });

    await user.save();

    // Seed initial hotels for the new user
    await seedHotelsForUser(user._id);

    const token = createToken(user._id);
    res.status(201).json({
      msg: 'Inscription reussie',
      token,
      user: sanitizeUser(user)
    });

  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {
     
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email et mot de passe requis' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).json({ msg: 'Identifiants invalides' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Identifiants invalides' });

    // Seed initial hotels for existing users if they don't have any
    await seedHotelsForUser(user._id);

    const token = createToken(user._id);

    res.json({
      token,
      user: sanitizeUser(user)
    });

  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur introuvable' });
    }

    res.status(200).json({ user: sanitizeUser(user) });
  } catch (err) {
    res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ msg: 'Email requis' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    // Toujours répondre pareil pour éviter l'énumération des emails
    if (!user) {
      return res.status(200).json({
        msg: "Si ce compte existe, un message de réinitialisation vient d'être envoyé à votre adresse e-mail."
      });
    }

    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 15);
    await user.save();

    const resetUrl = buildResetUrl(rawToken);

    // Try Brevo API first
    let mailOk = false;
    const apiResult = await sendEmailWithBrevoAPI(
      user.email,
      'Réinitialisation du mot de passe - RED PRODUCT',
      `Réinitialisation : utilisez ce lien pour choisir un nouveau mot de passe : ${resetUrl}\n\nCe lien expire dans 15 minutes.`,
      `<p>Réinitialisation : cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Ce lien expire dans 15 minutes.</p>`
    );

    if (apiResult) {
      mailOk = true;
      console.log('✅ Email sent via Brevo API to:', user.email);
    } else {
      // Fallback to Ethereal
      const transporter = await createEmailTransporter();
      if (transporter) {
        try {
          const info = await transporter.sendMail({
            from: 'RED PRODUCT <noreply@ethereal.email>',
            to: user.email,
            subject: 'Réinitialisation du mot de passe - RED PRODUCT',
            text: `Réinitialisation : utilisez ce lien pour choisir un nouveau mot de passe : ${resetUrl}\n\nCe lien expire dans 15 minutes.`,
            html: `<p>Réinitialisation : cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Ce lien expire dans 15 minutes.</p>`
          });
          console.log('📧 Email sent via Ethereal to:', user.email);
          if (info.ethereal) {
            console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
          }
          mailOk = true;
        } catch (mailErr) {
          console.log('Erreur envoi email Ethereal:', mailErr.message);
        }
      } else {
        console.log('⚠️ Aucun service email disponible, lien de réinitialisation:', resetUrl);
        mailOk = false;
      }
    }

    const payload = {
      msg: "Si ce compte existe, un message de réinitialisation vient d'être envoyé à votre adresse e-mail."
    };

    
    return res.status(200).json(payload);
  } catch (err) {
    return res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ msg: 'Le mot de passe doit contenir au moins 6 caracteres' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: new Date() }
    });

    if (!user) {
      return res.status(400).json({ msg: 'Lien invalide ou expire' });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return res.status(200).json({ msg: 'Mot de passe reinitialise avec succes' });
  } catch (err) {
    return res.status(500).json({ msg: 'Erreur serveur', error: err.message });
  }
};