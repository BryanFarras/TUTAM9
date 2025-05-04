const express = require('express');
require('dotenv').config();
const baseResponse = require('./utils/baseResponse');


//const { securityMiddleware, corsMiddleware } = require('./utils/middleware');

const userRoutes = require('./routes/route.user');
const noteRoutes = require('./routes/route.note');

const app = express();
const PORT = process.env.PORT || 3000;

//corsMiddleware(app);
//securityMiddleware(app);

app.use(express.json());

app.use('/user', userRoutes);
app.use('/note', noteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
