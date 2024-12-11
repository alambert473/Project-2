import React, { useState } from "react";
import { Link } from "react-router-dom";
import './styles/signup.css';

const SignUp = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [creditCard, setCreditCard] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:4000/api/clients/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email,
                    address,
                    phone_number: phoneNumber,
                    credit_card_info: creditCard,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to register. Please try again.');
            }

            const result = await response.json();
            setSuccess('Registration successful! You can now log in.');
            setFirstName('');
            setLastName('');
            setEmail('');
            setAddress('');
            setPhoneNumber('');
            setCreditCard('');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signupbackground">
            <div className="leftside">
                <form onSubmit={handleSubmit}>
                    <p className="title">Sign Up</p>
                    <input type="text" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    <input type="text" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Enter your address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <input type="text" placeholder="Enter your phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                    <input type="text" placeholder="Enter your credit card info" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} required />
                    <button type="submit">Register</button>
                </form>
            </div>
            <div className="rightside">
                <p>If you already have an account, please <Link to="/signin">sign in</Link></p>
            </div>
        </div>
    );
};

export default SignUp;