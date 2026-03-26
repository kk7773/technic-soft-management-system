import { NextResponse } from 'next/server';
import passwordHash from 'password-hash'

export const GET = (req) => {
    try {
        const password =  passwordHash.generate('123456', { saltLength: 12 });
     
       return NextResponse.json(password)
    } catch (error) {
       return NextResponse.json(error)
    }
}