import React, { useState } from 'react';
import { useRegister } from '../hooks/auth';
import { useForm } from 'react-hook-form';
import { usernameValidate, emailValidate, passwordValidate } from '../utils/form-validate';

const RegisterForm = ({ onLoginClick }) => {
  const { register: signUp, isLoading } = useRegister();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegisterSubmit = async (data) => {
    const succeeded = await signUp({
      username: data.username,
      email: data.email,
      password: data.password,
    });

    if (succeeded) {
      reset();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((previousPassword) => !previousPassword);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit(handleRegisterSubmit)}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 font-medium mb-2">Username</label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your full name"
            {...register("username", usernameValidate)}
          />
        </div>
        {errors.username && (
          <span className="text-red-500 text-sm">{errors.username.message}</span>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your email"
            {...register("email", emailValidate)}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
            placeholder="Enter your password"
            {...register("password", passwordValidate)}
          />
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
          <p className="absolute left-2 my-2 text-grey-600 cursor-pointer" onClick={togglePasswordVisibility}>
            {showPassword ? 'Hide Password' : 'Show Password'}
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 my-7 rounded-lg font-medium mb-2"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
        <p className="text-center text-gray-600">
          Already have an account? <span className="text-blue-500 cursor-pointer" onClick={onLoginClick}>Login</span>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
