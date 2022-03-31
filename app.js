require('dotenv').config()
const { routes, listen, middleware } = require('./models/server')

middleware()
routes()
listen()