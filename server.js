var express 	= require('express'),
	bodyParser 	= require('body-parser'),
	logger 		= require('morgan'),
	app 		= express(),
	port 		= process.env.PORT || 7000,
	path		= require('path'),
	apiRoutes 	= require('./api_routes'),
	mongoose	= require('mongoose')

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './public')))

// Force HTTPS on Heroku
if (app.get('env') === 'production') {
 app.use(function (req, res, next) {
   var protocol = req.get('x-forwarded-proto')
   protocol == 'https' ? next() : res.redirect('https://' + req.hostname + req.url)
 })
}
app.use(function (req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*')
 res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
 res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization')
 next()
})

app.use('/api', apiRoutes);

mongoose.connect()

app.listen(port, function(err) {
  if(err) console.log('There is an Err in your code:' + err);
  console.log('The server is listening on http://192.168.173.220:' + port)
})

