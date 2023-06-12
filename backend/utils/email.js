const nodemailer = require("nodemailer");
// const env = require("dotenv");
// env.config({
//     path: ".env",
// });
// console.log(process.env.EMAIL_ID);
exports.sendEmail = (
    to = "amolrathod20210@gmail.com",
    subject = "AWESOME EMAIL FROM NODE",
    text = "lorem ipsum"
) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS,
        },
    });
    const option = {
        from: process.env.EMAIL_ID,
        to,
        subject,
        text,
    };
    transporter.sendMail(option, (error) => {
        error ? console.log(`EMAIL NOT SEND ${error}`) : console.log("EMAIL SEND");
    });
};

