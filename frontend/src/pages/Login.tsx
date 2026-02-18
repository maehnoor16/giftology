import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dialog from "../components/Dialog";


const Login = () => {
  const [email, setEmail] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"info" | "success" | "error">("info");
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

const submit = async () => {
  if (!email || !password) {
    setDialogTitle("Missing Fields");
    setDialogMessage("Please enter both email and password.");
    setDialogType("error");
    setDialogOpen(true);
    return;
  }

  const success = await login(email, password);

  if (!success) {
    setDialogTitle("Login Failed");
    setDialogMessage("Invalid email or password.");
    setDialogType("error");
    setDialogOpen(true);
    return;
  }

  setDialogTitle("Success 🎉");
  setDialogMessage("Logged in successfully!");
  setDialogType("success");
  setDialogOpen(true);

  setTimeout(() => navigate("/"), 1500);
};


  return (
    <div className="container">
      <div className="form-card">
        <h2>Login</h2>

        <input
          placeholder="Email"
          type="email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          onChange={e => setPassword(e.target.value)}
        />

        <button className="button" onClick={submit}>
          Login
        </button>

        {/* Signup text */}
      <p className="signup-text">
        Don’t have an account?{" "}
        <span
          className="signup-link"
          onClick={() => navigate("/register")}
        >
          Sign up
        </span>
      </p>

      {/* Terms */}
      <p className="terms-text">
        By continuing, you agree to our{" "}
        <span className="terms-link">Terms & Conditions</span>
      </p>

      <Dialog
        open={dialogOpen}
        title={dialogTitle}
        message={dialogMessage}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
      />

      </div>
    </div>
  );
};

export default Login;
