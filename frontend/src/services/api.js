import axios from "axios";

// Render backend URL
const api = axios.create({
    baseURL: "https://focusmate-0fbg.onrender.com/api",
    headers: {
        "Content-Type": "application/json"
    }
});

// Add JWT token automatically to every request
api.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

// Handle unauthorized requests
api.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {

        if (error.response?.status === 401) {

            console.log("Session expired or unauthorized");

            localStorage.removeItem("token");

            // Optional: redirect to login
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;