require('dotenv').config();
require('./configs/passport');

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const cors         = require("cors");
const session       = require('express-session');
const passport      = require('passport');

mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//Manejo de Sesion
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:
app.use(cors({
  credential: true,
  origin: [process.env.REACT_APP_CLIENT_URL]
}))

app.use((req, res, next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  req.header('Access-Control-Allow-Origin', '*');
  req.header('Access-Control-Allow-Headers', '*');
  if(req.method === 'OPTIONS'){
  res.headers('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  return res.status(200).json({})
  }
   next();
  });

// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/api', index);

const apis = require("./routes/articulos-routes")
app.use("/api", apis)

const authRoutes = require('./routes/auth-routes');
app.use('/api', authRoutes);

const tutoresRoutes = require('./routes/tutores-routes');
app.use('/api', tutoresRoutes);

const comunRoutes = require("./routes/comun-routes")
app.use("/api", comunRoutes)

module.exports = app;
