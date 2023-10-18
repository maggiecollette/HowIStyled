import React, {useEffect, useState} from "react";
import {supabase} from "../../supabaseClient";
import {DownloadPicture} from "../components/DownloadPicture";
import {AddPicture} from "../components/AddPicture";

export default function NewPost({session}) {
    const [caption, setCaption] = useState("")
    const [photo, setPhoto] = useState("")
    const [name, setName] = useState("")
    const [brand, setBrand] = useState("")
    const [type, setType] = useState("")
    const options = [{id: 0, name: "select an option"}, {id: 1, name: "top"}, {id: 2, name: "sweater"},
        {id: 3, name: "sweatshirt"}, {id: 4, name: "pants"}, {id: 5, name: "shorts"}, {id: 6, name: "skirt"},
        {id: 7, name: "dress"}, {id: 8, name: "jacket"}, {id: 9, name: "bag"}, {id: 10, name: "shoes"}]
    const [elements, setElements] = useState([])
    const [loading, setLoading] = useState(false)
    const {user} = session;

    async function NewPost(event) {
        try {
            event.preventDefault()
            const postData = {
                user_id: user.id,
                caption: caption,
                photo: photo,
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
        event.preventDefault()
        console.log("delete elements at", index, "before", elements)
        elements.splice(index, 1)
        setElements(elements)
        console.log(elements)
    }

    async function ChangePicture(event) {
        try {
            setLoading(true)
            event.preventDefault()
            const newPicture = await AddPicture(event, 'photos')
            setPhoto(newPicture)
            setLoading(false)
        } catch (error) {
            console.log("Error changing picture:",error)
        }
    }

    return (
        <div>
            <h3>new post</h3>
            <form onSubmit={(e) => NewPost(e)}>
                <div>
                    <input id="photo" type="file" accept="image/*" defaultValue={photo} onChange={(e) => ChangePicture(e)}/>
                </div>
                <div>
                    <input id="caption" type="text" placeholder="caption" onChange={(e) => setCaption(e.target.value)}/>
                </div>
                <div>
                    <select id="type" onChange={(e) => setType(e.target.value)}>
                        {options && options.map((option => (
                            <option key={option.id} value={option.name}>
                                {option.name}
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
                <button type='submit' disabled={loading}>{loading ? "loading" : "post"}</button>
            </form>
        </div>
    );
}