// client/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//import firebase from 'firebase/app';
//import 'firebase/auth';
//import app from './firebase'; // Import the Firebase instance from the firebase.js file
import HomePage from './pages/homepage';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
