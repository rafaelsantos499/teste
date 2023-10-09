const linkFrontEnd = process.env.LINK_FRONT_END

const htmlResetPassword = (token : string) : string => {

    const HTML_REQUEST_PASSWORD = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Recuperação de Senha</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          background-color: #ff8c00;
          color: #fff;
          padding: 10px;
          border-radius: 10px 10px 0 0;
        }
        .content {
          padding: 20px;
        }
        .btn {
          display: inline-block;
          padding: 10px 20px;
          background-color: #ff8c00;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Recuperação de Senha</h2>
        </div>
        <div class="content">
          <p>Olá,</p>
          <p>Você está recebendo este e-mail porque foi solicitada a recuperação de senha da sua conta.</p>
          <p>Para redefinir a sua senha, clique no botão abaixo:</p>
          <a class="btn" href="${linkFrontEnd}?token=${token}">Redefinir Senha</a>
          <p>Caso você não tenha solicitado a recuperação de senha, ignore este e-mail.</p>
        </div>
        <div class="footer">
          <p>Equipe do Seu Site</p>
        </div>
      </div>
    </body>
    </html>`

    return HTML_REQUEST_PASSWORD
}


const htmlWelcome = (name: string) : string => {
    const HTML_WELCOME = `
        <!DOCTYPE html>
        <html>
        <head>
        <style>
            /* Estilos personalizados para o e-mail */
            body {
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            }

            .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            h1 {
            color: #ff6f00;
            text-align: center;
            margin-top: 0;
            }

            p {
            color: #333333;
            font-size: 16px;
            line-height: 1.5;
            }

            .cta-button {
            display: block;
            width: 200px;
            margin: 20px auto;
            text-align: center;
            background-color: #ff6f00;
            color: #ffffff;
            text-decoration: none;
            padding: 10px;
            border-radius: 5px;
            }
        </style>
        </head>
        <body>
        <div class="container">
            <h1>Bem-vindo à nossa plataforma!</h1>
            <p>Olá, ${name}!</p>
            <p>
            Obrigado por se cadastrar em nossa plataforma. Estamos empolgados em tê-lo(a) como parte da nossa comunidade.
            Esperamos que você aproveite ao máximo nossos recursos e benefícios.
            </p>
            <p>
            Se você tiver alguma dúvida ou precisar de assistência, não hesite em entrar em contato conosco.
            Estamos aqui para ajudar!
            </p>
            <a href="[URL_DO_SITE]" class="cta-button">Acesse nossa plataforma</a>
            <p>
            Mais uma vez, seja bem-vindo(a)! Estamos ansiosos para ver o que você vai conquistar conosco.
            </p>
            <p>Atenciosamente,</p>
            <p>A equipe da plataforma</p>
        </div>
        </body>
        </html>
        `
    return HTML_WELCOME
}



export { htmlResetPassword , htmlWelcome}