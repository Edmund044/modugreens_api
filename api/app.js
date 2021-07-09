const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(morgan('dev'));

const  customersAuthentication = require('./routes/customer/authentication/authentication');
const  customersHarvest = require('./routes/customer/harvest/harvest');
const  customersCrops = require('./routes/customer/crops/crops');
const  customersNotification = require('./routes/customer/notification/notification');
const  customersStatistics = require('./routes/customer/statistics/statistics');

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


//routes
app.use("/api/customers/authenticate", customersAuthentication );
app.use("/api/customers/harvests", customersHarvest);
app.use("/api/customers/crops",  customersCrops);
app.use("/api/customers/notification", customersNotification);
app.use("/api/customers/statistics", customersStatistics);

app.get("/api/customers/cropss",(req, res, next) => {
  res.send("Hi there");
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

module.exports = app ;