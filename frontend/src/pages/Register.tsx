import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = () => {
    if (!email) return alert('Enter email');
    login(email);
    navigate('/');
  };

  return (
    <div className="container">
      <div className="form-card">
        <h2>Register</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" />
        <button className="button" onClick={submit}>
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Register;
