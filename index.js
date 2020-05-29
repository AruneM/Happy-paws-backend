const express = require('express')
const app = express()
var hbs = require('hbs');

//ensure database is connected
require('./config/database.config')

// Register your template engine
// NOTE: 'view engine' is a keyword here. 
// 'hbs' is the extension from which it recongnizes those are template engines
app.set('view engine', 'hbs');

// Register your views to let express know where all the hbs files exist
// NOTE: 'views' is a keyword here.  
// Whenever we specify any path in `res.render` || `res.sendFile` ,
// it will look in that directory that we have set the views as. 
// In our case `__dirname + '/views'`
app.set('views', __dirname + '/views');

// Set up the middleware to make the files inside the public folder
// available throughout the app
app.use(express.static(__dirname + '/public'))

//Register partials
hbs.registerPartials(__dirname + '/views/partials');

//Use body parser. To be able parse post request information
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


//Register routes
const todoRoutes = require('./routes/todo.routes');
app.use('/', todoRoutes);

//Start the server to begin listening on a port
app.listen(3000, '127.0.0.1', () => {
    console.log('Server is running')
})