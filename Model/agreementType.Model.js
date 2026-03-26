import mongoose from "mongoose";


const agreementTypeSchema = new mongoose.Schema({

    agreementName: {
        type: String,
        trim: true,
    },
    agreementText: {
        type: String,
        trim: true,
    },
    party1: {
        name: {
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

const AgreementType = mongoose.models.agreement_type || mongoose.model("agreement_type", agreementTypeSchema)
export default AgreementType; 