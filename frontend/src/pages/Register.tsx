import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from "../components/Dialog";

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api/';

const Register = () => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogType, setDialogType] = useState<"info" | "success" | "error">("info");


  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone: string) =>
    /^\+\d{1,3}\d{7,14}$/.test(phone); 
    // requires country code like +92XXXXXXXXXX

  const submit = async () => {
  const { first_name, last_name, email, password, phone } = form;

  if (!first_name || !last_name || !email || !password || !phone) {
    setDialogTitle("Missing Fields");
    setDialogMessage("All fields are required.");
    setDialogType("error");
    setDialogOpen(true);
    return;
  }

  if (!validateEmail(email)) {
    setDialogTitle("Invalid Email");
    setDialogMessage("Please enter a valid email address.");
    setDialogType("error");
    setDialogOpen(true);
    return;
  }

  if (!validatePhone(phone)) {
    setDialogTitle("Invalid Phone");
    setDialogMessage("Phone must include country code. Example: +923001234567");
    setDialogType("error");
    setDialogOpen(true);
    return;
  }

  try {
    const res = await fetch("https://giftology-backend.onrender.com/api/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: email,
        first_name,
        last_name,
        email,
        password,
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      setDialogTitle("Registration Failed");
      setDialogMessage(error.email?.[0] || "Email already exists.");
      setDialogType("error");
      setDialogOpen(true);
      return;
    }

    setDialogTitle("Success 🎉");
    setDialogMessage("Account created successfully!");
    setDialogType("success");
    setDialogOpen(true);

    // clear guest email as orders/wishlist are now linked
    localStorage.removeItem('guestEmail');

    setTimeout(() => navigate("/"), 1500);

  } catch {
    setDialogTitle("Server Error");
    setDialogMessage("Something went wrong. Please try again.");
    setDialogType("error");
    setDialogOpen(true);
  }
};


  return (
    <div className="container">
      <div className="form-card">
        <h2>Signup</h2>

        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
        />

        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone (+CountryCode)"
          onChange={handleChange}
        />

        <button className="button" onClick={submit}>
          Create Account
        </button>

         <p className="signup-text">
        Already have an account?{" "}
        <span
          className="signup-link"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
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

export default Register;
