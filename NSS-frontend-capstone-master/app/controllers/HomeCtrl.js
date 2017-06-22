"use strict";
app.controller('HomeCtrl', function($scope, SearchTermData, ProductFactory){
	$scope.searchText = SearchTermData;
	$scope.domobjects = [];
	$scope.list = [];


	let kroger_promos = [];
	let kroger_head = [];
	let cvs_promos = [];
	let cvs_head = [];
	let target_promos = [];
	let target_head = [];

	// builds the object for each store and pushes the objects into the scoped object so that the ng-repeat can render the tables in the home.html
	let buildDOMObjects = () => {
		let kroger_obj = {
			title: 'Kroger',
			promos: kroger_promos
		};
		$scope.domobjects.push(kroger_obj);

		let cvs_obj = {
			title: 'CVS',
			promos: cvs_promos
		};
		$scope.domobjects.push(cvs_obj);

		let target_obj = {
			title: 'Target',
			promos: target_promos
		};
		$scope.domobjects.push(target_obj);

	};

	//this gets all available promos and loads immediately on the promotions page, organizing into tables based on store name 
	let getPromos = () => {
			ProductFactory.getAllPromos()
			.then((promodata) => {
				$scope.promotions = promodata.data;
				let promo = promodata.data;
				// console.log("promo", promo);
				for(var i = 0; i < promo.length; i++){
					if (promo[i].store.includes('Kroger')){
						kroger_promos.push(promo[i]);
						// console.log("kroger", kroger_promos);
					} else if (promo[i].store.includes('CVS')){
						cvs_promos.push(promo[i]);
					} else if (promo[i].store.includes('Target')){
						target_promos.push(promo[i]);
					}


					let table_head = {
						title: promo[i].store,
						name: "Product Name",
						sale: "Discount Price",
						location: "Find It Here!"
					};

					if (table_head.title.includes('Kroger')){
						table_head.title = 'Kroger';
						kroger_head.push(table_head);
					}
					if (table_head.title.includes('CVS')){
						table_head.title = 'CVS';
						cvs_head.push(table_head);
					}
					if (table_head.title.includes('Target')){
						table_head.title = 'Target';
						target_head.push(table_head);
					}
				}

			});
			buildDOMObjects(); 
	};
	getPromos();

	//this function is building a new object to be appended to the list that is below the map on the home.html
	$scope.savePromo = (promo) => {
		let listed_promos = {
			name: promo.name,
			store: promo.store,
			sale_price: promo.sale_price,
			id: promo.id
		};
		$scope.list.push(listed_promos);

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

	// the function to remove a promo from the list located underneath the map
	$scope.removePromo = (promo_to_delete) => {
		$scope.list.splice(promo_to_delete, 1);
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
	//////////LEAFLET////////////
	////////////////////////////////////

	let mymap = L.map('mapid').setView([36.1325, -86.7566], 15);


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

		if(feature.store.includes("Kroger")){
			var kroger = L.marker([36.1199, -86.7775]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><span>' + ' ' + feature.sale_price + '</span>');
			var panToKroger = mymap.panTo([36.1199, -86.7775], {animation: true});
		} else if (feature.store.includes("CVS")) {
			var cvs = L.marker([36.152203, -86.841026]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><span>' + ' ' + feature.sale_price + '</span>');
			var panToCVS = mymap.panTo([36.152203, -86.841026], {animation: true});
		} else if (feature.store.includes("Target")) {
			var target = L.marker([36.1312449551468,-86.8542461919359]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><span>' + ' ' + feature.sale_price + '</span>');
			var panToTarget = mymap.panTo([36.1312449551468,-86.8542461919359], {animation: true});
		}		
	};
});