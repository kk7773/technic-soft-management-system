import axios from "@/helper/axiosConfig";
import { toast } from "react-toastify";


export const getAgreement = async () => {
    try {

        const { data } = await axios.get("/api/agreement");

        return data;

    } catch (error) {
        console.log(error)
    }
}



export const postAgreement = async (agreementData) => {
    try {

        const response = await axios.post("/api/agreement", agreementData)

        toast.success(response.data.message, {
            position: "top-center"
        });

    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })

    }
}


export const updateAgreementByToken = async (id, token, updateData) => {
    try {
        console.log(id, token, updateData)
        const response = await axios.patch(`/api/agreement/${id}/${token}`, updateData);
        toast.success(response.data.message, {
            position: "top-center"
        })
    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })


    }
}



export const deleteAgreement = async (id) => {
    try {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {
            const response = await axios.delete(`/api/agreement?id=${id}`);

            toast.success(response.data.message, {
                position: "top-center"
            });
            window.location.reload()
        } else {

            toast.info('Deletion canceled', {
                position: 'top-center',
            });

        }
    } catch (error) {
        toast.error(error.response.data.message, { position: "top-center" })

    }
}

export const getAgreementById = async (id) => {
    try {

        const { data } = await axios.get(`/api/agreement/${id}`);

        return data

    } catch (error) {
        console.log(error)
    }
}