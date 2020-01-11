const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
const apiKey = '8ed225b6e1bab5b8211704bcda9ba4e9';

app.use(express.static('public'));
// we’ll be using EJS (Embedded JavaScript). EJS is a templating language.
app.set('view engine', 'ejs');

//body-parser allows us to make use of the key-value pairs stored on the req-body object
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    // res.send("Hello World !!!");
    res.render('index');
});

app.post('/', function (req, res) {
    // console.log("api called", req.body);
    // res.render('index');
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    request(url, function (err, response, body) {
        if (err) {
            res.render('index', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body);
            if (weather.main == undefined) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', { weather: weatherText, error: null });
            }
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});