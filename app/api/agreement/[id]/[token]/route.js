import Agreement from "@/Model/agreement.Model"
import { NextResponse } from "next/server"
import jwt from 'jsonwebtoken'

export const PATCH = async (req, { params }) => {
    try {

        const jwtVerify = jwt.verify(params.token, process.env.TOKEN_SECRET_KEY);

        if (jwtVerify) {

            const updateData = await req.json();
            
            const agreement = await Agreement.findOneAndUpdate({ _id: params.id }, updateData, { new: true })

            return NextResponse.json({ message: "Agreement updated successfully", agreement }, { status: 200 })
        }

    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}