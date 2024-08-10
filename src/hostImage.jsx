import axios from "axios";

const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
export const hostImage = async (incomingImage) => {
    const image = { image: incomingImage }
    let imageUrl = ''

    const res = await axios.post(imgHostingApi, image, {
        headers: {
            'content-type': 'multipart/form-data'
        }
    })
    try {
        imageUrl = res?.data?.data?.display_url
    }
    catch (err) {
        imageUrl = ''
    }

    return imageUrl
}