const nodemailer = require('nodemailer');

async function SendEmailWithAttachment(from, to, subject, text, attachmentPath) {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'kyoungd@gmail.com', // replace with your email
            pass: 'wgux mtat zppq szsq' // replace with your password
        }
    });

    // Setup email data with unicode symbols and an attachment
    let mailOptions = {
        from: from, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plain text body
        attachments: [
            {
                path: attachmentPath // stream this file
            }
        ]
    };

    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    return info;
}

module.exports = SendEmailWithAttachment;

// Usage example
// SendEmailWithAttachment('your-email@gmail.com', 'recipient-email@gmail.com', 'Subject', 'Hello world!', '/path/to/your/file');
