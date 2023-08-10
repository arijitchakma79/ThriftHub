import React from 'react';
import HomePage from '../pages/homepage';
import Layout from '../components/layout';
import DashBoard from '../pages/dashboard';
import Transactions from '../pages/transactions';
import Income from '../pages/income';
import Expenses from '../pages/expenses';

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
        element: <DashBoard/>, 
      },
      {
        path: 'view-transactions',
        element: <Transactions/>,
      },
      {
        path:'income',
        element:<Income/>,
      },
      {
        path:'expenses',
        element:<Expenses/>,
      }
    ],
  },
];

export default routes;
