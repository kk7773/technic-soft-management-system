import axios from "@/helper/axiosConfig";
import { toast } from "react-toastify";


export const getBrandInfo = async (id) => {
    try {

        const { data } = await axios.get(`/api/brand-info?id=${id}`);
      
        return data;

    } catch (error) {
        console.log(error)
    }
}


export const postBrandInfo = async (brandInfo) => {
    try {

        const response = await axios.post("/api/brand-info", brandInfo)
      
        toast.success(response.data.message, {
            position: "top-center"
        });

    } catch (error) {
      toast.error(error.response.data.message, { position: "top-center" })

    }
}


export const updateBrandInfo = async (id, newData) => {
    try {

        const response = await axios.patch(`/api/brand-info?id=${id}`, newData);
    
        toast.success(response.data.message, {
            position: "top-center"
        })
    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })


    }
}

