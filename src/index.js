import React from 'react';
import ReactDOM from 'react-dom/client'; //'react-dom' (standard, but now depreciated : ) )
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render( //* this code is actually depreciated now :)
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );