"use strict";
// console.log("working?");
app.controller('HomeCtrl', function($scope, SearchTermData, ProductFactory){
	$scope.searchText = SearchTermData;
	$scope.domobjects = [];
	let kroger_promos = [];
	let kroger_head = [];

	let cvs_promos = [];
	let cvs_head = [];

	let target_promos = [];
	let target_head = [];


	let buildDOMObjects = () => {
		let kroger_obj = {
			title: 'Kroger',
			promos: kroger_promos
		};
		// console.log("kroger_obj", kroger_obj);
		$scope.domobjects.push(kroger_obj);
		// console.log("domobjects", $scope.domobjects);

		let cvs_obj = {
			title: 'CVS',
			promos: cvs_promos
		};
		console.log("cvs_obj", cvs_obj);
		$scope.domobjects.push(cvs_obj);

		let target_obj = {
			title: 'Target',
			promos: target_promos
		};
		console.log("target_obj", target_obj);
		$scope.domobjects.push(target_obj);

	};

	//this gets all available promos and loads immediately on the promotions page, organizing into tables based on store name 
	let getPromos = () => {
			ProductFactory.getAllPromos()
			.then((promodata) => {
				$scope.promotions = promodata.data;
				// console.log("promodata", $scope.promotions);
				let promo = promodata.data;
				// console.log("promo", promo) 
				// let table = [];

				for(var i = 0; i < promo.length; i++){
					if (promo[i].store.includes('Kroger')){
						kroger_promos.push(promo[i]);
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
	//////////LEAFLET////////////
	////////////////////////////////////

	let mymap = L.map('mapid').setView([36.1325, -86.7566], 15);

	var greenMarker = L.AwesomeMarkers.icon({
		icon: 'user-circle',
		markerColor: 'green'
	});

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
		} else if (feature.store === "CVS") {
			var aldi = L.marker([36.0903, -86.7323]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
			var panToAldi = mymap.panTo([36.0903, -86.7323]);
		} else if (feature.store === "Target") {
			var publix = L.marker([36.1266, -86.8474]).addTo(mymap).bindPopup('<h5><strong>' + feature.store + '</strong></h5><span>' + feature.name + '</span><br><label>Store Address</label><p>' + feature.address + '</p><label>Phone Number</label><p>' + feature.phone + '</p><label>Sale Ends:</label><p>' + feature.promo_end + '</p>');
			var panToPublix = mymap.panTo([36.1266, -86.8474]);
		}		
	};
});