const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const routerCrud = require('./router/router-crud');
const routerBasket = require('./router/router-basket');
const routerAuth = require('./router/router-auth');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const errorMiddleware=require('./middlewares/error-middleware')

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(cookieParser())
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));
app.use('/api', routerCrud);
app.use('/auth', routerAuth);
app.use('/basket', routerBasket);
app.use(errorMiddleware);


async function start() {
    try {
        await mongoose.connect(process.env.DB_URL);
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    } catch (error) {
        console.log(error);
    }
}

start();