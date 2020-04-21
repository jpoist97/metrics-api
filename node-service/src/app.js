const path = require('path');
const express = require('express');
const cors = require('cors');
const hbs = require('hbs');
const twitterMetrics = require('./twitterMetrics');
const gmailMetrics = require('./gmailMetrics');

const app = express();

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Set handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(cors());

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get('/twitter/metrics', (req, res) => {
    let hour = parseInt(req.query.hour);

    if(!req.query.date){
        return res.send({
            error: 'You must provide both a date'
        });
    };

    if(req.query.date && isNaN(hour)){
        twitterMetrics.readDailyMetrics(req.query.date, (error, data) => {
            if(error){
                return res.send({
                    error: error
                });
            }else{
                res.send({
                    metrics: data
                });
            }
        });
    }else{

        twitterMetrics.readHourlyMetrics(req.query.date, hour, (error, data) => {
            if(error){
                return res.send({
                    error: error
                });
            }else{
                res.send({
                    metrics: data.Item
                });
            }
        });
    }
});

app.get('/gmail/metrics', (req, res) => {
    let hour = parseInt(req.query.hour);

    if(!req.query.date){
        return res.send({
            error: 'You must provide a date'
        });
    };

    if(req.query.date && isNaN(hour)){
        gmailMetrics.readDailyMetrics(req.query.date, (error, data) => {
            if(error){
                return res.send({
                    error: error
                });
            }else{
                res.send({
                    metrics: data
                });
            }
        });
    }else{

        gmailMetrics.readHourlyMetrics(req.query.date, hour, (error, data) => {
            if(error){
                return res.send({
                    error: error
                });
            }else{
                res.send({
                    metrics: data.Item
                });
            }
        });
    }
});



app.get('', (req, res) => {
    res.render('index', {

    });
});

app.get('/twitter', (req, res) => {
    res.render('twitter', {
    });
});

app.get('/gmail', (req, res) => {
    res.render('gmail', {

    });
});

app.get('*', (req, res) => {
    res.render('404', {
    });
});


app.listen(8081, () => {
    console.log('Service is up on port 8081!');
});