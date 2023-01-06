import axios from "axios";

/**
 * Defines an axios instance
 */
const api = axios.create({
  baseURL: "https://api.airtable.com/v0",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // sets Authorization header with airtable token
    config.headers.Authorization = `Bearer keylMhn7rCYLGc5WO`;
    return config;
  },
  // Do something with request error
  (error) => Promise.reject(error)
);

export default api;
