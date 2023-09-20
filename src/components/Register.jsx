import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import axios from "axios";
import { useAuth } from "../authContext";
import "./Register.css"

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://tony-blog-site-5f1feed3cdc2.herokuapp.com/register", {
        email,
        password,
      });

      console.log("Registration successful:", response.data);

      const token = response.data.token;
      localStorage.setItem('authToken', token);
      login(token);

      // Redirect to protected route or handle in a different way
      props.history.push("/protected-route");

    } catch (error) {
      console.error("Registration failed:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  return (
    <div className="register-bg">
      <div className="form-container">
        <div className="kid-content">

          <h1>Create Your Awesome Account!</h1>
          <p>Join the adventure by registering your account</p>

          <form className="register-page" onSubmit={handleRegister}>

            <label htmlFor="email"> Email! </label>

            <input
              value={email}
              type="email"
              placeholder="Something Cool"
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password"> Password? </label>

            <input
              value={password}
              type="password"
              placeholder="**********"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Create Account</button>
          </form>
          
          <Link to="/" className="switch-button">
            <button type="submit">Already have an account? Log In!</button>
          </Link>

        </div>
      </div>
    </div>
  );
};
