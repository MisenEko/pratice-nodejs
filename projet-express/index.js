const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const port = 3000;

app.use(session({ 
    secret : 'autrechoseàfoutre',
    resave: false,
    saveUninitialized: true,
}));

app.use('/static', express.static('public'));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const logRequest = (req, res, next) => {
    console.log(`>${new Date().toLocaleTimeString()}`)
    next()
}

app.use(logRequest);

app.get('/', (req, res) => {
    if(!req.session.views){
        req.session.views = 0;
    }
    req.session.views++
    res.send(`hello world! Vous avez consulté cette page : ${req.session.views} fois`)
})



app.post('/form', (req, res)=>{
    console.log(req.body)
    res.send('formulaire traité !')
})

app.get('/bonjour', (req, res) => {
    console.log(req.query)
    console.log(req.params)

    const text = `bonjour ${req.query.prenom} ${req.query.nom}`
    res.send(text)
})

app.get('/articles/:id', (req, res)=>{

    const article = `Voici l'article numéro : ${req.params.id}`
    res.send(article)
})

app.get('/fichier/html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/page.html'));
})

app.use((req, res) => {
    res.status(404).send("Page non trouvée.")
})

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`)
})