import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
const password = process.env.Pass ;
const omar = process.env.OmarEmail ;
const omar333 = process.env.newEmail

export const contactEmail = (req , res) => {
    const name  = req.body.name ;
    const email = req.body.email ;
    const subject = req.body.subject ;
    const message = req.body.message ;

    // if (!name || !email || !subject || !message) {
    //     return res.status(400).json({
    //         error: 'All fields are required'
    //     });
    // }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'omarbanat333@gmail.com',
            pass: 'nowTech.2023'
        } 
    })

    const mailOptions = {
        from: omar333 ,
        to: 'wardetlhob1@gmail.com',
        subject: subject ,
        text: `Dear Omar Banat , 
        I hope This message finds you well.
        I am ${name}.
        ${message}
        you can contact me on my email: ${email}.
        Sincerly,
        ${name}`
    }
    console.log(mailOptions.text)

    transporter.sendMail(mailOptions, (err , data) => {
        if (err){
            console.log('Error sending Contact Form' , err)
            return res.status(500).json({
                error : 'Failed to send Contact Form',
                err : err
            })
        } else {
            console.log('Contact Form sent successfuly: ', data.response)
            return res.status(200).json({message : 'Contact Form sent Successfuly'})
        }
    })
}