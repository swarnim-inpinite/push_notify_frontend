import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const apiUrl = process.env.REACT_APP_URL;
console.log("login api url is", apiUrl);

function Loginpage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('User logged in successfully:', user);
        

            // After successful login, send a request to fetch other users' information
            //  const response = await axios.get('http://localhost:3001/otherUsers', {
                const response = await axios.get(`${apiUrl}/otherUsers`, {
                params: { currentUserUID: user.uid }
            });
            console.log('Other users:', response.data);
            // Now you can use the UID as needed
            navigate('/welcome');
        } catch (error) {
            const errorMessage = error.message;
            setError(errorMessage);
            console.error(errorMessage);
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <h1>Login</h1>
            <br></br>
            <div>
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
            <button type="submit">Login</button>
        </form>
    );
}

export default Loginpage;
