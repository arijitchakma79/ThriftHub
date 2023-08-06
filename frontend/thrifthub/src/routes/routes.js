import React from 'react';
import HomePage from '../pages/homepage';
import DashBoard from '../pages/dashboard';
import Layout from '../components/layout';

const routes = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/protected',
    element: <Layout />,
    children: [
      {
        path: 'dashboard', 
        element: 'dashboard', 
      }
    ],
  },
];

export default routes;