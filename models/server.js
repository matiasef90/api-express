const express = require('express')

    const app = express() 
    const port = process.env.PORT

    const middleware = () => {
        app.use(express.static('public'))
        console.log('middleware')
    }

    const routes = () => {
        app.get('/api', (req, res) => {
            res.send('Hello World')
        })
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