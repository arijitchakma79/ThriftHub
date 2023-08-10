import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import LogOut from './logout';

const Layout = () => {
  // Get the current location from react-router
  const location = useLocation();
  const { pathname } = location;

  // Get the navigate function from react-router
  const navigate = useNavigate();

  // Get user data and loading state from the auth hook
  const { user, isLoading } = useAuth();

  // Check if user is not logged in and trying to access protected routes
  useEffect(() => {
    if (!isLoading && pathname.startsWith('/protected') && !user) {
      // Redirect to the home page
      navigate('/');
    }
  }, [pathname, isLoading, user]);

  // Render loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Render the layout
  return (
    <div>
      <h1>Layout Component</h1>
      {/* Render the nested routes */}
      <Outlet />

      {/* Conditional rendering based on user authentication */}
      {user ? (
        <div>
          <p>Welcome {user.username}</p>
          <LogOut />
        </div>
      ) : (
        <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default Layout;
