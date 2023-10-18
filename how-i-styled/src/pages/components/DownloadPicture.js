import {supabase} from "../../supabaseClient";

export async function DownloadPicture(path, source) {
    try {
        const { data, error } = await supabase.storage.from(source).download(path)
        if (error) {
            throw error
        }
        return URL.createObjectURL(data);
    } catch (error) {
        console.log('Error downloading image: ', error.message)
    }
}