import { useNavigate } from "react-router-dom";

import React, { useState } from 'react';

const Auth = () => {
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const Handlog = () => {
        navigate("/")
    }


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
                            className="w-full border-b border-gray-300 focus:outline-none py-2 text-sm"
                        />
                    </div>
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
                        <input type="checkbox" className="mr-2"
                            onChange={(e) => setIsChecked(e.target.checked)} />
                        <label className="text-sm text-gray-600">
                            Accepter les termes et la politique
                        </label>
                    </div>

                    <button
                        disabled={!isChecked}
                        className={`w-full py-2 rounded-md text-white transition ${isChecked ? "bg-gray-700 hover:bg-gray-800" : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        S'inscrire
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