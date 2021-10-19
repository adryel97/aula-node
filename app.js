const express = require('express')
const app = express()
const port = 8000

app.get('/', function(req, res){
    res.sendFile(__dirname + '/view/index.html');
}
)
app.get('/contato', function(req, res){
    res.send('Contato')
})

app.get('/ola/:nome/:cor', function (req, res) {
    res.send(`<h1>${req.params.cor}<h2>`)
})

app.listen(port, function () {
    console.log('start servidor');
})