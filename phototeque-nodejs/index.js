const express = require('express')
const mongoose = require ('mongoose')
const path = require('path')

const app = express()

mongoose.connect('mongodb://localhost/phototheque')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('album', {title: 'Album'})
})

app.use((req, res)=>{
    res.status(404)
    res.send('Page non trouvé')
})

app.listen(3000, ()=> {
    console.log('Application est lancé sur le port 3000')
});
