import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import PreLoginHeader from "./pre login components/pre-login-header";
import Footer from "./footer";
import Home from "./pages/home";
import Login from "./pre login components/login";
import Account from "./post login components/account";
import Explore from "./post login components/explore";
import PostLoginHeader from "./post login components/post-login-header";
import Signup from "./pre login components/signup";

function App() {
    return (
        <>
            <Router>
                {Login.session ? <PostLoginHeader/> : <PreLoginHeader />}
                <Routes>
                    <Route exact path="/" exact element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/explore" element={<Explore/>}/>
                    <Route path="/sign-up" element={<Signup/>}/>
                </Routes>
                <Footer/>
            </Router>
        </>
    );
}

export default App;
