"use strict";

app.factory('ProductFactory', function($q, $http, $routeParams){


//////////////////////////////////////////////////////////
/////////////////DATABASE INTERACTION/////////////////////
//////////////////////////////////////////////////////////

	let getAllPromos = () => {
		//this function reaches out to firebase to grab all available promos regardless of user uid
		return $q((resolve, reject) => {
      		$http.get(`http://localhost:8000/products/`)
      		.then((promodata) => { 
      			let promoArray = [];
      			let promoCollection = promodata.data;
      			Object.keys(promoCollection).forEach((key) => {
      				promoCollection[key].id = key;
      				promoArray.push(promoCollection[key]);
      			});
      			resolve(promodata);
      		});
      		});
	};


	return {getAllPromos};
});