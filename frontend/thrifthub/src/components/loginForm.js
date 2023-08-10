import React, { useState } from 'react';
import { useLogin } from '../hooks/auth';
import { useForm } from 'react-hook-form';
import { emailValidate, passwordValidate } from '../utils/form-validate';

const LoginForm = ({ onRegisterClick }) => {
  // State for password visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  // Fetch login function and loading state from the auth hook
  const { login, isLoading } = useLogin();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Handle form submission
  const handleSignIn = async (data) => {
    // Call the login function with user's email and password
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: 'protected/dashboard'
    });

    // Reset the form on successful login
    if (succeeded) {
      reset();
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(handleSignIn)}>
        {/* Email input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
            placeholder="Enter your email"
            {...register('email', emailValidate)}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        {/* Password input */}
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
            placeholder="Enter your password"
            {...register('password', passwordValidate)}
          />
          {/* Password visibility toggle */}
          <p
            className="absolute left-2 my-2 text-gray-600 cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide Password' : 'Show Password'}
          </p>
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">{errors.password.message}</span>
        )}

        {/* Login button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 my-7 rounded-lg font-medium"
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>

        {/* Register link */}
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <span className="text-blue-500 cursor-pointer" onClick={onRegisterClick}>
            Register
          </span>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
