import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PreLoginHeader from "./headers & footers/pre-login-header";
import Footer from "./headers & footers/footer";
import Home from "./pages/home/home";
import Login from "./pages/log in and sign up/login";
import Account from "./pages/account-page/account";
import Explore from "./pages/explore-page/explore";
import PostLoginHeader from "./headers & footers/post-login-header";
import Signup from "./pages/log in and sign up/signup";
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
                    <Route path="/explore" element={session ? <Explore key={session.user.id} session={session}/> : <Explore session={null}/>}/>
                    <Route path="/sign-up" element={<Signup/>}/>
                </Routes>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
