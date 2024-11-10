import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Main } from './pages/Main/Main'
import { Login } from './pages/Login/Login';
import { Admin } from './pages/Admin/Admin';

import './App.css';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}