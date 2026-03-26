import axios from "@/helper/axiosConfig";
import { toast } from "react-toastify";



export const postService = async (serviceData) => {
    try {

        const { data } = await axios.post('/api/service', serviceData);

        toast.success(data.message, {
            position: "top-center"
        });

        return data.service

    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })
    }
}


export const getService = async () => {
    try {

        const { data } = await axios.get('/api/service');

        return data.service

    } catch (error) {
        return error
    }
}

export const patchService = async (id, serviceData) => {
    try {

        const { data } = await axios.patch(`/api/service?id=${id}`, serviceData);

        toast.success(data.message, {
            position: "top-center"
        });
        return data.service

    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })
    }
}