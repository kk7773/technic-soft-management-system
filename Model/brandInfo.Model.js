import mongoose from "mongoose";


const brandInfoModel = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    number: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    companyName: {
        type: String,
        trim: true,
    },
    signature: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
    proposalTC: {
        type: String,
        trim: true,
    },
    adsProposalTC: {
        type: String,
        trim: true,
    },

}, { timestamps: true })

const brandInfo = mongoose.models.brand_info || mongoose.model("brand_info", brandInfoModel)
export default brandInfo