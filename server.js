var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	logger 		= require('morgan'),
	app 		= express(),
	port 		= process.env.PORT || 7000,
	path		= require('path'),
	apiRoutes 	= require('./api_routes')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')))

app.use('/api', apiRoutes);


app.listen(port, function(err) {
  if(err) console.log('There is an Err in your code:' + err);
  console.log('The server is listening on http://192.168.173.220:' + port)
})

