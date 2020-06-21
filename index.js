const express = require('express')
const app = express()

//ensure database is connected
require('./config/database.config')

const cors = require('cors')
app.use(cors({
    credentials: true,
    origin: ['http://localhost:3000']
}))

//A library that helps us log the requests in the console
const logger = require('morgan');

const cookieParser = require('cookie-parser');

//Use body parser. To be able parse post request information
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()) //crucial for post requests from client

//set up sessions

app.use(logger('dev'));
app.use(cookieParser());


const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ReactTodos'
app.use(
  session({
    secret: 'my-secret-weapon',
    saveUninitialized: false,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
    },
    store: new MongoStore({
      url: MONGODB_URI,
      // mongooseConnection: mongoose.connection
      //time to live (in seconds)
      ttl: 60 * 60 * 24,
      autoRemove: 'disabled',
    }),
  })
);


app.use((req, res, next) => {
    // If no routes match, send them the React HTML.
    res.sendFile(__dirname + "/public/index.html");
  });

//Register routes
const todoRoutes = require('./routes/todo.routes');
app.use('/api', todoRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes);

//Start the server to begin listening on a port
// make sure you don't run it on port 3000 because 
// your react app uses port 3000. 
app.listen(5000, '127.0.0.1', () => {
    console.log('Server is running')
})
