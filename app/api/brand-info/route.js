import '@/Database/connection'
import brandInfo from '@/Model/brandInfo.Model';
import chalk from 'chalk';
import { NextResponse } from 'next/server';



export const POST = async (req) => {

    try {

        const data = await req.json()

        const brandInfoSave = await brandInfo(data);

        const brandInfoData = await brandInfoSave.save();

        return NextResponse.json({ message: "BrandInformation Created Successfully", brandInfo: brandInfoData }, { status: 201 })

    } catch (error) {
        console.error(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal server error", error }, { status: 500 })
    }

}


export const GET = async (req) => {
    try {

        const searchParams = await req.nextUrl.searchParams;
        const id = searchParams.get("id");

        const brandInfoData = await brandInfo.findOne({ _id: id });

        return NextResponse.json(brandInfoData, { status: 200 })

    } catch (error) {
        console.error(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 })
    }
}

export const PATCH = async (req) => {
    try {
        const searchParams = await req.nextUrl.searchParams;
        const id = searchParams.get("id");
        const updateData = await req.json();

        const updatedBrandInfo = await brandInfo.findOneAndUpdate({ _id: id }, updateData, { new: true });

        if (!updatedBrandInfo) {

            return NextResponse.json({ message: "Brand Information not found" }, { status: 404 });
        }else{
            return NextResponse.json({ message: "Update Brand Information", brandInfo: updatedBrandInfo }, { status: 200 });
        }

      
    } catch (error) {
        console.error(chalk.bgRed.bold(error));
        return NextResponse.json({ message: "Internal Server Error", error }, { status: 500 });
    }
}