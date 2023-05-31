const express = require("express");
const https = require("https")
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")


} )

app.post("/", function(req,res){
    console.log("city entered is " + req.body.city);

    const query = req.body.city;
    const appid = "55c4aa16f3e6ded1fa745609e99fa550";
    const unit = "imperial";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+appid+"&units="+ unit

    https.get(url, function(response){

        response.on("data", function(data){
            weatherData = JSON.parse(data)
            
            weatherDescription = weatherData.weather[0].description
            weatherTemp = weatherData.main.temp
            img = weatherData.weather[0].icon
            let imgUrl = "https://openweathermap.org/img/wn/" + img + "@2x.png"
            

            h1 = "<h1>The Tepurature is " + weatherTemp + " The description is " + weatherDescription + "</h1>"
            res.write(h1)
            res.write(`<img src="`+imgUrl+`"/>`)
            res.send()
        })
    });

    
})



app.listen(3000, function(){
    console.log("server is runnning port 3000");
})