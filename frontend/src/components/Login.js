// This component contains a login form that uses the LoginAPI function to authenticate the user.


import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginAPI } from '../utils/Api';
import { UserContext } from '../contexts/UserContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const { setUser } = useContext(UserContext);  
    const navigate = useNavigate();
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Reset error message
        setErrorMessage('');

        // Basic validation
        if (!username || !password) {
            setErrorMessage('Username and password are required.');
            return;
        }

        try {
            const response = await LoginAPI({ username, password });
            if (response.ok) {
                setUser({ token: response.token, ...response.user });  // Set the user context with token and user details
                console.log('Login successful');
                navigate('/'); 
            } else {
                console.error('Login failed:', response.statusText);
                setErrorMessage('Login failed: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required
                />
            </label>
            <label>
                Password:
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required
                />
            </label>
            <button type="submit">Login</button>
            {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        </form>
    );
}

export default Login;
