import axios from "@/helper/axiosConfig"

export const verifyToken = async (token) => {
    try {
        const { data } = await axios.get(`/api/edit-token?token=${token}`)
        return data
    } catch (error) {

        return error.response.data
    }
}