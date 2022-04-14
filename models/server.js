const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

    const app = express();
    const port = process.env.PORT;

    const middleware = () => {
        app.use(cors());
        app.use(express.json());
        app.use(express.static('public'));
    }

    const routes = () => {
        app.use('/api/auth', require('../routes/auth'));
        app.use('/api/categoria', require('../routes/categoria'));
        app.use('/api/usuario', require('../routes/usuario'));
    }
    
    const listen = () => {
        app.listen(port, () => {
            console.log(`Corriendo en el puerto ${port}`);
            dbConnection();
        });
    }

module.exports = {
    routes,
    listen,
    middleware
} 