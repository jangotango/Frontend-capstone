import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import axios from "axios";
import { useAuth } from "../authContext";
import "../components/Login.css";

export const Login = (props) => {
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [loginError, setLoginError] = useState(null);
      const { login } = useAuth();
 
   
  
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await axios.post("http://localhost:5000/login", {
            email,
            password
          });
    
          console.log("Login successful:", response.data);
    
          const token = response.data.token;

          localStorage.setItem('authToken', token);

          login(token);
          
          window.location.href = "/post";
    
        } catch (error) {
          console.error("Login failed:", error);
          setLoginError("Login failed. Please check your credentials."); // Set login error message
        }
        
      };
      return (
        <div className="background-img">
          <div className="form-container">
            <div className="kid-content">

              <h1>Welcome Back Friends!</h1>
              <p>Log in to your awesome account</p>

              <form className="login-page" onSubmit={handleSubmit}>

                <label htmlFor="email"> Email </label>

                <input
                  value={email}
                  type="email"
                  placeholder="Your Username"
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password"> Password </label>

                <input
                  value={password}
                  type="password"
                  placeholder="**********"
                  id="password"
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              
                <button type="submit">Log In</button>

                {loginError && <p className="error-message">{loginError}</p>} {/* Display login error message */}

              </form>

      

              <Link to="/register" className="switch-button">
              <button type="submit">Don't have an account? Sign Up!</button>
              </Link>

            </div>
          </div>
        </div>
      );
    };
    
    export default Login; 
