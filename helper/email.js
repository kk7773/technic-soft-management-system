
import nodemailer from 'nodemailer';

export const email = (email, password) => {

    return transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: password
        }
    });
}