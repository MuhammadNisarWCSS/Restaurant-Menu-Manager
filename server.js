
//Initialize variables. restaurants will be an array of restaurant objects. restaurantLength will be used to keep track of the amount of restaurants. restaurantIDs will be an array of restaurant IDs.
let restaurants = [];
let restaurantLength = 0;
let restaurantIDs = [];

const express = require('express');
const pug = require('pug');
const fs = require("fs");
const path = require('path');


let app = express();
app.set('views', path.join(__dirname, 'views'));


//Middleware
app.use('/', express.static("views"));
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));

//If a GET request was made to /restaurants, run this code
app.get("/restaurants", (req, res) => {

    res.format({

        //If the request is asking for JSON, run this code
        "application/json": () => {


            //Populate the restaurantIDs array with the restaurant ids.
            for (let i = 0; i < restaurantLength; i++) {

                restaurantIDs[i] = restaurants[i].id;
            }

            //Send a json of the restaurantIDs array as a response.
            res.set('Content-Type', 'application/json');
            let data = {"restaurants" : restaurantIDs};
            res.send(data);
        },

        //If the request is asking for HTML, run this code
        "text/html": () => {

            //Render the restaurantList.pug page.
            res.set('Content-Type', 'text/html');
            res.render("restaurantList.pug", {restaurants: JSON.stringify(restaurants)});
        }
    })
});

//If a GET request was made to /addrestaurant, run this code
app.get("/addrestaurant", (req, res) => {


    res.format({

        //If the request is asking for HTML, run this code
        "text/html": () => {

            //Send the addRestaurant.html file
            res.set('Content-Type', 'text/html');            
            res.sendFile("/views/addRestaurant.html", {root: __dirname});
        }
    });
});

//If a POST request was made to /restaurants, run this code
app.post("/restaurants", (req,res) => {

   
    //Making sure that the deliver fee, minimum order and name fields are valid.
    if (!isNaN(req.body.deliveryFee) && !isNaN(req.body.minimumOrder) && req.body.deliveryFee != "" && req.body.minimumOrder != "" && req.body.name != "") {
        
        //Initialize the new object of the restaurant to add.
        let restaurantToAdd = {};

        //Update the newly created restaurant object.
        restaurantToAdd.name = req.body.name;
        restaurantToAdd.min_order = req.body.minimumOrder;
        restaurantToAdd.delivery_fee = req.body.deliveryFee;
        restaurantToAdd.id = restaurantLength;
        restaurantToAdd.menu = {};

        //Add the newly created restaurant object to the array of restaurant objects.
        restaurants[restaurantLength] = restaurantToAdd;
    
        //Increment the number of restaurants by 1.
        restaurantLength++;
        
        //Send a json of the newly created restaurant object as a response.
        res.set('Content-Type', 'application/json');
        res.send(JSON.stringify(restaurantToAdd));
    }
});


//If a GET request was made to /restaurants with a parameter, run this code
app.get("/restaurants/:restID", (req,res) => {

    res.format({

        //If the request is asking for JSON, run this code
        "application/json": () => {

            //Set the response content type as json
            res.set('Content-Type', 'application/json');
            
            //Get the ID from the request restID parameter
            let chosenID = req.params.restID;


            //If the ID is found, send a json of the restaurant object
            for (let i = 0; i < restaurantLength; i++) {

                if (restaurants[i].id == chosenID) {

                    res.send(JSON.stringify(restaurants[i]));
                }
            }
        },

        //If the request is asking for HTML, run this code
        "text/html": () => {

            //Get the ID from the request restID parameter
            let chosenID = req.params.restID;
            let restaurantFound = 0;

            //If the ID is found, render the selectedRestaurant.pug file
            for (let i = 0; i < restaurantLength; i++) {

                if (restaurants[i].id == chosenID) {
                    
                    restaurantFound = 1;
                    res.set('Content-Type', 'text/html');            
                    res.render("selectedRestaurant.pug", {selectedRestaurant: JSON.stringify(restaurants[i])});
                }
            }

            //If ID couldn't be found, send a 404 error
            if (restaurantFound == 0) {

                res.sendStatus(404);
            }
        }
    });
});


//If a PUT request was made to /restaurants with a parameter, run this code
app.put("/restaurants/:restID", (req,res)=> {

    //Get the ID from the request restID parameter
    let chosenID = req.params.restID;
    let IdFound = -1;


    //Loop through the restaurants array to see if the ID could be found. If it's found, set the value of IdFound to the array index, so we know which index holds the matching ID.
    for (let i = 0; i < restaurantLength; i++) {

        if (restaurants[i].id == chosenID) {

            IdFound = i;
        }
    }

    //If the ID is not found, send a 404 error
    if (IdFound == -1) {

        res.sendStatus(404);
    }

    
    //If the ID is found, update the restaurants array at the appropriate index with the modified restaurant data. Send a 200 status.
    restaurants[IdFound] = req.body;
    res.sendStatus(200);
});


//Reads all the files in the restaurants folder
fs.readdir("./restaurants", (err, files) =>{

    //Reads all the restaurant files and stores the data in the restaurants array
    for (let i = 0; i < files.length; i++) {
        
        let readRestaurant = require("./restaurants/" + files[i]);
        restaurants[restaurantLength] = readRestaurant;
        restaurantLength++;
    }
});


//Start the server
app.listen(3000);
console.log("Server listening at http://localhost:3000");