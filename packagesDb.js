const mysql = require("mysql");
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var conn = mysql.createConnection({
  host: "localhost",
  user: "Karim",
  password: "password",
  database: "travelexperts"
});

conn.connect((err)=>{
	if (err) throw err;
	var sql = "SELECT * FROM packages";
	const packages = " `"
	conn.query(sql, (err, packages, fields)=>{
	//	if (err) throw err;
		console.log(packages);

		let content = '';

		// Loop through each element in the packages and append to content
		// Note: I've attached url link to the image rather than as a separate link
		packages.forEach(function(package){

			content +=  `<article>
										<h2 class="center header-blue">${package.PkgName}</h2>
										<p class="packages center">Dates: ${package.PkgStartDate} - ${package.PkgEndDate}</p>
										<p class="packages center">Price: ${package.PkgBasePrice}</p>
										
									</article>`;
			console.log(content);
		});

		//<a href = "www.google.com"> <img class="package-img shadow2" src="${package.imgURL}" alt="Destination: ${package.destination}"></a>
		// assign our container element to a variable
		const main = document.querySelector('main');

		// innerHTML will parse the content string as HTML and create the proper elements in the DOM
		main.innerHTML = content;

		
		conn.end((err)=>{
			if (err) throw err;
		});
	});
});
