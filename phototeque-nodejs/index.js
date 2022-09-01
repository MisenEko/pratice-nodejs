const express = require('express')
const session = require('express-session')
const flash = require('connect-flash')
const mongoose = require ('mongoose')
const path = require('path')
const albumRoute = require('./routes/album.routes')

const app = express()

mongoose.connect('mongodb://localhost/phototheque')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.use(flash())

// app.get('/', (req, res)=>{
//     res.render('album', {title: 'Album'})
// })

app.use('/', albumRoute)

app.use((req, res)=>{
    res.status(404)
    res.send('Page non trouvé')
})

app.listen(3000, ()=> {
    console.log('Application est lancé sur le port 3000')
});
