import React, { useEffect, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { generatetoken } from "../firebase";
import axios from "axios";

const apiUrl = 'https://push-notify-backend.onrender.com'

//const apiUrl = "http://localhost:3001";

function Signuppage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Generate token
      const token = await generatetoken();
      console.log("Token is", token);
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User details are here", user);

      const response = await axios.post(`${apiUrl}/users`, {
        email,
        password,
        uid: user.uid, // Provide the UID (if available)
        pushNotificationToken: token, // Provide the push notification token (if available)
      });

      console.log("User created successfully:", response.data);
      alert('Sign up successfully!');

   

      navigate("/login");
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage); // Set error state
      console.error(errorCode, errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSignUp}>
        <h1>Sign Up </h1>
        <div>
          <br></br>
          <label>Email:</label>
          <br></br>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <br></br>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <br></br>
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </>
  );
}

export default Signuppage;
