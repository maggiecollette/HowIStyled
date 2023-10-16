import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PreLoginHeader from "./pre login components/pre-login-header";
import Footer from "./footer";
import Home from "./pages/home";
import Login from "./pre login components/login";
import Account from "./pages/account-page/account";
import Explore from "./post login components/explore";
import PostLoginHeader from "./post login components/post-login-header";
import Signup from "./pre login components/signup";
import {useEffect, useState} from "react";
import {supabase} from "./supabaseClient";

function App() {
    const [session, setSession] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [session]);

    return (
        <>
            <Router>
                {session ? <PostLoginHeader/> : <PreLoginHeader />}
                <Routes>
                    <Route exact path="/" exact element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/account" element={session ? <Account key={session.user.id} session={session}/> : <Account session={null}/>}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/sign-up" element={<Signup/>}/>
                </Routes>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
