import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

const createEmailTransporter = () => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
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
    const transporter = createEmailTransporter();

    let mailOk = false;
    if (transporter) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER,
          to: user.email,
          subject: 'Réinitialisation du mot de passe - RED PRODUCT',
          text: `Réinitialisation : utilisez ce lien pour choisir un nouveau mot de passe : ${resetUrl}\n\nCe lien expire dans 15 minutes.`,
          html: `<p>Réinitialisation : cliquez sur le lien ci-dessous pour choisir un nouveau mot de passe.</p><p><a href="${resetUrl}">${resetUrl}</a></p><p>Ce lien expire dans 15 minutes.</p>`
        });
        console.log('Email envoyé à:', user.email);
        mailOk = true;
      } catch (mailErr) {
        console.log('Erreur envoi email:', mailErr.message);
      }
    } else {
      // Show reset link when SMTP is not configured
      mailOk = false;
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