require('newrelic');
const express = require('express');
const app = express();
const proxy = require('express-http-proxy');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');

const router = require('./routes.js');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(compression());

app.use('/:nameOrId', express.static('public'));

app.get('/api/sidebar/restaurants/:nameOrId', proxy('http://ec2-18-206-216-159.compute-1.amazonaws.com/'));

//app.use('/api', router);

app.set('port', process.env.PORT || 8080);


app.listen(app.get('port'), () => {
  console.log(`app is listening to port ${app.get('port')}`);
});
