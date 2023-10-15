import React, {useEffect, useState} from "react";
import {supabase} from "../supabaseClient";

export default function Account({session}) {
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [picture, setPicture] = useState(null);

    useEffect ( () => {
        GetProfile()
    }, []);

    async function GetProfile() {
        try {
            const {user} = session;
            const {data, error} = await supabase
                .from("profiles")
                .select('full_name, username, avatar_url')
                .eq('id', user.id)
            if (data) {
                console.log(data)
                setName(data[0].full_name)
                setUsername(data[0].username)
                setPicture(data[0].avatar_url)
            }
        } catch (error) {
            console.warn(error);
        }
    }

    async function editUsername() {

    }

    async function editName() {

    }

    async function editPicture() {

    }

    if (session) {
        return (
            <div>
                <h3>edit profile</h3>
                <p>Name: {name}</p>
                <p>Username: {username}</p>
                <p>Picture: {picture}</p>
            </div>
        );
    } else {
        return <h3>you cannot access this page until you sign in</h3>
    }
}