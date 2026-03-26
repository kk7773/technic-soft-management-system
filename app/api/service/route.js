
import '@/Database/connection'
import Service from '@/Model/service.Model'
import { NextResponse } from 'next/server'
import chalk from 'chalk'

export const POST = async (req) => {
    try {

        const data = await req.json()

        const serviceData = await Service(data)

        const service = await serviceData.save();

        return NextResponse.json({ message: "Service Created Successfully", service })

    } catch (error) {
        console.log(chalk.bgRed.bold(error))
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}

export const GET = async (req) => {
    try {
        const service = await Service.find().sort({ name: 1 });

        return NextResponse.json({ message: "Service Send Successfully", service })

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error })
    }
}

export const PATCH = async (req) => {
    try {

        const searchParams = await req.nextUrl.searchParams;
        const id = searchParams.get("id");

        const updateData = await req.json();

        const service = await Service.findOneAndUpdate({ _id: id }, updateData, { new: true });

        return NextResponse.json({ message: "Service Updated Successfully", service }, { status: 200 })

    } catch (error) {
        console.log(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
    }
}