const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res){
    // console.log(req.body.cityName);

    const query = req.body.cityName;
    const apiKey = "";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;

    https.get(url, function(response){
        console.log(response.statusCode);
        console.log(response.statusMessage);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            
            const nameOfPlace = weatherData.name;
            const temperature = weatherData.main.temp;
            const desripction = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<h1>Welcome to the Weather Project!</h1>");
            res.write("<h3>Current temperature of " + nameOfPlace + " is " + temperature + " degree celcius.</h3>");
            res.write("<h3>Weather today is " + desripction + "</h3>");
            res.write("<img src=" + imageURL + "></img>")
            res.send();
        })
    })
})

app.listen(port, function(){
    console.log(`Weather Project is live at http://localhost:${port}`)
})

