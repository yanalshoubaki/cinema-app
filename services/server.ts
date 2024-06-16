import axios from "axios";

const server = () => {
    const instance = axios.create({
        baseURL: process.env.BACKEND_API_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return instance
}

export default server