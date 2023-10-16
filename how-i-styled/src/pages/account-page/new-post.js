import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient";

export default function NewPost({session}) {
    const [caption, setCaption] = useState("")
    const [photo, setPhoto] = useState("")

    async function NewPost() {
        try {
            const {user} = session;

        } catch (error) {
            console.warn(error);
        }
    }

    return (
        <div>
            <h3>new post</h3>
            <form onSubmit={(e) => NewPost(e)}>
                <input id="caption" type="text" value={caption} onChange={(e) => setCaption(e.target.value)}/>
                <input id="photo" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)}/>
                <select multiple>
                    <option value="top">top</option>
                    <option value="pants">pants</option>
                    <option value="shorts">shorts</option>
                    <option value="skirt">skirt</option>
                    <option value="dress">dress</option>
                    <option value="jacket">jacket</option>
                    <option value="bag">bag</option>
                    <option value="shoes">shoes</option>
                </select>
                <button type='submit'>post</button>
            </form>
        </div>
    );
}