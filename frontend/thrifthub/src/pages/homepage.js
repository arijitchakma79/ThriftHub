import React, { useState } from 'react';
import LoginBox from '../components/loginBox';

const HomePage = () => {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-4xl font-bold mb-5">Welcome to Thrifthub</h1>
      <p className="text-lg max-w-lg text-center mb-8">
        At Thrifthub, we are committed to helping you achieve your financial goals through effective
        budgeting and smart money management. Take control of your finances and start saving for a
        better future today!
      </p>
      <button
        className="px-6 py-3 bg-blue-500 text-white text-lg rounded"
        onClick={handleLoginClick}
      >
        Login / Register
      </button>

      {showLogin && <LoginBox onClose={handleLoginClose} />}
    </div>
  );
};

export default HomePage;
