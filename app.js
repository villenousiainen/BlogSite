require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const connectDB = require('./config/database');
const sessionConfig = require('./config/session');

const app = express();
connectDB();


app.use(express.static(path.join(__dirname, 'public')));
app.use(sessionConfig);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null; // Ensure user is accessible in EJS
    next();
});

// Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/articleRoutes'));
app.use('/', require('./server/routes/userRoutes'));

module.exports = app;