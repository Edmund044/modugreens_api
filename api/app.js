const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
app.use(morgan('dev'));

const  customersProfile = require('./routes/customer/profile/profile');
const  customersHarvest = require('./routes/customer/harvest/harvest');
const  customersCrops = require('./routes/customer/crops/crops');
const  customersNotification = require('./routes/customer/notification/notification');
const  customersStatistics = require('./routes/customer/statistics/statistics');
//matatu
const  matatu = require('./routes/matatu/matatu');
//waterLevel
const  waterLevel = require('./routes/waterLevel/waterLevel/waterLevel');
const  status = require('./routes/waterLevel/status/status');
//dishi
const  dishiAdmin = require('./routes/dishi/admin/products');
const  dishiUser = require('./routes/dishi/customer/orders');
//smartgrid
const smartGrid = require('./routes/smart_grid/smart_grid');
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
app.use("/api/customers/profile", customersProfile );
app.use("/api/customers/harvests", customersHarvest);
app.use("/api/customers/crops",  customersCrops);
app.use("/api/customers/notification", customersNotification);
app.use("/api/customers/statistics", customersStatistics);
//matatu
app.use("/matatu", matatu );
//waterLevel
app.use("/waterLevel", waterLevel );
app.use("/status", status );

//dishi
app.use("/dishiAdmin", dishiAdmin );
app.use("/dishiUser",dishiUser );
//smart grid
app.use("/smart", smartGrid );

app.get("/matatu",(req, res, next) => {
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