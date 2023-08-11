import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import SideBar from './sidebar';

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
    <div className="flex">
      {/* Sidebar */}
      <SideBar username= {user.username}/>

      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
