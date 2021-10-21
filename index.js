const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');

//Config
//Template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine','handlebars');

//Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Rotas
app.get('/', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(data){
        console.log(data);
        res.render('home',{data: data})
    })
})

app.get('/cad', function (req, res) {
    res.render('formulario');
});

app.post('/add', function (req, res) {
   Post.create({
       titulo: req.body.titulo,
       conteudo: req.body.conteudo
   }).then(function (){
       res.redirect('/')
   }).catch(function (err) {
       res.send('Houve um erro: ' + err.message)
   })
});

app.get('/deletar/:id', function (req, res) {
   Post.destroy({where: {'id':req.params.id}}).then(function(){
    res.redirect('/')
   }).catch(function (err) {
    res.send("Esta postagem não existe")
   })
})

app.listen(8000, function () {
    console.log('start servidor');
})