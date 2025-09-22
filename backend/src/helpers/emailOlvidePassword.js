import nodemailer from 'nodemailer';

export default async function emailOlvidePassword(datos) {
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
    try {
        //Enviar el email
        const info = await transporter.sendMail({
            from: '"APV - Administrador de Pacientes de Veterinaria" <noreply@apv.com>',
            to: email,
            subject: 'Restablece tu contraseña',
            text: 'Restablece tu contraseña en APV',
            html: `
        <p>Hola: ${nombre}, restablece tu contraseña en APV.</p>
        <p>Para restablecer tu contraseña, haz clic en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/forgot-password/${token}">Restablecer Contraseña</a> </p>

        <p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>
        `
        });

        console.log("mensaje enviado: %s", info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error al conectar con el servidor de correo:', error);
        return { success: false, error: error.message };
    }
}