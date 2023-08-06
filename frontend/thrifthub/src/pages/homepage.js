// client/HomePage.js
import React from 'react';
import { NavLink } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to Thrifthub</h1>
      <p style={styles.bio}>
        At Thrifthub, we are committed to helping you achieve your financial goals through effective
        budgeting and smart money management. Take control of your finances and start saving for a
        better future today!
      </p>
      <NavLink to="/login" style={styles.button}>Login / Register</NavLink>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  bio: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    textAlign: 'center',
    marginBottom: '30px',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    fontSize: '1.2rem',
    borderRadius: '5px',
    textDecoration: 'none',
  },
};

export default HomePage;
