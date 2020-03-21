// Authors: Irada Shamilova and Karim Khan

// Import modules
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const weatherApi = require('./scripts/mod_weatherApi')
const packageGenerator = require('./scripts/mod_packageGenerator')
const agentsGenerator = require('./scripts/mod_agentsGenerator')
const customerOrder = require('./scripts/mod_customerOrder')
const contactForm = require('./scripts/mod_contactForm')

var data = [];
const app = express();

// Create Server
app.listen(8000, err=>{
	if (err) throw err;
	console.log("Server started on port 8000");
});

// Express static pages - HTML/CSS/JS
// Load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static("views", {
  extensions: ["css", "png", "html"]
}));

app.use(bodyParser.urlencoded({ extended: true }));

/*Route Home page
Additional feature: Weather API
Authors: Karim and Irada*/
app.get("/", weatherApi);

// Route Customer Order Page
app.get("/register", (req, res)=>{
	res.sendFile(register);
});

// Route Packages Page and dynamically created packages
app.get("/packages", packageGenerator);

// Route Contact Us Page
app.get("/contact", agentsGenerator);


// Order Form (Author: Karim Khan) // Irada Shamilova updated to inject customer name and message into the Thank you message)
app.post("/post_form", customerOrder);	

// Contact Form (Author: Karim Khan) // Irada Shamilova updated to inject customer name and message into the Thank you message)
app.post("/create_post", contactForm);	


// Irada's route to error page if page not found
app.use((req,res,next)=>{
  res.status(404);
  res.sendFile(__dirname + "/views/pagenotfound.html")
});