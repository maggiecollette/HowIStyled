import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient";
import {DownloadPicture} from "../components/DownloadPicture";
import {AddPicture} from "../components/AddPicture";

export default function EditProfile({session}) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [picture, setPicture] = useState(null);
    const [picture_url, setPictureUrl] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect ( () => {
        GetProfile().then()
    }, []);

    async function ChangePicture(event) {
        try {
            setLoading(true)
            event.preventDefault()
            const newPicture = await AddPicture(event, 'profile_pictures')
            setPicture(newPicture)
            const newPictureUrl = await DownloadPicture(newPicture, 'profile_pictures')
            setPictureUrl(newPictureUrl)
            setLoading(false)
            } catch (error) {
            console.log("Error changing picture:",error)
        }
    }

    async function GetProfile() {
        try {
            console.log("call to get profile")
            const {user} = session;
            const {data, error} = await supabase
                .from("profiles")
                .select('full_name, username, picture')
                .eq('id', user.id)
            if (data) {
                setName(data[0].full_name)
                setUsername(data[0].username)
                setPicture(data[0].picture)
                setPictureUrl(await DownloadPicture(data[0].picture, 'profile_pictures'))
            }
        } catch (error) {
            console.log("Error getting profile:", error);
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
                picture: picture,
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
                <img src={picture_url} alt="cannot display" style={{maxHeight: "500px", maxWidth: "500px"}}></img>
                <form onSubmit={(e) => EditProfile(e)}>
                    <input id="name" type="text" placeholder={name} onChange={(e) => setName(e.target.value)}/>
                    <input id="username" type="text" placeholder={username}
                           onChange={(e) => setUsername(e.target.value)}/>
                    <input id="profile picture" type="file" accept="image/*" onChange={(e) => ChangePicture(e)}/>
                    <button type='submit' disabled={loading}>{loading ? "loading" : "update"}</button>
                </form>
            </div>
        );
}