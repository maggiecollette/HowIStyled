import React from "react";
import {Link, useNavigate} from "react-router-dom";

export default function PreLoginHeader() {
    return (
        <header>
            <Link to="/">HowIStyled</Link>
            <Link to="/">Home</Link>
            <Link to="/login">Log in</Link>
        </header>
    );
}