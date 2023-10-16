import React, {useState} from "react";
import {supabase} from "../../supabaseClient";

export default function NewPost({session}) {
    const [caption, setCaption] = useState("")
    const [photo, setPhoto] = useState("")
    const [showTop, setShowTop] = useState(false)
    const [showSweater, setShowSweater] = useState(false)
    const [showSweatshirt, setShowSweatshirt] = useState(false)
    const [showPants, setShowPants] = useState(false)
    const [showShorts, setShowShorts] = useState(false)
    const [showSkirt, setShowSkirt] = useState(false)
    const [showDress, setShowDress] = useState(false)
    const [showJacket, setShowJacket] = useState(false)
    const [showBag, setShowBag] = useState(false)
    const [showShoes, setShowShoes] = useState(false)
    const options = ["top", "sweater", "sweatshirt", "pants", "shorts", "skirt", "dress", "jacket", "bag", "shoes"]
    const elements = [{type: "shirt", brand: "free people", name: "test"}];
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

    function HandleChecked(event, id) {
        let toSet = false;
        if (event.target.checked) {
            toSet = true;
        }
        switch (id) {
            case "top":
                setShowTop(toSet)
                break
            case "sweater":
                setShowSweater(toSet)
                break
            case "sweatshirt":
                setShowSweatshirt(toSet)
                break
            case "pants":
                setShowPants(toSet)
                break
            case "shorts":
                setShowShorts(toSet)
                break
            case "skirt":
                setShowSkirt(toSet)
                break
            case "dress":
                setShowDress(toSet)
                break
            case "jacket":
                setShowJacket(toSet)
                break
            case "bag":
                setShowBag(toSet)
                break
            case "shoes":
                setShowShoes(toSet)
                break
            default:
                console.log("unhandled clothing type")
        }
    }

    return (
        <div>
            <h3>new post</h3>
            <form onSubmit={(e) => NewPost(e)}>
                <input id="caption" type="text" placeholder="caption" onChange={(e) => setCaption(e.target.value)}/>
                <input id="photo" type="text" placeholder="photo" onChange={(e) => setPhoto(e.target.value)}/>
                <div>
                    <div>
                        <input type="checkbox" id="top" value="top" onChange={(e) => HandleChecked(e, "top")}/>
                        <label for="top">top</label>
                        <input type="text" id="topBrand" placeholder="top brand" disabled={!showTop}/>
                        <input type="text" id="topName" placeholder="top name" disabled={!showTop}/>
                    </div>
                    <div>
                        <input type="checkbox" id="sweater" value="sweater" onChange={(e) => HandleChecked(e, "sweater")}/>
                        <label for="sweater">sweater</label>
                        <input type="text" id="sweaterBrand" placeholder="sweater brand" disabled={!showSweater}/>
                        <input type="text" id="sweaterName" placeholder="sweater name" disabled={!showSweater}/>
                    </div>
                    <div>
                        <input type="checkbox" id="sweatshirt" value="sweatshirt" onChange={(e) => HandleChecked(e, "sweatshirt")}/>
                        <label for="sweatshirt">sweatshirt</label>
                        <input type="text" id="sweatshirtBrand" placeholder=" brand" disabled={!showSweatshirt}/>
                        <input type="text" id="sweatshirtName" placeholder=" name" disabled={!showSweatshirt}/>
                    </div>
                    <div>
                        <input type="checkbox" id="pants" value="pants" onChange={(e) => HandleChecked(e, "pants")}/>
                        <label for="pants">pants</label>
                        <input type="text" id="pantsBrand" placeholder="pants brand" disabled={!showPants}/>
                        <input type="text" id="pantsName" placeholder="pants name" disabled={!showPants}/>
                    </div>
                    <div>
                        <input type="checkbox" id="shorts" value="shorts" onChange={(e) => HandleChecked(e, "shorts")}/>
                        <label for="shorts">shorts</label>
                        <input type="text" id="shortsBrand" placeholder="shorts brand" disabled={!showShorts}/>
                        <input type="text" id="shortsName" placeholder="shorts name" disabled={!showShorts}/>
                    </div>
                    <div>
                        <input type="checkbox" id="skirt" value="skirt" onChange={(e) => HandleChecked(e, "skirt")}/>
                        <label for="skirt">skirt</label>
                        <input type="text" id="skirtBrand" placeholder="skirt brand" disabled={!showSkirt}/>
                        <input type="text" id="skirtName" placeholder="skirt name" disabled={!showSkirt}/>
                    </div>
                    <div>
                        <input type="checkbox" id="dress" value="dress" onChange={(e) => HandleChecked(e, "dress")}/>
                        <label for="dress">dress</label>
                        <input type="text" id="dressBrand" placeholder="dress brand" disabled={!showDress}/>
                        <input type="text" id="dressName" placeholder="dress name" disabled={!showDress}/>
                    </div>
                    <div>
                        <input type="checkbox" id="jacket" value="jacket" onChange={(e) => HandleChecked(e, "jacket")}/>
                        <label for="jacket">jacket</label>
                        <input type="text" id="jacketBrand" placeholder="jacket brand" disabled={!showJacket}/>
                        <input type="text" id="jacketName" placeholder="jacket name" disabled={!showJacket}/>
                    </div>
                    <div>
                        <input type="checkbox" id="bag" value="bag" onChange={(e) => HandleChecked(e, "bag")}/>
                        <label for="bag">bag</label>
                        <input type="text" id="bagBrand" placeholder="bag brand" disabled={!showBag}/>
                        <input type="text" id="bagName" placeholder="bag name" disabled={!showBag}/>
                    </div>
                    <div>
                        <input type="checkbox" id="shoes" value="shoes" onChange={(e) => HandleChecked(e, "shoes")}/>
                        <label for="shoes">shoes</label>
                        <input type="text" id="shoesBrand" placeholder="shoes brand" disabled={!showShoes}/>
                        <input type="text" id="shoesName" placeholder="shoes name" disabled={!showShoes}/>
                    </div>
                </div>
                <button type='submit'>post</button>
            </form>
        </div>
    );
}