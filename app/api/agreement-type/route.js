import '@/Database/connection'
import AgreementType from "@/Model/agreementType.Model"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    try {

        const data = await req.json()

        const agreementTypeData = await AgreementType(data);

        const agreementType = await agreementTypeData.save()

        return NextResponse.json({ massage: "Agreement type credited successfully", agreementType }, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}

export const GET = async (req) => {
    try {

        const agreementType = await AgreementType.find()

        return NextResponse.json(agreementType, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}