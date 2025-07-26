const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const applicationRoutes = require('./routes/applicationRoutes');
const authRoutes = require('./routes/authRoutes');

require('dotenv').config();
require('./config/db')();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/applications', applicationRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;
