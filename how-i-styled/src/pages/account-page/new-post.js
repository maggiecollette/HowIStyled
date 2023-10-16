import React, {useState} from "react";
import {supabase} from "../../supabaseClient";

export default function NewPost({session}) {
    const [caption, setCaption] = useState("")
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [type, setType] = useState("")
    const options = ["select an option", "top", "sweater", "sweatshirt", "pants", "shorts", "skirt", "dress", "jacket", "bag", "shoes"]
    const [elements, setElements] = useState([])
    const {user} = session;

    async function NewPost(event) {
        try {
            event.preventDefault()
            const postData = {
                user_id: user.id,
                caption: caption,
                photo_url: photo,
            }
            const {data, error} = await supabase
                .from("posts")
                .insert(postData)
                .select("post_id")
                .single()
            console.log("data:", data)
            await NewElements(data.post_id)
            window.location.reload()
        } catch (error) {
            console.warn(error);
        }
    }

    async function NewElements(postId) {
        console.log("elements")
        elements.forEach(NewElement)

        async function NewElement(element) {
            console.log("adding element")
            const elementData = {
                post_id: postId,
                user_id: user.id,
                element_type: element.type,
                element_brand: element.brand,
                element_name: element.name,
            }
            const {data, error} = await supabase
                .from("elements")
                .insert(elementData)
                .select()
                .single()
            console.log("element data", data)
        }
    }

    function OpenNewElement(event) {
        event.preventDefault()
        if (type == "select an option") {
            return;
        }
        console.log("type:", type, "brand:", brand, "name:", name)
        const newElement = {
            type: type,
            brand: brand,
            name: name,
        }
        elements.push(newElement)
        setElements(elements)
        console.log("elements")
    }

    function DeleteElement(event, index) {
        // fix this
        event.preventDefault()
        console.log("delete elements at", index, "before", elements)
        elements.splice(index, 1)
        setElements(elements)
        console.log(elements)
    }

    return (
        <div>
            <h3>new post</h3>
            <form onSubmit={(e) => NewPost(e)}>
                <div>
                    <input id="photo" type="text" placeholder="photo" onChange={(e) => setPhoto(e.target.value)}/>
                </div>
                <div>
                    <input id="caption" type="text" placeholder="caption" onChange={(e) => setCaption(e.target.value)}/>
                </div>
                <div>
                    <select id="type" onChange={(e) => setType(e.target.value)}>
                        {options && options.map((option => (
                            <option key={options.indexOf(option)} value={option}>
                                {option}
                            </option>
                        )))}
                    </select>
                    <input id="brand" type="text" placeholder="brand" onChange={(e) => setBrand(e.target.value)}/>
                    <input id="name" type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
                    <button id="addElement" onClick={(e) => OpenNewElement(e)}>add element</button>
                </div>
                <div>
                <h5>elements:</h5>
                <ul>
                    {elements && elements.map((element) => (
                        <li key={elements.indexOf(element)}>
                            Type: {element.type}, Brand: {element.brand}, Name: {element.name}
                            <button type="button" onClick={(e) => {
                                DeleteElement(e, elements.indexOf(element));
                            }}>Delete element
                            </button>
                        </li>
                    ))}
                </ul>
                </div>
                <button type='submit'>post</button>
            </form>
        </div>
    );
}