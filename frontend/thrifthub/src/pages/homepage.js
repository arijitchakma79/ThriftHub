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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <header className="py-8 text-center">
        <h1 className="text-3xl font-semibold mb-2">Welcome to ThriftHub</h1>
        <p className="text-lg text-gray-600">Your Path to Financial Success</p>
      </header>

      <main className="max-w-md px-6 py-8 bg-white shadow-md rounded-md">
        <p className="text-lg text-center mb-6">
          Manage your money effectively and reach your financial goals with ThriftHub.
        </p>
        <button
          className="block w-full px-4 py-2 bg-blue-500 text-white text-lg rounded hover:bg-blue-600"
          onClick={handleLoginClick}
        >
          Login / Register
        </button>
      </main>

      <footer className="text-center mt-6">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} ThriftHub. All rights reserved.
        </p>
      </footer>

      {showLogin && <LoginBox onClose={handleLoginClose} />}
    </div>
  );
};

export default HomePage;
