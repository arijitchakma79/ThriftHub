import React from 'react';

const RegisterForm = ({ onLoginClick }) => {
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add registration logic here
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-gray-700 font-medium mb-2">Full Name</label>
          <input
            type="text"
            id="fullName"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your full name"
          />
        </div>
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
          className="w-full bg-green-500 text-white py-2 rounded-lg font-medium mb-2"
        >
          Register
        </button>
        <p className="text-center text-gray-600">
          Already have an account? <span className="text-blue-500 cursor-pointer" onClick={onLoginClick}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
