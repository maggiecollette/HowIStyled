import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient";
import {DownloadPicture} from "../components/DownloadPicture";
import {options} from "../components/options";

export default function Explore({session}) {
    const [posts, setPosts] = useState([])
    const [myOptions, setMyOptions] = useState([])
    const [brand, setBrand] = useState("")
    const [name, setName] = useState("")
    const [displayPosts, setDisplayPosts] = useState([])
    const {user} = session;

    useEffect(() => {
        GetPosts()
        console.log("got posts in use effect", posts)
    }, []);

    async function GetPosts() {
        try {
            const {data, error} = await supabase
                .from("posts")
                .select("*")
                .neq('user_id', user.id)
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
            posts[index]["photo_url"] = await DownloadPicture(post.photo, 'photos');
            setPosts(posts)
            setDisplayPosts(posts)
        } catch (error) {
            console.log(error)
        }
    }

    function SetFilters(event) {
        console.log("setting filters")
        const postsToFilter = posts.slice()
        console.log("my options", myOptions, "for these posts", postsToFilter)
        if (brand !== "" || myOptions !== [] || name !== "") {
            postsToFilter.forEach((post, post_index, postsToFilter) => {
                let hasBrand = false
                let hasName = false
                let hasStyle = false
                post.elements.forEach((element) => {
                    if (brand !== "" && element.element_brand === brand) {
                        console.log("has brand", brand)
                        hasBrand = true
                    }
                    if (name !== "" && element.element_name === name) {
                        console.log("has name", name)
                        hasName = true
                    }
                    myOptions.forEach((style) => {
                        if (element.element_type === style) {
                            console.log("has style", style)
                            hasStyle = true
                        }
                    })
                })
                if (!hasBrand && !hasName && !hasStyle) {
                    console.log("removing post", postsToFilter[post_index])
                    postsToFilter.splice(post_index, 1)
                }
            })
        }
        setDisplayPosts(postsToFilter)
        console.log("display posts are now", displayPosts)
    }

    function SetOptions(event) {
        const optionNodes = event.target.childNodes
        const setOptions = []
        optionNodes.forEach((option) => {
            if (option.selected) {
                setOptions.push(option.value)
            }
        })
        setMyOptions(setOptions)
        console.log("myOptions is now", myOptions)
    }

    return (
        <div>
                <select multiple id="select-options" onChange={(e) => SetOptions(e)}>
                    {options && options.map((option => (
                        <option key={option.id} value={option.name}>
                            {option.name}
                        </option>
                    )))}
                </select>
                <input type="text" placeholder="brand" onChange={(e) => setBrand(e.target.value)}/>
                <input type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
                <button onClick={(e) => {SetFilters(e)}}>search</button>
            <h3>explore posts</h3>
            {displayPosts && displayPosts.map((post => (
                <div key={post.post_id}>
                    <div style={{border: "2px solid black"}}>
                        <img src={post.photo_url} alt="cannot display"
                             style={{maxHeight: "500px", maxWidth: "500px"}}></img>
                        <h5>{post.caption}</h5>
                        {post.elements && post.elements.map((element => (
                            <div style={{border: "2px solid red"}}>
                                <p key={element.element_id}>{element.element_type} made by: {element.element_brand},
                                    style: {element.element_name}</p>
                            </div>
                        )))}
                    </div>
                    <br/>
                </div>
            )))}
        </div>
    );
}