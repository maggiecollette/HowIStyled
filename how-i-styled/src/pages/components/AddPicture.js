import {supabase} from "../../supabaseClient";

export async function AddPicture(event, source) {
    try{
        event.preventDefault()

        if (!event.target.files || event.target.files.length === 0) {
            throw new Error('You must select an image to upload.')
        } else {
            const file = event.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Math.random()}.${fileExt}`
            const filePath = `${fileName}`

            const { error } = await supabase
                .storage
                .from(source)
                .upload(filePath, file)

            return filePath;
        }
    } catch (error) {
        console.log(error)
    }
}