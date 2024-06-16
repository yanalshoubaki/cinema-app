import axios from "axios";
const client = () => {
    const instance = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    return instance;
}

export default client;