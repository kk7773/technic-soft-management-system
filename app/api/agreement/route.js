import '@/Database/connection'
import Agreement from '@/Model/agreement.Model';
import { NextResponse } from 'next/server';
import chalk from 'chalk';



export const POST = async (req) => {

    try {
        const data = await req.json();
        const agreementData = new Agreement(data);
      
        const agreement = await agreementData.save();

        return NextResponse.json({ message: "Agreement Created Successfully", agreement })

    } catch (error) {
        console.log(chalk.bgRed.bold(error))
        return NextResponse.json({ message: "Internal server error", error })
    }

}



export const GET = async (req) => {
    try {

        const agreement = await Agreement.find().populate("agreementType");
      
        return NextResponse.json(agreement)

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}


