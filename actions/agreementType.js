import axios from "@/helper/axiosConfig";
import { toast } from "react-toastify";

export const postAgreementType = async (agreementTypeData) => {
    try {

        const { data } = await axios.post('/api/agreement-type', agreementTypeData)

        toast.success(data.massage, {
            position: "top-center"
        })

        return data.agreementType

    } catch (error) {
        console.log(error);
    }
}

export const getAgreementType = async () => {
    try {

        const { data } = await axios.get('/api/agreement-type')

        return data

    } catch (error) {
        console.log(error);
    }
}

export const patchAgreementType = async (id, newData) => {
    try {

        const { data } = await axios.patch(`/api/agreement-type/${id}`, newData)

        toast.success(data.message, {
            position: "top-center"
        })
        
        return data.agreementType 

    } catch (error) {
        toast.success(error.response.data.massage, {
            position: "top-center"
        })
        console.log(error);
    }
}