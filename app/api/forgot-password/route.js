import '@/Database/connection'
import Admin from "@/Model/admin.Model"
import { NextResponse } from "next/server";
import chalk from 'chalk';
import passwordHash from 'password-hash'


export const GET = async (req) => {
    try {

        const searchParams = await req.nextUrl.searchParams;
        const password = searchParams.get("password");

        const newPassword = passwordHash.generate(password, { saltLength: 12 });

        return NextResponse.json(newPassword)

    } catch (error) {
        return NextResponse.json(error)
    }
}