const nodemailer = require('nodemailer');
const otpGen = require('otp-generator');
const otp = require('../Models/otp');

const transport = nodemailer.createTransport({
    host : process.env.SMTP_HOST,
    port : process.env.SMTP_PORT,
    secure : false,
    auth : {
        user : process.env.SMTP_EMAIL,
        pass : process.env.SMTP_EMAIL_PASSWORD
    }
})

const verificationMail = async (email)=> {

    const generatedOtp = otpGen.generate(6, {
        upperCaseAlphabets: false, 
        lowerCaseAlphabets : false, 
        specialChars : false
    })
    await otp.create({email, otp: generatedOtp});

    const mailOptions = {
        from : process.env.SMTP_EMAIL,
        to : `${email}`,
        subject : 'Verification of new user.',
        html  : `<table style="width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; color: #000000; margin: 0; padding : 0">
                    <tr>
                    <td>
                    <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Thank you for registration !</h2>
                        <p style="margin-bottom: 16px;">Your OTP for verification is <strong>${generatedOtp}</strong></p>
                        
                        <footer style="background-color: #0f172a; color: #f4f4f5; padding: 20px; bottom : 0; border-radius: 8px; text-align: center;">
                            <p>Contact Us:</p>
                            <p>admin@blogspot.com</p>
                            <p>Punjabi University Patiala, Phalauli, 147001</p>
                            <p>+91 76564-21XX</p>
                            <div style="display: flex; justify-content: center; gap: 16px; margin-top: 8px;">
                                <a href="#" style="color: #f4f4f5; text-decoration: none;"><i style="font-style: normal;">Instagram</i></a>
                                <a href="#" style="color: #f4f4f5; text-decoration: none;"><i style="font-style: normal;">Facebook</i></a>
                                <a href="#" style="color: #f4f4f5; text-decoration: none;"><i style="font-style: normal;">Twitter</i></a>
                            </div>
                        </footer>
                    </td>
                    </tr>
                </table>`
    }

    await transport.sendMail(mailOptions);
}

const welcomeMail = async (name, email) =>{
    const mailOptions = {
            from : process.env.SMTP_EMAIL,
            to : `${email}`,
            subject : 'Welcome Letter',
            text : `Thank You for Joining Us ! We are Glad to have you with us. We will keep updating you`,
            html : `<table style="width: 100%; max-width: 800px; margin: 0 auto; padding: 20px; font-family: sans-serif; color: #000000; margin: 0; padding : 0">
                        <tr>
                        <td>
                            <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">Welcome to My Blog!</h1>
                            <p style="margin-bottom: 16px;">Hello ${name}</p>
                            <p style="margin-bottom: 16px;">Thank you for registering with My Blog! We're thrilled to have you join our community. Get ready to explore insightful posts on topics like "Inverse Coherent Portal" and "Cybersecurity," crafted by experts like Michael.</p>
                            <p style="margin-bottom: 16px;">Here’s what you can do next:</p>
                            <ul style="margin-bottom: 16px; padding-left: 20px;">
                                <li style="margin-bottom: 8px;">Visit our <a href="#" style="color: #ea580c; text-decoration: none; border-bottom: 1px solid #ea580c; padding-bottom: 1px;">Home page</a> to start reading.</li>
                                <li style="margin-bottom: 8px;">Explore the <a href="#" style="color: #ea580c; text-decoration: none; border-bottom: 1px solid #ea580c; padding-bottom: 1px;">About</a> section to learn more about us.</li>
                                <li style="margin-bottom: 8px;">Subscribe to our beta features by clicking the button below!</li>
                            </ul>
                            <a href="#" style="display: inline-block; background-color: #ea580c; color: #ffffff; padding: 10px 24px; text-decoration: none; border-radius: 8px; margin-bottom: 16px;">Subscribe Now</a>
                            <p style="margin-bottom: 16px;">If you have any questions, feel free to reach out to us at <a href="mailto:admin@blogspot.com" style="color: #ea580c; text-decoration: none; border-bottom: 1px solid #ea580c; padding-bottom: 1px;">admin@blogspot.com</a>.</p>
                            <p style="margin-bottom: 16px;">Happy reading!<br>The My Blog Team</p>
                            <footer style="background-color: #0f172a; color: #f4f4f5; padding: 20px; margin-top: 16px; border-radius: 8px; text-align: center;">
                                <p>Contact Us:</p>
                                <p>admin@blogspot.com</p>
                                <p>Punjabi University Patiala, Phalauli, 147001</p>
                                <p>+91 76564-21XX</p>
                                <div style="display: flex; justify-content: center; gap: 16px; margin-top: 8px;">
                                    <a href="#" style="color: #f4f4f5; text-decoration: none;"><i style="font-style: normal;">Instagram</i></a>
                                    <a href="#" style="color: #f4f4f5; text-decoration: none;"><i style="font-style: normal;">Facebook</i></a>
                                    <a href="#" style="color: #f4f4f5; text-decoration: none;"><i style="font-style: normal;">Twitter</i></a>
                                </div>
                            </footer>
                        </td>
                        </tr>
                    </table>`
        }

    await transport.sendMail(mailOptions); 
}

module.exports = {verificationMail, welcomeMail}