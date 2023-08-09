import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from "../hooks/auth"
import LogOut from './logout';

const Layout = () => {
  const location = useLocation();
  console.log(location);
  const { pathname} = location;
  console.log(pathname)
  const navigate = useNavigate();

  const {user, isLoading } = useAuth();

  useEffect ( () => {
    if (!isLoading && pathname.startsWith("/protected") &&!user ){
      console.log("This is protected")
      console.log(user)
      navigate("/")
    }

  }, [pathname, isLoading, user])

  if (isLoading) return "Loading...";

  return (
    <div>
     {console.log("you are logged in", isLoading, pathname, user)}
      This is the child: <Outlet />
      <LogOut />

    </div>
  );
};

export default Layout;
