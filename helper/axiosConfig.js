import axios from "axios";

const axiosURL = axios.create({
    // baseURL:"http://192.168.1.20:3000"
     baseURL: "http://localhost:3001"
    //baseURL:"https://www.management.thevxd.com"
});

export default axiosURL