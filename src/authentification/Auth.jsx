import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import { registerUser } from '../services/authApi';


const Auth = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const Handlog = () => {
        navigate("/")
    };

    const handleRegister = async () => {
        setError('');

        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Nom, email et mot de passe requis');
            return;
        }

        try {
            setIsLoading(true);
            const result = await registerUser({
                name: name.trim(),
                email: email.trim(),
                password: password.trim()
            });
            

            localStorage.setItem('token', result.token);
            sessionStorage.removeItem('token');
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || "Inscription impossible");
        } finally {
            setIsLoading(false);
        }
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
                        incrivez vous  en tant que Admin
                    </p>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
                        />
                    </div>
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
                        <input type="checkbox" className="mr-2"
                            onChange={(e) => setIsChecked(e.target.checked)} />
                        <label className="text-sm text-gray-600">
                            Accepter les termes et la politique
                        </label>
                    </div>

                    {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

                    <button
                        onClick={handleRegister}
                        disabled={!isChecked || isLoading}
                        className={`w-full py-2 rounded-md text-white transition ${isChecked && !isLoading ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        {isLoading ? 'Inscription...' : "S'inscrire"}
                    </button>
                </div>

                {/* Links */}
                <div className="mt-4 text-sm">

                    <p className="text-gray-300 mt-1">
                        vous avez deja un compte ?{' '}
                        <span onClick={Handlog} className="text-yellow-400 cursor-pointer hover:underline">
                            se connecter
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Auth