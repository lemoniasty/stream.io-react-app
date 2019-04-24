// Prepare Axios library to communicate with API endpoint responsible for streams.
import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost:3001"
});