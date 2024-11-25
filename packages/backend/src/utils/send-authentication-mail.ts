const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'brannon.daniel90@ethereal.email',
        pass: 'muakBKfmVp1KChRCNJ'
    }
});

export async function sendAuthenticationMail(
    emailTo: string,
    authId: number
) {
    var link = 'http://localhost:3500/api/auth/authenticate/' + authId;
    try {
        var info = await transporter.sendMail({
            from: 'Darko\'s Page', // sender address
            to: emailTo, // list of receivers
            subject: 'Confirm Login', // Subject line
            html:
                '<b>To confirm the registration, click here: <a href="' +
                link +
                '">' +
                link +
                '</a></b>', // html body
        });
        return { info };
    } catch (e) {
        // Log Errors
        throw Error('Error sending mail');
    }
};

export async function sendTFACode(
    emailTo: string,
    tfaNumber: number
) {
    try {
        var info = await transporter.sendMail({
            from: 'Darko\'s Page',
            to: emailTo,
            subject: 'Confirm Login',
            text: "Hello, this is your tfa number: " + tfaNumber + ". Do not share it!"
        });
        return { info };
    } catch (e) {
        // Log Errors
        throw Error('Error sending mail');
    }
};


exports.verify = async function () {
    transporter.verify().then(console.log).catch(console.error);
};
