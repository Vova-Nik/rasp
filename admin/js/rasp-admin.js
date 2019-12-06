(function ($) {
	'use strict';

	{/**
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

	// function admdel(ind) {
	// 	console.log("admdel= " + ind);
	 }

	document.addEventListener("DOMContentLoaded", rasp_ready);



	// $( "#dataTable tbody tr" ).on( "click", function() {
	// 	console.log( $( this ).text() );
	//   });

	async function rasp_ready() {

	
		console.log('ready');


		let raspModel = new RaspModel(1);
		//let rasp_data_loaded_event = new Event('rasp_data_loaded');
	
		$('#ddd').on('rasp_data_loaded',  function() {
			console.log('---event loaded');
			let raspView = new RaspView(raspModel.rasp);
		});

		//$('#ddd').on('click',  function() {console.log('vent loaded');  });

		// let rasp = await read_from_db();
		// rasp = JSON.parse(rasp);

		//$('body').append(`<div>${rasp}</div>`);

		//let save_res = await save_to_db();
		//console.log(rasp);
		
	    //let raspView = new RaspView(rasp);

		//raspTable.init(rasp);
		//raspTable.addRow(rasp[1]);

	} // end of main()

	async function save_to_db() {
		let response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', name: 1, b: 2 }) });
		let rasp = await response.json();
		return rasp;
	}

	// async function read_from_db() {
	// 	let response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'read' }) });
	// 	let rasp = await response.json();
	// 	return rasp;
	// }

	/* ---------------------------------------------------------------------------------------------------- */
	class RaspModel {

		constructor(record) {
			//this.rec = record;
			
			// let rasp = await this.readDB();
			
			this.rasp_data_loaded_event = new Event('rasp_data_loaded');  //let event = new Event(type[, options]);

			this.RaspRecord_ready = false;
		
			this.rasp = null; 
			this.readDB();
			
			// console.log("RaspRecord dzala!");
			// console.log(this.rasp);
		}

		async readDB() {
			this.response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'read' }) });
			this.raspp  = await this.response.json();
			//debugger;
			//console.log("ReadDB dzala!");
			console.log(this.raspp);
			this.rasp = JSON.parse(this.raspp);



			this.RaspRecord_ready = true;
			let d = document.querySelector('#ddd');
			d.dispatchEvent(this.rasp_data_loaded_event);

		}
		to_string() {
			return JSON.stringify(this.rasp);
		}
	}

	/* ---------------------------------------------------------------------------------------------------- */

	class Controller {

		constructor() {


		}
	}

	class RaspView {

		constructor(rasp_obj) {
			this.rows_number = 0;
			this.rasp = rasp_obj;
			console.log(this.rasp);
			$(".admin-grid-container").append(`
			<div  class="admin-grid-container-div-th">Copy</div>
			<div  class="admin-grid-container-div-th">Id</div>
			<div  class="admin-grid-container-div-th">Day</div>
			<div  class="admin-grid-container-div-th">Time</div>
			<div  class="admin-grid-container-div-th">Place</div>
			<div  class="admin-grid-container-div-th">Name</div>
			<div  class="admin-grid-container-div-th">Display</div>
			<div  class="admin-grid-container-div-th">Del</div>
			`);  //Header of table

			this.rasp.forEach((item) => {
				this.addRow(item);
			});

			$(".admin-grid-container").append(`
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			<div contenteditable="true" class="admin-grid-container-div-ed">--</div>
			`);
		}

		copy_btn_processing(eventObject) {
			console.log(eventObject.data)
		};

		del_btn_processing(eventObject) {
			console.log(eventObject.data)
		};


		addRow(row) {

			console.log(this.rows_number);

			$(".admin-grid-container").append(`<div  class="btn_copy agcd-row${this.rows_number} copy-btn${this.rows_number}"> copy </div>`);

			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.id}</div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_day_of_week} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_begin_time} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_place} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_name} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_show} </div>`);
			$(".admin-grid-container").append(`<div class="btn_del agcd-row${this.rows_number} del-btn${this.rows_number}"> del </div>`);

			$(`.copy-btn${this.rows_number}`).on("click", { num: this.rows_number, act: "copy" }, this.copy_btn_processing); // , {num: this.rows_number});
			$(`.del-btn${this.rows_number}`).on("click", { num: this.rows_number, act: "del" }, this.del_btn_processing);


			this.rows_number++;

		}

		get number_of_rows() {
			return this.rows_number;
		}

	}

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


})(jQuery);


