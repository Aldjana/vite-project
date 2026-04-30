import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, requestPasswordReset } from '../services/authApi';

const RESET_SUCCESS_MESSAGE =
  "Si cette adresse est associée à un compte, un message de réinitialisation vient d'être envoyé. Vérifiez votre boîte e-mail (et les courriers indésirables).";

const Login = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotResetUrl, setForgotResetUrl] = useState('');

  const handleLogin = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email et mot de passe requis');
      return;
    }

    try {
      setIsLoading(true);
      const result = await loginUser({
        email: email.trim(),
        password: password.trim()
      });

      if (rememberMe) {
        localStorage.setItem('token', result.token);
        sessionStorage.removeItem('token');
      } else {
        sessionStorage.setItem('token', result.token);
        localStorage.removeItem('token');
      }

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Connexion impossible');
    } finally {
      setIsLoading(false);
    }
  };

  const handAuth = () => {
    navigate('/auth');
  };

  const openForgot = () => {
    setView('forgot');
    setForgotEmail(email.trim());
    setForgotError('');
    setForgotSuccess('');
    setForgotResetUrl('');
  };

  const backToLogin = () => {
    setView('login');
    setForgotError('');
    setForgotSuccess('');
    setForgotEmail('');
    setForgotResetUrl('');
  };

  const handleForgotSubmit = async () => {
    setForgotError('');
    setForgotSuccess('');

    if (!forgotEmail.trim()) {
      setForgotError('Veuillez entrer votre email');
      return;
    }

    try {
      setForgotLoading(true);
      const result = await requestPasswordReset(forgotEmail.trim());
      if (result?.resetUrl) {
        setForgotResetUrl(result.resetUrl);
        setForgotSuccess('');
      } else {
        setForgotResetUrl('');
        setForgotSuccess(RESET_SUCCESS_MESSAGE);
      }
    } catch (err) {
      setForgotError(err.message || "Impossible d'envoyer le message de réinitialisation");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f3136] relative">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:40px_40px]"></div>

      <div className="relative z-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-5 h-5 bg-white"></div>
          <h1 className="text-white font-semibold tracking-wide">RED PRODUCT</h1>
        </div>

        <div className="bg-white rounded-md shadow-md p-6 w-[320px] text-left">
          {view === 'login' ? (
            <>
              <p className="text-gray-700 mb-4 text-sm">Connectez-vous en tant que Admin</p>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
                />
              </div>

              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="text-sm text-gray-600">Gardez-moi connecté</label>
              </div>

              {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoading}
                className={`w-full text-white py-2 rounded-md transition ${
                  isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
                }`}
              >
                {isLoading ? 'Connexion...' : 'Se connecter'}
              </button>
            </>
          ) : (
            <>
              {!forgotResetUrl && (
                <>
                  <h2 className="text-gray-900 font-medium text-base mb-1">Mot de passe oublié ?</h2>
                  <p className="text-gray-700 mb-4 text-sm">
                    Entrez votre adresse e-mail : nous vous enverrons un message de réinitialisation avec un lien
                    sécurisé.
                  </p>
                </>
              )}

              {!forgotResetUrl && (
                <div className="mb-4">
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full py-2 border-b border-gray-300 focus:outline-none text-sm"
                  />
                </div>
              )}

              {forgotError && <p className="text-red-600 text-xs mb-3">{forgotError}</p>}
              {forgotSuccess && !forgotResetUrl && (
                <p className="text-green-700 text-xs mb-3 leading-relaxed">{forgotSuccess}</p>
              )}
              {forgotResetUrl && (
                <div className="mb-3 text-left">
                  <a
                    href={forgotResetUrl}
                    className="text-xs text-blue-700 break-all underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {forgotResetUrl}
                  </a>
                </div>
              )}

              {!forgotResetUrl && (
                <button
                  type="button"
                  onClick={handleForgotSubmit}
                  disabled={forgotLoading}
                  className={`w-full py-2 rounded-md text-white transition ${
                    forgotLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
                  }`}
                >
                  {forgotLoading ? 'Envoi...' : 'Envoyer le message de réinitialisation'}
                </button>
              )}

              <button
                type="button"
                onClick={backToLogin}
                className={`w-full rounded-md text-sm text-gray-700 border border-gray-300 hover:bg-gray-50 transition ${
                  forgotResetUrl ? 'mt-0 py-2.5' : 'mt-3 py-2'
                }`}
              >
                Retour à la connexion
              </button>
            </>
          )}
        </div>

        <div className="mt-4 text-sm">
          {view === 'login' ? (
            <>
              <p onClick={openForgot} className="text-yellow-400 cursor-pointer hover:underline">
                Mot de passe oublié ?
              </p>
              <p className="text-gray-300 mt-1">
                Vous n&apos;avez pas de compte ?{' '}
                <span onClick={handAuth} className="text-yellow-400 cursor-pointer hover:underline">
                  S&apos;inscrire
                </span>
              </p>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Login;
