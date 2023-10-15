import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../supabaseClient";

export default function PostLoginHeader() {
    const navigate = useNavigate();

    async function LogOut() {
        await supabase.auth.signOut();
        navigate("");
    }

    return (
        <header>
            <h1>logged in</h1>
            <Link to="/">HowIStyled</Link>
            <Link to="/">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/explore">Explore</Link>
            <button onClick={() => LogOut()}>Sign out</button>
        </header>
    );
}