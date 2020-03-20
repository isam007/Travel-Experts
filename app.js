// import modules
const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

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

// Call different pages - Home/Packages/Register/Contact/404
//  Home Page
app.get("/", (req, res)=>{
	res.sendFile(index);
});

// Register Page
app.get("/register", (req, res)=>{
	res.sendFile(register);
});

// Contact Page
// app.get("/contact", (req, res)=>{
// 	res.sendFile(contact);
// });

// Thank you Page
app.get("/thanks", (req, res)=>{
	res.sendFile(thanks);
});

// Packages Page
app.get("/packages", (req, res)=>{
	

// Populate packages (Author: Irada Shamilova)
	var conn = mysql.createConnection({
  host: "localhost",
  user: "Wintech",
  password: "password",
  database: "travelexpertsWT"
	});

	conn.connect((err)=>{
		if (err) throw err;
		var sql = "SELECT * FROM packages";
		//const packagesDb = '';
		conn.query(sql, (err, packagesDb, fields)=>{
		//	if (err) throw err;
			// console.log(packagesDb);

			let content = '';

			// Loop through each element in the packages and append to content
			// Note: I've attached url link to the image rather than as a separate link
			packagesDb.forEach(function(package){
				let imgUrl = "/pictures/" + package.PkgImage + ".jpg";
				let startDate = package.PkgStartDate.getFullYear() + "/" + (package.PkgStartDate.getMonth() + 1) + "/" + package.PkgStartDate.getDate();
				let endDate = package.PkgEndDate.getFullYear() + "/" + (package.PkgEndDate.getMonth() + 1) + "/" + package.PkgEndDate.getDate();

				if (package.PkgEndDate > new Date()) {
					let past = "" 
					if (package.PkgStartDate < new Date()) {
						past = "red"
					}
				
					//console.log(startDate)

					content +=  `div style = "display: none"><div class= "flex-col">
											<h2 class="center header-blue"> ${package.PkgName} </h2>
											<div class="inline"><span class="packages center ${past}">Dates: ${startDate} </span> <span class="packages center"> to ${endDate}</span></div>
											<p class="packages center">Price: $${package.PkgBasePrice} </p>
											<a href = "/register.html"><img class="package-img shadow2" src= ${imgUrl} alt="Destination: ${package.PkgName}" width="200px" height="200px></a>
											<a href = "/register.html"><button type="button" class="center-button order-button">Book Me!</button> </a>
											</div></div`
				}	
			});
			
	
				// console.log(content);
				res.render('packages', { pugPackages : content });
				
				conn.end((err)=>{
				if (err) throw err;
			});
		});
	});
	
	
});

// Packages Page
app.get("/contact", (req, res)=>{
	

	// Populate packages (Author: Irada Shamilova)
		var conn = mysql.createConnection({
		host: "localhost",
		user: "Wintech",
		password: "password",
		database: "travelexpertsWT"
		});
	
		conn.connect((err)=>{
			if (err) throw err;
			var sql = "SELECT * FROM agents";
			//const packagesDb = '';
			conn.query(sql, (err, agentsDb, fields)=>{
			//	if (err) throw err;
				// console.log(packagesDb);
	
				let contentAgents = '';
	
				// Loop through each element in the packages and append to content
				// Note: I've attached url link to the image rather than as a separate link
				agentsDb.forEach(function(agent){
					
					
					contentAgents +=  `div style = "display: none"><div>
											<h2 class="center header-blue"> ${agent.AgtFirstName} ${agent.AgtLastName} </h2>
											<p class="packages center">Email: ${agent.AgtEmail}</p>
											<p class="packages center">Phone: ${agent.AgtBusPhone} </p>
											</div></div`	
				});
					
					console.log(contentAgents);
					res.render('contact', { pugContacts : contentAgents });
					
					conn.end((err)=>{
					if (err) throw err;
				});
			});
		});
		
		
	});

