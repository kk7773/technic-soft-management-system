import '@/Database/connection'
import Admin from "@/Model/admin.Model"
import { NextResponse } from "next/server";
import chalk from 'chalk';
import passwordHash from 'password-hash'

export const POST = async (req) => {
    try {
        const data = await req.json();

        const password = passwordHash.generate(data.password, { saltLength: 12 });

        data.password = password;

        const adminData = await Admin(data);
        const admin = await adminData.save();

        return NextResponse.json({ message: "Admin created successfully", admin }, { status: 200 })

    } catch (error) {
        return NextResponse.json(error, { status: 500 })
    }
}


export const GET = async (req) => {
    try {

        const admin = await Admin.find();

        return NextResponse.json(admin, { status: 200 })

    } catch (error) {
        console.log(chalk.bgRed.bold(error))
        return NextResponse.json(error, { status: 500 })
    }
}


export const PATCH = async (req) => {
    try {

        const searchParams = await req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const updateData = await req.json();

     
        if (updateData.password) {
            const password = passwordHash.generate(updateData.password, { saltLength: 12 });

            updateData.password = password;
        }
       
        const updatedAdmin = await Admin.findByIdAndUpdate(id, updateData, { new: true });

        return NextResponse.json({ message: "admin updated successfully", admin: updatedAdmin }, { status: 200 })

    } catch (error) {
        console.log(chalk.bgRed.bold(error))
        return NextResponse.json(error, { status: 500 })
    }
}