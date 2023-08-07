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
    if (pathname.startsWith("/protected") && !user ){
      console.log("This is protected")
      navigate("/")
    }

  }, [pathname, user])

  if (isLoading) return "Loading...";

  return (
    <div>
      This is the child: <Outlet />
      <LogOut />

    </div>
  );
};

export default Layout;
