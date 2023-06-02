const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const { subscribe } = require("diagnostics_channel");


const app = express();
app.use(bodyParser.urlencoded({extended: true}));


// lets app use local files
app.use(express.static("public"))

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }

            }
        ]
    };

    var jsonData = JSON.stringify(data)
    url = "https://us21.api.mailchimp.com/3.0/lists/faedc3717a" 
    const options = {
        method: "POST",
        auth: "trev:d0b5f9536d4988f78693edb808f24392-us21"

    }

    const request = https.request(url, options, function(response){

        if (response.statusCode === 200){
            res.send("Subscribed!")
        }else{
            res.send("Failed")
        }
        response.on("data", function(data){
            console.log(JSON.parse(data))
        })
    })

    request.write(jsonData)
    request.end()
});





app.listen(process.env.PORT || 3000, function(){
    console.log("listening on Heroku");
});

//api key
//d0b5f9536d4988f78693edb808f24392-us21


//list id
//faedc3717a