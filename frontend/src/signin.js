import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './styles/signin.css';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:5050/clients/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid email or password.');
            }

            
            const result = await response.json();
            
            localStorage.setItem('client_id', JSON.stringify(result.client_id));
            localStorage.setItem('email', JSON.stringify(email));
            setSuccess('Login successful!');
            navigate('/client-dashboard'); // Redirect to the client dashboard

            
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signinbackground">
            <div className="container">
                <i className="fa-solid fa-user user-picture"></i>
                <p>Sign in</p>
                <form onSubmit={handleSubmit}>
                    <input
                        className="email-section"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="password-section"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="signinsubmit" type="submit">Log in</button>
                </form>
            </div>
        </div>
    );
};

export default SignIn;