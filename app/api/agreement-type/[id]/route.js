import AgreementType from "@/Model/agreementType.Model";
import chalk from "chalk";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
    try {
        const { id } = params

        const data = await req.json()

        const agreementType = await AgreementType.findOneAndUpdate({ _id: id }, data, { new: true })

        return NextResponse.json({ message: "Agreement Updated Successfully", agreementType })

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
    }
}