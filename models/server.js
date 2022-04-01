const express = require('express')
const cors = require('cors')

    const app = express() 
    const port = process.env.PORT

    const middleware = () => {
        app.use(cors())
        app.use(express.json())
        app.use(express.static('public'))
    }

    const routes = () => {
        app.use('/api/usuario', require('../routes/usuario'))
    }
    
    const listen = () => {
        app.listen(port, () => {
            console.log(port)
        })
    }

module.exports = {
    routes,
    listen,
    middleware
} 