import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';

import './assets/all.scss';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes />
      </AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
