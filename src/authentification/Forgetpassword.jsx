import React from 'react'
import { useNavigate } from 'react-router-dom';

const Forgetpassword = () => {
   const navigate = useNavigate()
   const handlogin = () => {
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
                    <h2> mot de passe oublié ?</h2>

                    <p className="text-gray-700 mb-4 text-sm">
                        entrez votre address email ci-dessous et nous vous envenyerons
                        des instruction sur la facon de modifier le mot de passe .
                    </p>

                    <div className="mb-4">

                        <input
                            type="email"
                            placeholder="E-mail"
                            className="w-full py-2 border-b border-gray-300 focus:outline-none py-2 text-sm"
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <p className='text-white'> revenir a la  <span onClick={handlogin} className='text-yellow-400 cursor-pointer hover:underline'>connexion </span></p>
                </div>

            </div>

        </div>
    )
};
export default Forgetpassword