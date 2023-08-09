import { useState } from 'react';
import { useLogin } from '../hooks/auth';
import { useForm } from 'react-hook-form'
import { emailValidate, passwordValidate } from '../utils/form-validate'

const LoginForm = ({ onRegisterClick }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useLogin();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const handleSignIn = async (data) => {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: "protected/dashboard",
    })

    if (succeeded) {
      reset();
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(handleSignIn)}>
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
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
              placeholder="Enter your password"
              {...register("password", passwordValidate)}
            />
            <button
              type="button"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">{errors.password.message}</span>
          )}
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
