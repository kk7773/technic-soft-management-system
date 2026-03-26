import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    permission: {
        type: Array
    },
    brandInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brand_info',
        required: true
    },
    token: {
        type: String,
        trim: true,
    }
}, { timestamps: true })


const Admin = mongoose.models.admin || mongoose.model('admin', adminSchema);
export default Admin;