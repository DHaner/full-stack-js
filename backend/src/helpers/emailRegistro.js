import nodemailer from 'nodemailer';

export async function emailRegistro(datos) {
    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const { email, nombre, token } = datos;

    //Enviar el email
    const info = await transporter.sendMail({
        from: '"APV - Administrador de Pacientes de Veterinaria" <noreply@apv.com>',
        to: email,
        subject: 'Confirma tu cuenta',
        text: 'Confirma tu cuenta en APV',
        html: `
        <p>Hola: ${nombre}, confirma tu cuenta en APV.</p>
        <p>Tu cuenta ya está casi lista, solo debes confirmarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirm/${token}">Confirmar Cuenta</a> </p>

        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
    });

    console.log("mensaje enviado: %s", info.messageId);

}