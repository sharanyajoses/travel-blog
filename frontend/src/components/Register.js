// This component contains a form which is used to register a new user with the application.

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RegistrationAPI } from '../utils/Api';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Reset error message
        setErrorMessage('');

        // Basic validation
        if (!email || !username || !password || !secretKey) {
            setErrorMessage('All fields, including the Secret Key, are required.');
            return;
        }

        try {
            const response = await RegistrationAPI({ username, email, password, secretKey });
            if (response.ok) {
                // Navigate to login page or anywhere else post-registration
                navigate('/login');
            } else {
               
                setErrorMessage('Registration failed: ' + response.statusText);
            }
        } catch (error) {
            setErrorMessage('Error during registration: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
                Username:
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </label>
            <label>
                Password:
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
                Secret Key (Admins Only):
                <input type="text" value={secretKey} onChange={(e) => setSecretKey(e.target.value)} required />
            </label>
            <button type="submit">Register</button>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
            <p>
                Please note that only authorized users with administrative privileges can register and create posts on this platform.
                To gain access, you must have a valid secret key provided by the administrator.
            </p>
        </form>
    );
}

export default Register;
