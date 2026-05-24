import axios from "axios";

export async function requestWrapper(config) {
    try {
        const token = localStorage.getItem("token");

        const response = await axios.request({
            baseURL: process.env.REACT_APP_BACKEND_REGISTRATION_URL,
            ...config,
            validateStatus:  (status) => {return status < 400 },
            headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...config.headers,
            },
        });
        console.log("URL ", process.env.REACT_APP_BACKEND_REGISTRATION_URL ,config.url);
        console.log("wrapper",response);

        return response.data;
    } catch (error) {
        throw {
            message: error.response?.data?.message || error.message,
            status: error.response?.status,
            data: error.response?.data,
        };
    }
}