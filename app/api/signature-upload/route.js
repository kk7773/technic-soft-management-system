
import { NextResponse } from "next/server.js";
import fs, { writeFile } from 'fs/promises';
import { join } from 'path';



export const POST = async (req, res) => {
    try {

        const formData = await req.formData();

        const imageFile = formData.get('signature')
       

        if (!imageFile) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 500 });
        }
console.log(imageFile)

        const bufferData = await imageFile.arrayBuffer();

        const buffer = Buffer.from(bufferData);

        const path = `./public/images/signature/${imageFile.name}`;

        await writeFile(path, buffer);


        const timestamp = Date.now();
        const uniqueFilename = `${timestamp}-${imageFile.name}`
        const uploadPath = join('./public/images/signature/', uniqueFilename);

        // Save the uploaded file with the unique filename
        await fs.rename(path, uploadPath);

        return NextResponse.json({ message: "Image upload successfully", url: `/images/signature/${uniqueFilename}` });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
};


