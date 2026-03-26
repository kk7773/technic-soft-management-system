import mongoose from "mongoose";


const agreeMentSchema = new mongoose.Schema({

    agreementType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "agreement_type"
    },
    party2: {
        name: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
        },
        number: {
            type: String,
            trim: true,
        },
        address: {
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
        location: {
            latitude: {
                type: String,
                trim: true
            },
            longitude: {
                type: String,
                trim: true
            }
        },
        ip: {
            type: String,
            trim: true,
        }
    }
}, { timestamps: true })

const Agreement = mongoose.models.agreement || mongoose.model("agreement", agreeMentSchema)
export default Agreement;