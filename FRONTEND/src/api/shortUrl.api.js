import axiosInstance from "../utils/axiosInstance";

export const createShortUrl = async (url) => {
    const {data} = await axiosInstance.post("http://localhost:3001/api/create", {url});
    return data.shortUrl
}