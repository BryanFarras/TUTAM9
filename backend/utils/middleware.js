const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const helmet = require('helmet');


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later.'
});

const corsMiddleware = (app) => {
    const corsOptions = {
        origin: ['*', 'https://os.netlabdte.com', 'http://localhost:5173', 'https://advanced-express-zkl7.vercel.app','http://192.168.76.1:5173', 'https://advanced-express-zkl7-git-main-daffa-hardhans-projects.vercel.app'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    app.use(require('cors')(corsOptions));
};

module.exports = { securityMiddleware, corsMiddleware };
