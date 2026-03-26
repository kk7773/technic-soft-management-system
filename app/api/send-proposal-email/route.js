import { NextResponse } from "next/server";
import chalk from 'chalk'
import nodemailer from 'nodemailer';

export const POST = async (req) => {
    try {

        const data = await req.json();


        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
           
            auth: {
                user: data.email,
                pass: data.emailPassword
            }
        });

        const sendEmailResponse = await transporter.sendMail({
            from: `ValueX Digital <${data.email}>`,
            to: "krishankumarsvg@gmail.com",
            subject: data.emailSubject,
            html: "<b>Hello world?</b>",
        })

        console.log(sendEmailResponse)

        return NextResponse.json("DSf")

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error: error });
    }
}