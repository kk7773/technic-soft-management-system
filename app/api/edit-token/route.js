import chalk from "chalk";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    try {

        const data = await req.json();
        
        const token = jwt.sign(data, process.env.TOKEN_SECRET_KEY, { expiresIn: 86400 }); // expiresIn in seconds

        return NextResponse.json(token)

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
    }
}

export const GET = async (req) => {
    try {

        const searchParams = await req.nextUrl.searchParams;
        const token = searchParams.get("token");

        const verifyData = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

        const expDate = new Date(verifyData.exp * 1000);

        verifyData.exp = expDate.toLocaleString();

        return NextResponse.json(verifyData)

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({  message: "Internal Server Error", error}, { status: 500 })
    }
}