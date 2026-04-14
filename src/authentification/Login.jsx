import React from 'react'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    //cest pour le backend 
    navigate("/dashboard");
  }
    const  handAuth = () => {
       //cest pour le backend 
        navigate("/Auth");
    };
     const  handforget = () => {
       
        navigate("/forget");
    };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2f3136] relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle,_#ffffff_1px,_transparent_1px)] [background-size:40px_40px]"></div>

      <div className="relative z-10 text-center">
        {/* Logo + Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-5 h-5 bg-white"></div>
          <h1 className="text-white font-semibold tracking-wide">RED PRODUCT</h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-md shadow-md p-6 w-[320px] text-left">
          <p className="text-gray-700 mb-4 text-sm">
            Connectez-vous en tant que Admin
          </p>

          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
            />
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" />
            <label className="text-sm text-gray-600">
              Gardez-moi connecté
            </label>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Se connecter
          </button>
        </div>

        {/* Links */}
        <div className="mt-4 text-sm">
          <p onClick={handforget} className="text-yellow-400 cursor-pointer hover:underline">
            Mot de passe oublié?
          </p>
          <p className="text-gray-300 mt-1">
            Vous n'avez pas de compte?{' '}
            <span onClick={handAuth} className="text-yellow-400 cursor-pointer hover:underline">
              S'inscrire
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;