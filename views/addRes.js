
//This function runs when the submit button is clicked. Sends the newly created restaurant to the server using a POST request.
function submit(){


	//Create an object for the new restaurant.
    let restaurant = {};


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

	//If the minimum order field isn't filled in with a numeric value, put out an error message and return.
	else if (isNaN(document.getElementById("minimumOrder").value) || document.getElementById("minimumOrder").value == "") {

		alert("Please enter a number amount for the minimum order");
		return;
	}

	//If the delivery fee field isn't filled in with a numeric value, put out an error message and return.
	else if (isNaN(document.getElementById("deliveryFee").value) || document.getElementById("deliveryFee").value == "") {

		alert("Please enter a number amount for the delivery fee");
		return;
	}


	//Adding the restaurant information that the user inputted to the newly created restaurant object
	restaurant.name = document.getElementById("restaurantName").value;
	restaurant.deliveryFee = document.getElementById("deliveryFee").value;
	restaurant.minimumOrder = document.getElementById("minimumOrder").value;

	
	//Create an XMLHttpRequest
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {

		//If the request was successful, redirect the user to the newly created restaurant's page
		if(this.readyState==4 && this.status==200){

            window.location.href = "http://localhost:3000/restaurants/" + JSON.parse(req.response).id;
		}
	}
	
	//Send a POST request to the server. Sends JSON of the newly created restaurant
	req.open("POST", '/restaurants');
	req.setRequestHeader('Content-Type', 'application/json');
	req.send(JSON.stringify(restaurant));
}


    