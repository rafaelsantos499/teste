
const nodemailer = require('nodemailer');

interface IsendEmail {
  destinatario : string,
  assunto: string,
  html: string
}

function createdTransporter(){
  
    return nodemailer.createTransport({
        host: process.env.HOST,
        port: process.env.PORT,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
    })
}

  async function sendEmail({
    destinatario: destinatario,
    assunto: assunto, 
    html: html
   } : IsendEmail) {
    try {
      const transporter = createdTransporter();
  
      const mailOptions = {
        from: 'seu-email@example.com',
        to: destinatario,
        subject: assunto,
        html: html,
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail enviado:', info.response);
    } catch (error) {
      console.log('Erro ao enviar e-mail:', error);
    }
  }

  export { sendEmail }
  