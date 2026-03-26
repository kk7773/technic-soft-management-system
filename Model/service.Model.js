import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    description: {
        type: String,
        trim: true,
        required: true,
    },
    mrp: {
        type: Number,
        trim: true,
        required: true,
    },
    gst: {
        type: Number,
        trim: true,
        required: true,
        default: 18
    },
    discount: {
        type: Number,
        trim: true,
        required: true,
        default: 10
    }
},{timestamps: true})

const Service = mongoose.models.service || mongoose.model('service', serviceSchema)
export default Service