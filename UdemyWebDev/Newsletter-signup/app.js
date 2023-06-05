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
    url = 
    const options = {
        method: "POST",
        auth: "trev:

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

