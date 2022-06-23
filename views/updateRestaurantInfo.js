

//SOMETHING TO NOTE : When "object" is being used, it's referring to the imported object from the selectedRestaurant.pug file. It's an object of the selected restaurant.

//Generate the dropdownlist and render the menu when this file loads
updateDropDownList();
updateMenu();

//Initializing some variables. newCategory will hold the user-created category, newItem is an object that will hold the properties of the item the user makes.
let newCategory = "";
let newItem = {};


//Runs when the add category button is clicked
function addCategory(){
    
	//Set the value of newCategory to the user's input
	newCategory = document.getElementById("categoryName").value;
	
	//Error checking to make sure that the user didn't leave the field empty
	if (newCategory == "")  {

        alert("Please enter a category");
		return;
	}

	//If the category is not a duplicate, run the code below
	if (!(newCategory in object.menu)) {

        //Create a new h4 element for the newly created category and append it to the menu
		let newCatHeader = document.createElement("h4");
		newCatHeader.appendChild(document.createTextNode(newCategory));
		document.getElementById("menu").appendChild(newCatHeader);

        //"object" refers to the imported object from the selectedRestaurant.pug file. It's an object of the restaurant that the user selected.
        //Create a new key in the restaurant menu with the name of the newly created category, and set it's value to an empty object.
		object.menu[newCategory] = {};

        //Update the drop down list and the menu
		updateDropDownList();
		updateMenu();
	} 

    //If the category is a duplicate, then output an error message
    else {

        alert("Duplicates not allowed");
    }
}



function updateDropDownList() {

    //Set the value of categoryNames an array of keys in the restaurant's menu
	let categoryNames = Object.keys(object.menu);

    //Set up the dropdown menu
	let result = '<select id="selectedCategory">';
	
    //For every key in the restaurant's menu object, populate the drop down list with a value of the key
	categoryNames.forEach(elem => {
	
		result += `<option value="${elem}">${elem}</option>`
	}); 
	

	//Create the populated dropdown menu
	document.getElementById("selected").innerHTML = result;
}


function updateMenu() {

    //Clear the displayed menu. While there are items in the menu, remove them.
	while (document.getElementById("menu").firstChild) {
        document.getElementById("menu").removeChild(document.getElementById("menu").firstChild);
    }

    //Iterate through every category in the restaurant
	for (i in object.menu) {

        //Create a p element that will hold the restaurant's category thats currently being iterated
		let categoryHeader = document.createElement("p");
		categoryHeader.setAttribute('id', i);
		categoryHeader.setAttribute('class', "categories");
		categoryHeader.appendChild(document.createTextNode(i));

        //Print out the restaurant's category thats currently being iterated. Add two line breaks after it
		document.getElementById("menu").appendChild(categoryHeader);
		document.getElementById(i).appendChild(document.createElement("br"));
		document.getElementById(i).appendChild(document.createElement("br"));


        //Iterate through every item in the category "i"
		for (j in object.menu[i]) {

            //Create a p element that will hold the restaurant's item name thats currently being iterated
			let menuItemName = document.createElement("p");
			menuItemName.setAttribute('id', object.menu[i][j].name);
			menuItemName.appendChild(document.createTextNode(object.menu[i][j].name + "($" + object.menu[i][j].price + ")"));

            //Print out the rerstaurant's item name thats currently being iterated. Add a line break after it.
			document.getElementById(i).appendChild(menuItemName);
			document.getElementById(object.menu[i][j].name).appendChild(document.createElement("br"));


			
            //Create a p element that will hold the restaurant's item description thats currently being iterated
			let menuItemDescription = document.createElement("p");
			menuItemDescription.setAttribute('id', object.menu[i][j].description);
			menuItemDescription.appendChild(document.createTextNode(object.menu[i][j].description));

            //Print out the rerstaurant's item description thats currently being iterated. Add two line breaks after it.
			document.getElementById(i).appendChild(menuItemDescription);	
			document.getElementById(object.menu[i][j].description).appendChild(document.createElement("br"));	
			document.getElementById(object.menu[i][j].description).appendChild(document.createElement("br"));	
			
		}
	}
}


