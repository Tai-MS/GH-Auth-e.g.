import express from 'express'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import initializePassport from './config/passport.config.js'

import viewsRouter from './routes/views.router.js'
import sessionRouter from './routes/session.router.js'

const app = express()
const server = app.listen(8080, ()=>console.log("Port 8080"))
const connection = mongoose.connect('mongodb+srv://taiel:hola123@cluster0.jawvxzu.mongodb.net/eCommerce2?retryWrites=true&w=majority')
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

initializePassport()
app.use(session({
    secret:'secret'
}))
app.use(passport.initialize())
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter)



