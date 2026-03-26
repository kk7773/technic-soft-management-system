import axios from "@/helper/axiosConfig";
import { toast } from "react-toastify";


export const adminLogin = async (loginData) => {
    try {
        const { data } = await axios.post('/api/admin/login', loginData);

        toast.success(data.message, {
            position: "top-center"
        })
      
        return data.data

    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center"
        });

        return null
    }
}


export const postAdmin = async (userData) => {
    try {
        const { data } = await axios.post('/api/admin', userData);

        toast.success(data.message, {
            position: "top-center"
        })
    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center"
        });
    }
}

export const getAdmin = async () => {
    try {

        const { data } = await axios.get('/api/admin');

        return data

    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center"
        });
    }
}

export const patchAdmin = async (id, updateData) => {
    try {

        const { data } = await axios.patch(`/api/admin?id=${id}`, updateData);

        toast.success(data.message, {
            position: "top-center"
        })

    } catch (error) {
        toast.error(error.response.data.message, {
            position: "top-center"
        });
    }
}