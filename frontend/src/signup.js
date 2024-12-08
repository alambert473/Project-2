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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Ideally send data to the backend to create a new client
        console.log({
            firstName, lastName, email, address, phoneNumber, creditCard
        });
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
