const express = require("express");
const path = require("path");
const app = express();
const axios = require("axios").default;
const btoa = require("btoa");
let bodyParser = require("body-parser");

const ws_api_key = "Qj6yWmAjnrMpZNx7JRpE";
const ws_api_secret = "R87VQOnuh47ITqZQdUuU";
const ws_api = "https://api.webshrinker.com/categories/v3";

let port = process.env.PORT || "5000";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.post("/querywebshrinker", async (req, res) => {

    let website = req.body.website;

    console.log(website);

    let message;

    if(!website){
        message = "Enter a Valid URL e.g example.com";
    }


    const encoded_url = btoa(website);

    console.log(encoded_url);

    let result;

    try {
        const response = await axios.get(`${ws_api}/${encoded_url}?taxonomy=webshrinker`, {
            auth : {
                username: ws_api_key,
                password: ws_api_secret
            }
        });

        result = response.data.data;
        console.log(result);
    } catch (error) {
        console.log(error);
        result = error;
    }

    
    
    res.send(result);
});

app.post("/sendinfo", (req, res) => {

    let email = req.body.email;

    if(!validEmail(email)){
        email = "Enter a Valid Email e.g test@company.com";
    }
    
    res.send({email});
});

function validEmail(mail) 
{
 return (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
  
}


app.listen(port, () => {
    console.log(`App Running at http://localhost:${port}`);
})

