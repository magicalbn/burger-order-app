import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-project-d515b-default-rtdb.firebaseio.com"
});

export default instance;