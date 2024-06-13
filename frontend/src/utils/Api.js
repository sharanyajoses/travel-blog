// src/utils/Api.js
// API functions for registration and login


//Login API function
// This function sends a POST request to the server with the username and password, and returns the response.
const LoginAPI = async ({ username, password }) => {
    try {
        console.log({ username, password });  // Debugging line

        const response = await fetch('http://localhost:3000/posts/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        console.log('API Response:', response, data);

        if (response.ok) {
            return { ok: true, token: data.accessToken, user: data.user };
        } else {
            return { ok: false, statusText: data.message || "Invalid username or password" };
        }
    } catch (error) {
        return { ok: false, statusText: "Network error" };
    }
};



//Registration API function
// This function sends a POST request to the server with the user details and secret key, and returns the response.
const RegistrationAPI = async ({ username, email, password, secretKey }) => {
    try {
        const response = await fetch('http://localhost:3000/posts/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password, secretKey })  // Now includes secretKey
        });

        const data = await response.json();
        if (response.ok) {
            return { ok: true };
        } else {
            return { ok: false, statusText: data.message || "Registration failed" };
        }
    } catch (error) {
        return { ok: false, statusText: "Network error" };
    }
};



export { RegistrationAPI };
export { LoginAPI };
