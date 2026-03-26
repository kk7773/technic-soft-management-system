import '@/Database/connection'
import Admin from "@/Model/admin.Model"
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers';
import passwordHash from 'password-hash'


export const POST = async (req) => {
    try {
        const { username, password } = await req.json()
        const admin = await Admin.findOne({ username });

        if (admin) {

            const passwordMatch = passwordHash.verify(password, admin.password);

            if (passwordMatch) {

                admin.token = jwt.sign({ _id: admin._id.toString() }, process.env.TOKEN_SECRET_KEY);

                const data = await admin.save();

                cookies().set('token', data.token, { secure: true });
                cookies().set('permission', JSON.stringify(data.permission), { secure: true })

                return NextResponse.json({ message: "Login Successfully", data });

            } else {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }

        } else {
            return NextResponse.json({ message: "Invalid credential" }, { status: 401 });
        }

    } catch (error) {
        return NextResponse.json(error);
    }
}