import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../services/authApi';

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async () => {
    setError('');
    setSuccess('');

    if (!token) {
      setError('Lien de reinitialisation invalide');
      return;
    }

    if (!password.trim() || !confirmPassword.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      setIsLoading(true);
      const result = await resetPassword(token, password);
      setSuccess(result.msg || 'Mot de passe reinitialise avec succes');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || 'Impossible de reinitialiser le mot de passe');
    } finally {
      setIsLoading(false);
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
          <h2 className="mb-2">Reinitialiser le mot de passe</h2>
          <p className="text-gray-700 mb-4 text-sm">
            Entrez un nouveau mot de passe pour votre compte.
          </p>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Nouveau mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirmer le mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-xs mb-3">{error}</p>}
          {success && <p className="text-green-600 text-xs mb-3">{success}</p>}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white transition ${
              isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-800'
            }`}
          >
            {isLoading ? 'Validation...' : 'Valider'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full mt-3 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
          >
            Retour a la connexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
