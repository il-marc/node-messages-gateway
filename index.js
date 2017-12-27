const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const expressMongo  = require('express-mongo-db');
const app           = express();
const config        = require('./config');


app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/moment', express.static(path.join(__dirname, '/node_modules/moment/min/')));
app.use('/jquery', express.static(path.join(__dirname, '/node_modules/jquery/dist/')));
app.use('/bootstrap', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressMongo(config.dbUrl));

require('./routes')(app);
app.listen(config.port, config.ip, function () {
    console.log('Live on ' + config.ip + ':' + config.port);
});
