import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient";

export default function MyPosts({session}) {
    const [posts, setPosts] = useState([])
    const {user} = session;

    useEffect(() => {
        GetPosts()
    }, []);

    async function GetPosts() {
        try {
            const {data, error} = await supabase
                .from("posts")
                .select("*")
                .eq('user_id', user.id)
            data.forEach(LinkElements)
        } catch (error) {
            console.log(error)
        }
    }

    async function LinkElements(post, index, posts) {
        try {
            const {data, error} = await supabase
                .from("elements")
                .select("*")
                .eq('post_id', post.post_id)
            posts[index]["elements"] = data;
            setPosts(posts)
        } catch (error) {
            console.log(error)
        }
    }

    return <div>
        <h3>my posts</h3>
        {posts && posts.map((post => (
            <div key={post.post_id}>
                <div style={{border: "2px solid black"}}>
                    <h5>{post.photo_url}</h5>
                    <h5>{post.caption}</h5>
                    {post.elements && post.elements.map((element => (
                        <div style={{border: "2px solid red"}}>
                            <p key={element.element_id}>{element.element_type} made by: {element.element_brand}, style: {element.element_name}</p>
                        </div>
                    )))}
                </div>
                <br/>
            </div>
        )))}
    </div>
}