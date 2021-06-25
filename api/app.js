const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));

const  clientauthentication= require('./routes/customer/authentication/authentication');
const  clientharvest= require('./routes/customer/authentication/authentication');


app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({
    extended: true
  }));
app.use(bodyParser.json());


app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Header', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization');

	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200) / json({});
	}

	next();

});

//Incase of wrong url
app.use((req, res, next) => {
  const error = new Error('Invalid Url Address. Please Contact Support');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  });
});

module.exports(app);