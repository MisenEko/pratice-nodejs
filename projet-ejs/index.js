const express = require('express');
const app = express();
const port = 3000;

const articles = [
    {
        title: 'Débuter avec node.js',
        category: 'Développement Web',
    },
    {
        title: 'Node.js vs PHP',
        category: 'Développment Web',
    },
    {
        title: 'Les sockets en C',
        category: 'Programmation',
    },
    {
        title: 'Quel système d\'exploitation ?',
        category: 'Informatique',
    },
]

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));

app.get('/', (req, res) => {

    res.render('pages/home');

})

app.get('/hello/:name', (req, res)=> {

    res.render('pages/hello', {name: req.params.name});
})

app.get('/posts', (req, res)=>{
    res.render('pages/posts-list', {posts: articles});
})

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`)
})