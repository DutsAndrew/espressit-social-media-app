import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import reportWebVitals from './tests/reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateAccount from './components/auth/CreateAccount';
import LogIn from './components/auth/LogIn';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
    {/* <BrowserRouter>
      <Routes>
        <Route path='/CreateAccount' element={<CreateAccount/>} />
        <Route path='/LogIn' element={<LogIn/>} />
      </Routes>
    </BrowserRouter> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
