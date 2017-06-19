"use strict";

app.controller('HomeCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;
	let labels = ['Kroger', 'CVS', 'Target']

	//this gets all available promos and loads immediately on the promotions page, organizing into tables based on product category
	let getPromos = () => {
			ProductFactory.getAllPromos()
			.then((promodata) => {
				$scope.promotions = promodata.data;
				// console.log("promodata", $scope.promotions)

				// let table_data = []
				// let names = []
				// let prices = []
				// let stores = []
				// for(var i = 0; i < promotions.length; i++){
				// 	names = promotions[i].name
				// 	prices = promotions[i].sale_price
				// 	stores = promotions[i].store
				// 	table_data.push(names + ' ' + prices)
				// };
				// console.log("table_data with names, ", table_data)

				let promo = promodata.data
				let table = [];
				for(var i = 0; i < promo.length; i++){
					let table_head = {
						title: promo[i].store,
						name: "Product Name",
						sale: "Discount Price",
						location: "Find It Here!"
					};
					console.log("table_head", table_head)
				table.push(table_head);
				$scope.tables = table;
				};
			}); 
	};
	getPromos();

	//this function will get 'snapshots' of the promos that have matching categories, setting me up to use them in the tables
	// this method calls on the data base and references the products directory
	// THEN it orders the results by the child attribute of store
	// THEN matches them with the values in the label array
	// THEN grabs the value out of the label array once
	// AND takes a snapshot of it and returns the value of the snapshot...meaning the category names stored in the firebase database


	let getCats = (label) => {
		return new Promise((resolve, reject) => {
		ProductFactory.getAllPromos().then(
			(snapshot) => {
				// console.log("snapshot", snapshot)
				resolve(snapshot);	
			});
		});
	};

	let catPromises = labels.map((label) => {
		// this is returning a copy of the database for the number labels I have in the array
		// console.log("getCats", getCats(label))
		getCats(label);
	});

	Promise.all(labels.map((label) => getCats(label))).then(
		(myArray) => {
			// console.log("myArray", myArray[0]); myArray is the return object containing, within 'data', the array of promos
		let myTables = [];
		myTables.push(myArray[0]);
		// console.log("myTables with myArray", myTables)
		for(var i = 1; i < myArray.length; i++){
			let tablePromos = myArray[i];
			let tableArray = [];
			Object.keys(tablePromos).forEach((key) => {
				tableArray.push(tablePromos[key]);
				// console.log("tableArray", tableArray)
			});
			myTables.push(tableArray);
			// console.log("myTables", myTables)
		}
		// console.log("myTables", myTables);
		$scope.myTables = myTables;
		let finalArray = [];
		myTables.forEach((promo) => {
			// console.log("promo", promo.data[0]['store']);
			let table = {
				heading: promo.data[0]["store"],
				name: "Product Name",
				sale_price: "Sale Price",
				store: "Store",
				promotions: promo.data
			};
			// console.log("table", table)
			finalArray.push(table);
			// console.log("finally", finalArray);
		$scope.finalArray = finalArray;
		$scope.$apply();
		});
	});

	//this function is building a new object to be stored by uid, so that the user can load his/her saved promos on the profile page
	$scope.savePromo = (promo) => {
		console.log("savePromo", promo);
		var savedPromo = {
			name: promo.name,
			store: promo.store,
			sale_price: promo.sale_price,
		};

		$.notify({
			icon: 'glyphicon glyphicon-check',
			message: 'Saved to Your List!'
		},{
			type: 'success',
			delay: 1000,
			animate: {
				enter: 'animated flipInY',
				exit: 'animated flipOutX'
			}	
		});


	};

	// ===== Scroll to Top...taken from CodePen ==== 
	$(window).scroll(function() {
	    if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
	        $('#return-to-top').fadeIn(200);    // Fade in the arrow
	    } else {
	        $('#return-to-top').fadeOut(200);   // Else fade out the arrow
	    }
	});
	$('#return-to-top').click(function() {      // When arrow is clicked
	    $('body,html').animate({
	        scrollTop : 0                       // Scroll to top of body
	    }, 500);
	});


/////////////////////////////////////
////////LEAFLET////////

let mymap = L.map('mapid').setView([36.1325, -86.7566], 15);

var redMarker = L.AwesomeMarkers.icon({
	icon: 'user-circle',
	markerColor: 'green'
});

 // L.marker([36.1325, -86.7566], {icon: redMarker}).addTo(mymap).bindPopup('<h5><strong>You Are Here!</strong></h5>');

let leaflet = () => {

	L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
	    maxZoom: 18,
	    id: 'hfrankst.4a5bytnl',
	    accessToken: 'pk.eyJ1IjoiaGZyYW5rc3QiLCJhIjoiY2owY3QzODNpMDUxMDMybGMydnBxeGdncCJ9.NQrhhmJVuy175EbL-IsbJw'
	}).addTo(mymap);
};
leaflet();

$scope.onEachFeature = (feature, layer) => {

	if(feature.store === "Kroger"){
		var kroger = L.marker([36.1199, -86.7775]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
		var panToKroger = mymap.panTo([36.1199, -86.7775], {animation: true});
	} else if (feature.store === "ALDI") {
		var aldi = L.marker([36.0903, -86.7323]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
		var panToAldi = mymap.panTo([36.0903, -86.7323]);
	} else if (feature.store === "Publix") {
		var publix = L.marker([36.1266, -86.8474]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
		var panToPublix = mymap.panTo([36.1266, -86.8474]);
	}		
};


});