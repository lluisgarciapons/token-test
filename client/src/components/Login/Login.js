import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/constants';
import { withRouter } from "react-router-dom";
import setAuthToken from '../../utils/setAuthToken';

function LoginForm(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmitClick = async (e) => {
        e.preventDefault();
        if (!email.length && !password.length) {
            return console.log('Please enter valid username and password');
        }
        const payload = {
            email,
            password
        };
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, payload);
            if (!response.data.success) {
                return console.log(response.data.message);
            }
            console.log(response.data);
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            setAuthToken(response.data.token);
            redirectToHome();
        }

        catch (err) {
            console.log(err);
        }

    };

    const redirectToHome = () => {
        props.history.push('/');
    };
    const redirectToRegister = () => {
        props.history.push('/register');
    };

    return (
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="email">Email address</label>
                    <input type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="password">Password</label>
                    <input type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToRegister()}>Register</span>
            </div>
        </div>
    );
}

export default withRouter(LoginForm);