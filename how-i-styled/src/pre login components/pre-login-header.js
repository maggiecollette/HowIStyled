import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {supabase} from "../supabaseClient";

export default function PreLoginHeader() {
    const navigate = useNavigate();

    async function LogOut() {
        await supabase.auth.signOut();
        navigate("");
    }

    return (
        <header>
            <Link to="/">HowIStyled</Link>
            <Link to="/">Home</Link>
            <Link to="/login">Log in</Link>
            <button onClick={() => {LogOut()}}>Sign out</button>
        </header>
    );
}