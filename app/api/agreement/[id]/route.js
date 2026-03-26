import '@/Database/connection'
import Agreement from "@/Model/agreement.Model";
import chalk from 'chalk';
import { NextResponse } from 'next/server';


export const GET = async (req, { params }) => {
    try {

        const { id } = params
       
        const agreement = await Agreement.findOne({ _id: id }).populate("agreementType");

        return NextResponse.json(agreement)

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}