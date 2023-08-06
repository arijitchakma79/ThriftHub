import React, { useState } from 'react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { useNavigate } from 'react-router-dom';

const LoginBox = ({ onClose }) => {
  const [showLogin, setShowLogin] = useState(true);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  const handleGoBack = () => {
    onClose(); // Close the LoginBox first
    navigate(-1); // Go back to the homepage
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white rounded-lg shadow-md p-8 w-80">
        <button className="absolute top-2 right-2 text-gray-600" onClick={handleGoBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {showLogin ? <LoginForm onRegisterClick={handleRegisterClick} /> : <RegisterForm onLoginClick={handleLoginClick} />}
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            onClick={handleGoBack}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
