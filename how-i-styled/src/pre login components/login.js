import React, { useState } from 'react';
import {supabase} from "../supabaseClient";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const {user, session, error} = await supabase.auth.signInWithPassword({
                email,
                password,
            });
            navigate("/account");
        }
        catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Log In</button>
            <Link to="/sign-up">Sign Up</Link>
        </div>
    );
}

export default Login;
