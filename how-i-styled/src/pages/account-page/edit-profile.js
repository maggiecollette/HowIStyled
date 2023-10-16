import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient";

export default function EditProfile({session}) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState("");

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

    async function EditProfile(event) {
        try {
            event.preventDefault()
            const {user} = session;
            const updates = {
                id : user.id,
                username: username,
                full_name: name,
                avatar_url: picture,
            }
            let { error } = await supabase.from('profiles').upsert(updates)
            return;
        } catch (error) {
            console.warn(error);
        }
    }

        return (
            <div>
                <h3>profile</h3>
                <p>Name: {name}</p>
                <p>Username: {username}</p>
                <p>Picture: {picture}</p>
                <form onSubmit={(e) => EditProfile(e)}>
                    <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input id="profile picture" type="text" value={picture} onChange={(e) => setPicture(e.target.value)}/>
                    <button type='submit'>update</button>
                </form>
            </div>
        );
}