const express = require('express');
const app = express();
const bodyParser =  require('body-parser');

app.use(express.static('public'));
// we’ll be using EJS (Embedded JavaScript). EJS is a templating language.
app.set('view engine', 'ejs');

//body-parser allows us to make use of the key-value pairs stored on the req-body object
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req, res){
    // res.send("Hello World !!!");
    res.render('index');
});

app.post('/', function(req,res){
    console.log("api called", req.body);
    res.render('index');
});

app.listen(3000,function(){
    console.log('Example app listening on port 3000!');
});