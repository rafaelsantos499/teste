import passport from "passport";
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
        {
            clientID: '764194569902-k39aem2kmg8ut5jou5tk73p7tqhp0jpe.apps.googleusercontent.com',
            clientSecret: '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',
            callbackURL: 'http://127.0.0.1:3000/login/auth/google/callback',
        },
        (accessToken, refreshToken, profile, done) => {
            // Aqui, você pode verificar se o usuário já existe no banco de dados ou criar um novo usuário com o Prisma.
            // Por simplicidade, assumiremos que o usuário já existe no banco de dados.
            const user = { id: profile.id, email: profile.emails[0].value }; // Você pode personalizar isso com mais informações do perfil.
            console.log(user)
            return done(null, user);
        }
    )
);

