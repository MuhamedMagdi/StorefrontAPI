import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    port: process.env.PORT || 3000,
    bcryptPaper: process.env.BCRYPT_PAPER,
    bcryptRounds: Number(process.env.BCRYPT_ROUNDS) || 8,
    jwtSecret: process.env.JWT_SECRET as string,
};

export default appConfig;
