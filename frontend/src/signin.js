import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; 
import './styles/signin.css';

const SignIn = () => {
    let navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:4000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid email or password.');
            }

            const result = await response.json();
            setSuccess('Login successful!');
            setEmail('');
            setPassword('');

            navigate('/clientDashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signinbackground">
            <div className="container">
                <i className="fa-solid fa-user user-picture"></i>
                <p>Sign in</p>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
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