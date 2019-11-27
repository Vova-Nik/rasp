(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	

	function admdel(ind) {
	  console.log("admdel= " + ind);
	}
	
	$("a").click(function () {
	  alert("Hello world!");
	});
	document.addEventListener("DOMContentLoaded", rasp_ready);

	function rasp_ready() {
	
	////////////////////////////////////////////////////

	console.log("rasp script working");
	var tableRow = {
	  'ind': 'ind 1',
	  'day': 'day 1',
	  'begtime': 'begtime 1',
	  'place': 'place 1',
	  'contact': 'contact 1',
	  'repeat': 'repeat 1',
	  'serv': 'serv 1'
	};
	
	var table = new Array(8);
	for (var i = 0; i < table.length; i++) {
	  table[i] = new Array(7);
	}
	table[0] = tableRow;
	table[1].ind = 1; table[1].day = "monday"; table[1].begtime = "19:00"; table[1].place = "Sofi"; table[1].contact = "And";
	table[2].ind = 2; table[2].day = "monday"; table[2].begtime = "9:00"; table[2].place = "Sofi"; table[2].contact = "And";
	table[3].ind = 3; table[3].day = "monday"; table[3].begtime = "9:00"; table[3].place = "Sofi"; table[3].contact = "And";
	table[4].ind = 4; table[4].day = "monday"; table[4].begtime = "9:00"; table[4].place = "Sofi"; table[4].contact = "And";
	table[5].ind = 5; table[5].day = "monday"; table[5].begtime = "9:00"; table[5].place = "Sofi"; table[5].contact = "And";
	table[6].ind = 6; table[6].day = "monday"; table[6].begtime = "9:00"; table[6].place = "Sofi"; table[6].contact = "And"; table[6].repeat = "week"; table[6].serv = 'serv';
	
	console.log(table);

	$(".admin-grid-container").append('<div  class="admin-grid-container-div-th">Id</div><div  class="admin-grid-container-div-th">Day</div><div  class="admin-grid-container-div-th">Time</div><div  class="admin-grid-container-div-th">Place</div><div  class="admin-grid-container-div-th">Contact</div><div  class="admin-grid-container-div-th">Action</div>');  //Header of table

	table.forEach(function (item, i) {
	  $(".admin-grid-container").append('<div class="admin-grid-container-div">' + table[i].ind + '</div>');
	  $(".admin-grid-container").append('<div class="admin-grid-container-div" contenteditable="true">' + table[i].day + '</div>');
	  $(".admin-grid-container").append('<div class="admin-grid-container-div" contenteditable="true">' + table[i].begtime + '</div>');
	  $(".admin-grid-container").append('<div class="admin-grid-container-div" contenteditable="true">' + table[i].place + '</div>');
	  $(".admin-grid-container").append('<div class="admin-grid-container-div" contenteditable="true">' + table[i].contact + '</div>');
	  $(".admin-grid-container").append('<div class="admin-grid-container-div" contenteditable="true">' + table[i].repeat + '</div>');
	});
	
	var lastRow = `
	<div class="admin-grid-container-div-ed">Id-</div>
	<div class="admin-grid-container-div-ed">Day-</div>
	<div class="admin-grid-container-div-ed">Time-</div>
	<div class="admin-grid-container-div-ed">Place-</div>
	<div class="admin-grid-container-div-ed">Contact=</div>
	<div class="admin-grid-container-div-ed">Action-</div>
	`;
	
	$(".admin-grid-container").append(lastRow);



	}




	 	// /public/class-rasp-db_getter.php
	//console.log(window.location.href);

	// const rasp_events_url = window.location.href + 'wp-content\/plugins\/rasp\/public\/class-rasp-db-request.php'

	// console.log(rasp_events_url);

	// //fetch('http://raspwp/wp-content/plugins/rasp/public/class-rasp-db-request.php')  

	// fetch('http://raspwp/wp-content/plugins/rasp/includes/class-vvv-import-db.php', { 
	// 	method: 'POST', 
	// 	headers: {'Content-Type': 'application/json' },
	// 	body: JSON.stringify({ name: 1, b: 2})
	// })

	// .then(  
	//   function(response) {  
	// 	if (response.status !== 200) {  
	// 	  console.log('Looks like there was a problem. Status Code: ' +  response.status);  
	// 	  return;  
	// 	}

	// 	response.json().then(function(data) {  
	// 	  console.log(data);  
	// 	});  
	//   }  
	// )  
	// .catch(function(err) {  
	//   console.log('Fetch Error :-S', err);  
	// });


})( jQuery );