//This function runs when the add item button is clicked
function addItem() {
	

	//Returns if any of the fields are missing
	if (document.getElementById("itemName").value == "" || document.getElementById("itemDescription").value == "" || document.getElementById("itemPrice").value == "") {

		alert("Please enter the missing information");
		return;
	}

    //Returns if the item price inputted is not a number
    if (isNaN(document.getElementById("itemPrice").value)) {

        alert("The item price must be a number");
        return;
    }


	//Iterate through every category in the restaurant
	for (let i in object.menu) {

        //Iterate through every item in the category "i"
		for (let j in object.menu[i]) {

            //If the item name exists in the menu, then display an error message and return.
			if (object.menu[i][j].name === document.getElementById("itemName").value) {

				alert("Item is already in the menu");
				return;
			}

            //If the item description exists in the menu, then display an error message and return.
            if (object.menu[i][j].description === document.getElementById("itemDescription").value) {

                alert("This description has already been used");
                return;
            }
		}
	}
	
	//Get the category that the user selected from the dropdown list
	let chosenCategory = document.getElementById("selectedCategory").value;

    //Create a variable called newID and assign it the return value from the generateNewItemID(). This value is an integer.
	let newID = generateNewItemID();
	
    //Initialize the field for the new item to be added. Set it to an empty object.
	object.menu[chosenCategory][newID]= {};

    //Populate the newly initialized empty object with the item's information.
	object.menu[chosenCategory][newID]["name"] = document.getElementById("itemName").value
	object.menu[chosenCategory][newID]["description"] = document.getElementById("itemDescription").value
	object.menu[chosenCategory][newID]["price"] = document.getElementById("itemPrice").value

    //Update the menu
	updateMenu();	
}


//This function returns the newly generated unique ID.
function generateNewItemID() {

    //Keeps track of the number of items in the restaurant.
	let numOfItems = 0;

    //Iterate through every category in the restaurant
	for (let i in object.menu) {
	
	    //Iterate through every item in the category "i"
		for (let x in object.menu[i]) {
	
            //Increment the number of items by 1.
			numOfItems++;
		}
	}
	
    //Create a newID variable, and assign it a value of the number of items in the restaurant + 100
	let newID = numOfItems + 100;

    //Return the newly generated ID.
    return newID;
}



//This function runs when the save changes button was clicked
function saveChanges(){


	//If the restaurant name isn't filled in, put out an error message and return.
	if (document.getElementById("restaurantName").value == "") {

		alert("Please enter a restaurant name");
		return;
	}


    //If both fields aren't filled in with a numeric value, put out an error message and return.
	if ((isNaN(document.getElementById("deliveryFee").value) && isNaN(document.getElementById("minimumOrder").value)) || (document.getElementById("deliveryFee").value == "" && document.getElementById("minimumOrder").value == "")) {

		alert("Please enter a number amount for the delivery fee and the minimum order");
		return;
	}


	//If the the minimum order field isn't filled in with a numeric value, put out an error message and return.
	else if (isNaN(document.getElementById("minimumOrder").value) || document.getElementById("minimumOrder").value == "") {

		alert("Please enter a number amount for the minimum order");
		return;
	}

	//If the the delivery fee field isn't filled in with a numeric value, put out an error message and return.
	else if (isNaN(document.getElementById("deliveryFee").value) || document.getElementById("deliveryFee").value == "") {

		alert("Please enter a number amount for the delivery fee");
		return;
	}


    //Update the properties in the restaurant object
	object.name = document.getElementById("restaurantName").value;
	object.min_order = document.getElementById("minimumOrder").value;
	object.delivery_fee = document.getElementById("deliveryFee").value;

	

    //Create a new XMLHttpRequest
	let req = new XMLHttpRequest();
	let data = JSON.stringify(object);

	req.onreadystatechange = function() {
		
        //If the request was successful, prompt a success message
		if (this.readyState === 4 && this.status === 200) {

            alert("Successfully Saved");			
		}
	}

    //Create a PUT request that will send JSON
	req.open("PUT", "/restaurants/" + object.id);
	req.setRequestHeader("Content-Type", "application/json");

    //Send a JSON of the restaurant object
	req.send(data);
}