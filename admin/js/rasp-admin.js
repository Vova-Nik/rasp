(function ($) {
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

	async function rasp_ready() {



		/*
			console.log("rasp script working!");
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
		*/

		// let fetch_param = new Object();
		// fetch_param.action = 'read';
		// fetch_param.name = 'Nikolas';

		// async function getUser(id){
		// 	console.log('user processing');
		// 	let response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
		// 	let data = await response.json();
		// 	return data;
		// }

		// let user = await getUser(1)
		// console.log(user);

		let rasp = await read_from_db();

		rasp = JSON.parse(rasp);
		$('body').append(`<div>${rasp}</div>`);

		let save_res = await save_to_db();
		console.log(save_res);

		$(".admin-grid-container").append(`
			<div  class="admin-grid-container-div-th">Id</div>
			<div  class="admin-grid-container-div-th">Day</div>
			<div  class="admin-grid-container-div-th">Time</div>
			<div  class="admin-grid-container-div-th">Place</div>
			<div  class="admin-grid-container-div-th">Name</div>
			<div  class="admin-grid-container-div-th">Display</div>
			`);  //Header of table

		rasp.forEach(function (item, i) {
			$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.id}</div>`);
			$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_day_of_week} </div>`);
			$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_begin_time} </div>`);
			$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_place} </div>`);
			$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_name} </div>`);
			$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_show} </div>`);
		});


		$(".admin-grid-container-div").dblclick(function (element) {
			element.srcElement.classList.forEach(cl => {
				if (cl.indexOf('agcd-row') > -1) {
					cl = parseInt(cl.substring(8));
					//console.log(rasp[cl]);
					edit_window(rasp[cl]);
				}
			});

		});

	} // end of main()

	async function save_to_db() {
		let response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', name: 1, b: 2 }) });
		let rasp = await response.json();
		return rasp;
	}

	async function read_from_db() {
		let response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'read' }) });
		let rasp = await response.json();
		return rasp;
	}

	function edit_window(event_to_edit) {

		//let newWin = window.open("about:blank", "hello", "width=200"); //dependent
		//newWin.document.write(`${event_to_edit.id}  ${event_to_edit.event_name}`);

		let windowObjectReference = window.open(
			"",
			"Edit Event",
			"width=220,height=230,resizable,scrollbars=yes,status=1,dialog=yes,minimizable=yes,dependent=yes,width=300,height=400"
		  );

		//   "alwaysRaised=yes,dialog=yes,minimizable=yes,dependent=yes,directories=no,hotkeys=no," +
		//   "location=no,menubar=no,personalbar=no,resizable=yes,scrollbars=yes," +
		//   "status=no,titlebar=yes,toolbar=no,width=300,height=400,left=100,top=100"

		//newWin.document.write(`${event_to_edit.id} \n ${event_to_edit.item.event_begin_time} \n  ${event_to_edit.item.event_place} \n  ${event_to_edit.item.event_name}`);
		/*
		event_begin_time: "19:00:00"
		event_category: "0"
		event_day_of_week: "2"
		event_description: null
		event_end_time: null
		event_name: "Meeting Sofi"
		event_place: "Канатная 28"
		event_show: "1"
		event_url: ""
		id: "4"
		*/


	}

})(jQuery);
