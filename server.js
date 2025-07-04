// ==========================================
// SETUP
// ==========================================
require('dotenv').config(); // Load environment variables from .env
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const app = express();
const port = process.env.PORT || 8080;

// ==========================================
// DATABASE CONNECTION (MongoDB Atlas)
// ==========================================
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas Connected'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==========================================
// MIDDLEWARE CONFIGURATION
// ==========================================
app.use(express.static('./public')); // Static files (e.g. images, CSS, JS)
app.use(morgan('dev')); // Log HTTP requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Parse API JSON
app.use(methodOverride('X-HTTP-Method-Override')); // HTTP verb override support

// ==========================================
// ROUTES
// ==========================================
require('./app/routes.js')(app); // Load routes

// ==========================================
// START SERVER
// ==========================================
app.listen(port, () => {
  console.log(`🚀 App listening on port ${port}`);
});
