"use strict";

app.controller('HomeCtrl', function($scope, SearchTermData, ProductFactory, AuthFactory){
	$scope.searchText = SearchTermData;

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
				// console.log("promo to go into table", promo[0].store)
				let table = [];
				for(var i = 0; i < promo.length; i++){
					let table_head = {
						title: promo[i].store,
						name: "Product Name",
						sale: "Discount Price",
						location: "Find It Here!"
					};
					// console.log("table_head", table_head)
				table.push(table_head);
				$scope.tables = table;
				// console.log("table", $scope.tables[0].title)
				};
			}); 
	};
	getPromos();

	//this function will get 'snapshots' of the promos that have matching categories, setting me up to use them in the tables
	let getCats = (label) => {
		return new Promise((resolve, reject) => {
		firebase.database().ref('products').orderByChild('category').equalTo(label).once("value").then(
			(snapshot) => {
				resolve(snapshot.val());	
			}
			);
		});
	};

	// let catPromises = labels.map((label) => {
	// 	getCats(label);
	// });

	// Promise.all(labels.map((label) => getCats(label))).then(
	// 	(myArray) => {
	// 		console.log("myArray", myArray);
	// 	let myTables = [];
	// 	myTables.push(myArray[0]);

	// 	for(var i = 1; i < myArray.length; i++){
	// 		let tablePromos = myArray[i];
	// 		let tableArray = [];
	// 		Object.keys(tablePromos).forEach((key) => {
	// 			tableArray.push(tablePromos[key]);
	// 		});
	// 		myTables.push(tableArray);
	// 	}
	// 	// console.log("myTables", myTables);
	// 	$scope.myTables = myTables;
	// 	let finalArray = [];
	// 	myTables.forEach((promo) => {
	// 		// console.log("promo", promo);
	// 		let table = {
	// 			heading: promo[0]["category"],
	// 			name: "Product Name",
	// 			reg_price: "Regular Price",
	// 			sale: "Discount Price",
	// 			date: "Sale Valid Through",
	// 			location: "Find It Here!",
	// 			promotions: promo
	// 		};
	// 		finalArray.push(table);
	// 		// console.log("finally", finalArray);
	// 	$scope.finalArray = finalArray;
	// 	$scope.$apply();
	// 	});
	// });

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
});