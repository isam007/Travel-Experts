// Author Karim Khan
module.exports = (req, res)=>{
	// shows current weather in Calgary
  const request = require('request');
  const argv = require('yargs').argv;
  
  let apiKey = '3c660fb6936a88cfaa17a0bc2e018f43';
	let city = argv.c || 'calgary';
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

	request(url, function (err, response, body) {
		if(err){
			console.log('error:', err);
		} else {
			let weather = JSON.parse(body)
			var message = `It's ${Math.round((weather.main.temp - 32)*5/9,2)}°C in ${weather.name}!`;
			console.log(message);
			
		}
		res.render('index', { pugIndex : message });
		
		// });
	});	
}