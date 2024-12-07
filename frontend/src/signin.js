import React from "react";
import './styles/signin.css'

const SignIn = () => {
    return (
        <div className="signinbackground">
            <div class="container">
                <i class="fa-solid fa-user user-picture"></i>
                <p>Sign in</p>
                <form>                
                    <input className="email-section" type="email" placeholder="Enter your email"/>
                    <input className="password-section" type="password" placeholder="Enter your password" />
                    <button className="signinsubmit"type="submit">Log in</button>
                </form>

            </div>
        </div>
    );
};

export default SignIn;