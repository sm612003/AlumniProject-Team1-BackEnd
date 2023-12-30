import nodemailer from 'nodemailer'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'jammal.souheir@gmail.com',
            pass: 'ztjcafkhylogzzjn',
        },
    });


const sendEmailToSubscribers = async (newsTitle) => {

    try {
        // Fetch all subscribed users
        const users = await prisma.subscribedUser.findMany();
        console.log(users)
        if (users.length === 0) {
            console.log('there no subscribed users')
        }
        users.map((user, i) => {
            const mailOptions = {
                from: {
                    name: 'techNow',
                    address: 'jammal.souheir@gmail.com'
                },
                to: user.email,
                subject: 'New News Alert',
                text: `Dear ${user.email},
          
          A new news item is available: ${newsTitle}
          
          Thank you for subscribing to our newsletter!`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent successfully:', info.response);
                }
            });
        })
    } catch (error) {
        console.error('Error fetching subscribed users:', error);
    }
};


const sendWelcomeEmail = async (userEmail) => {
 
    const mailOptions = {
        from: {
            name: 'techNow',
            address: 'jammal.souheir@gmail.com'
        },
        to: userEmail,
        subject: 'Welcome to Our Newsletter',
        text: `Dear ${userEmail},

        Welcome to our newsletter! We're excited to have you on board.

        Stay tuned for the latest news and updates from techNow.

        Best regards,
        techNow Team`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Welcome Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
};

export { sendEmailToSubscribers,sendWelcomeEmail };