// Contact Page population (Author: Karim Khan)
app.get("/contact", (req, res)=>{
    var conn = mysql.createConnection({
        host: "localhost",
        user: "Wintech",
        password: "password",
        database: "travelexpertsWT"
    });
    
    conn.connect((err) => {
        if (err) throw err;
        var sql = "SELECT agencies.AgncyAddress, agencies.AgncyPhone, agents.AgtFirstName," 
            + "agents.AgtLastName, agents.AgtBusPhone, agents.AgtEmail, agents.AgtPosition" 
            + " FROM agencies JOIN agents ON agencies.AgencyId = agents.AgencyId"
			+ " ORDER by agencies.AgncyAddress";
				
				console.log(sql)
			
        conn.query(sql, (err, result, fields) => {
            if (err) throw err;
            res.writeHead(200, {"Content-Type":"text/html"})
            fs.readFile("contact.html", (err, data) => {
                if (err) throw err;
                res.render(data) 
             // <table> tag --> <tr> create rows --> <td> create columns
            res.render("<table border='1'>")
            res.render("<tr>")
            for (column of fields)
            {
                res.render("<th>" + column.name + "</th>"); 
            }
            res.render("</tr>")
            for (agency of result)
            {
                res.render("<tr>")
                var values = Object.values(agency);
                for (i=0; i < values.length; i++)
                {
                    res.render("<td>" + values[i] + "</td>")
                }
                res.render("</tr>")
            }
            
			res.render('contact', { pugContacts });

            conn.end((err)=>{
			if (err) throw err;
		});
            
            });
        });
        
    });
});


// Order Form (Author: Karim Khan)
app.post("/post_form", (req, res)=>{
	console.log(req.body);
	data[0] = req.body.CustFirstName;
	data[1] = req.body.CustLastName;
	data[2] = req.body.CustAddress;
	data[3] = req.body.CustCity;
	data[4] = req.body.CustProv;
	data[5] = req.body.CustPostal;
	data[6] = req.body.CustCountry;	
	data[7] = req.body.CustHomePhone;
	data[8] = req.body.CustBusPhone;
	data[9] = req.body.CustEmail;
	data[10] = req.body.AgentId;
	var conn = mysql.createConnection({
		host: "localhost",
		user: "Wintech",
		password: "password",
		database: "travelexpertsWT"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`,"
			+ " `CustAddress`, `CustCity`, `CustProv`, `CustPostal`, `CustCountry`,"
			+ " `CustHomePhone`, `CustBusPhone`, `CustEmail`, `AgentId`) "
			+ "VALUES (?,?,?,?,?,?,?,?,?,?,?)";
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log("Customer data received successfully.")
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.redirect("/thanks");
});	

// Contact Form (Author: Karim Khan)
app.post("/create_post", (req, res)=>{
	console.log(req.body);
	data[0] = req.body.CustFirstName;
	data[1] = req.body.CustLastName;
	data[2] = req.body.CustEmail;

	var conn = mysql.createConnection({
		host: "localhost",
		user: "Wintech",
		password: "password",
		database: "travelexpertsWT"
	});

	conn.connect((err)=>{
		if (err) throw err;
		
		var sql = "INSERT INTO `customers`(`CustFirstName`, `CustLastName`,"
			+ " `CustEmail`)"
			+ "VALUES (?,?,?)";
		conn.query(sql, data, (err, result, fields)=>{
			if (err) throw err;
			console.log(result);
			console.log("Customer data received successfully.")
			conn.end((err)=>{
				if (err) throw err;
			});
		});
	});	
	res.redirect("/thanks");
});	

// 404 Page (Karim: Needs troublshooting!)
// app.get("*", (req, res)=>{
// 	res.sendFile(pagenotfound);
// });

// Irada's route to error page if page not found
app.use((req,res,next)=>{
  res.status(404);
  res.sendFile(__dirname + "/views/pagenotfound.html")
});