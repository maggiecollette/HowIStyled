import React, {useEffect, useState} from 'react';
import {supabase} from "../../supabaseClient";
import {useNavigate} from "react-router-dom";
import {AddPicture} from "../components/AddPicture";

function Signup() {
    const [session, setSession] = useState(null);
    const [email, setEmail] = useState("");
    const [full_name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [picture, setPicture] = useState(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => subscription.unsubscribe();
    }, []);

    async function handleSignup() {
        try {
            const {user, session, error} = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        username,
                        full_name,
                        picture,
                    }
                }
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    async function SetUpPicture(event) {
        setLoading(true)
        setPicture(await AddPicture(event, 'profile_pictures'))
        setLoading(false)
    }

    if (!session) {
        return (
            <div>
                <h2>Sign Up</h2>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Your Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => SetUpPicture(e)}
                />
                <button disabled={loading} onClick={handleSignup}>{loading ? "loading" : "sign up"}</button>
            </div>
        );
    }
    else {
        navigate("/account")
    }
}

export default Signup;