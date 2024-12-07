import React from "react";
import {Link} from 'react-router-dom';
import './styles/signup.css';

const SignUp = () => {
    return (
        <div className="signupbackground">
            <div class="leftside">
                <div>
                    <form>
                        <p class="title">Sign Up</p>
                        <input className="firstname" type="text" placeholder="Enter first name"/>
                        <input type="text" placeholder="Enter last name"/>
                        <input type="email" placeholder="Enter your email"/>
                        <input type="password" placeholder="Enter your password" />
                        <input type="text" placeholder="Enter your Address" />
                        <input type="text" placeholder="Enter your phone number"/>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
            <div className="rightside">
                <div>
                    <p className="hellotitle">Hello, Friend!</p>
                    <p className="desctext">If you already have an account, please click the button below</p>
                    <Link class="signupbutton" to="/signin">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;