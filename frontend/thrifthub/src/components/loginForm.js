import React from 'react';

const LoginForm = ({ onRegisterClick }) => {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type="password"
            id="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium mb-2"
        >
          Login
        </button>
        <p className="text-center text-gray-600">
          Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={onRegisterClick}>Register</span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
