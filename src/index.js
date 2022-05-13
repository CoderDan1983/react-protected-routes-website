import React from 'react';
import ReactDOM from 'react-dom/client'; //'react-dom' (standard, but now depreciated : ) )
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={ <App /> } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// ReactDOM.render( //* this code is actually depreciated now :)
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );