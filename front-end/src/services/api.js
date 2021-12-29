import axios from 'axios';

const api = axios.create({ // used to create a new instance with a custom configuration
    baseURL: "http://localhost:5000", 
});

export default api;