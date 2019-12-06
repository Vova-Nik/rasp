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

	async function rasp_ready() {


		let raspModel = new RaspModel(1);
		//let rasp_data_loaded_event = new Event('rasp_data_loaded');
	
		$('#ddd').on('rasp_data_loaded',  function() {
			console.log('---events HBn loaded');
			let raspView = new RaspView(raspModel.rasp);
		});
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
			this.rasp_data_loaded_event = new Event('rasp_data_loaded');  //let event = new Event(type[, options]);
			this.RaspRecord_ready = false;
			this.rasp = null; 
			this.readDB();
		}

		async readDB() {
			this.response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'read' }) });
			this.raspp  = await this.response.json();
			//console.log(this.raspp);
			this.rasp = JSON.parse(this.raspp);
			this.RaspRecord_ready = true;
			let d = document.querySelector('#ddd');
			d.dispatchEvent(this.rasp_data_loaded_event);
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
			this.reDraw();
			// console.log(this.rasp);
			// $(".admin-grid-container").append(`
			// <div  class="admin-grid-container-div-th">Copy</div>
			// <div  class="admin-grid-container-div-th">Id</div>
			// <div  class="admin-grid-container-div-th">Day</div>
			// <div  class="admin-grid-container-div-th">Time</div>
			// <div  class="admin-grid-container-div-th">Place</div>
			// <div  class="admin-grid-container-div-th">Name</div>
			// <div  class="admin-grid-container-div-th">Display</div>
			// <div  class="admin-grid-container-div-th">Del</div>
			// `);  //Header of table

			// this.rasp.forEach((item) => {
			// 	this.displayRow(item);
			// });

			// $(".admin-grid-container").append(`
			// <div  class="admin-grid-container-div-ed btn_copy"></div>
			// <div  class="admin-grid-container-div-ed">-</div>
			// <div contenteditable="true" class="admin-grid-container-div-ed"></div>
			// <div contenteditable="true" class="admin-grid-container-div-ed"></div>
			// <div contenteditable="true" class="admin-grid-container-div-ed"></div>
			// <div contenteditable="true" class="admin-grid-container-div-ed"></div>
			// <div contenteditable="true" class="admin-grid-container-div-ed"></div>
			// <div contenteditable="true" class="admin-grid-container-div-ed"></div>
			// `);
		}

		copy_btn_processing(eventObject) {

			//console.log(eventObject.data.num);
			//console.log(eventObject.data.th.rasp[eventObject.data.num]);
			eventObject.data.th.copyRow(eventObject.data.th.rasp[eventObject.data.num]);

		};

		del_btn_processing(eventObject) {
			console.log(eventObject.data.num);
			eventObject.data.th.delRow(eventObject.data.num);
			//console.log(eventObject.data.th.rasp[eventObject.data.num]);
		};

		addRow(row){
			//$("admin-grid-container-div-ed btn_copy").append

		}

		delRow(row_number){
			this.rasp.splice(row_number, 1);
			//$(`admin-grid-container-div agcd-row${n}`).remove();
			this.reDraw();
		}

		copyRow(row){
			this.rasp.push(row);
			//this.rasp[this.rasp.length-1].id='';
			//console.log(this.rasp);
			this.reDraw();
		}

		reDraw(){
			$( ".admin-grid-container > div" ).remove();
			this.rows_number = 0;
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
				this.displayRow(item);
			});

			$(".admin-grid-container").append(`
			<div  class="admin-grid-container-div-ed btn_copy"></div>
			<div  class="admin-grid-container-div-ed">-</div>
			<div contenteditable="true" class="admin-grid-container-div-ed"></div>
			<div contenteditable="true" class="admin-grid-container-div-ed"></div>
			<div contenteditable="true" class="admin-grid-container-div-ed"></div>
			<div contenteditable="true" class="admin-grid-container-div-ed"></div>
			<div contenteditable="true" class="admin-grid-container-div-ed"></div>
			<div contenteditable="true" class="admin-grid-container-div-ed"></div>
			`);

		}


		displayRow(row) {

			//console.log(row);
			$(".admin-grid-container").append(`<div  class="btn_copy agcd-row${this.rows_number} copy-btn${this.rows_number}"> copy </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.id}</div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_day_of_week} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_begin_time} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_place} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_name} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div agcd-row${this.rows_number}"> ${row.event_show} </div>`);
			$(".admin-grid-container").append(`<div class="btn_del agcd-row${this.rows_number} del-btn${this.rows_number}"> del </div>`);

			$(`.copy-btn${this.rows_number}`).on("click", { num: this.rows_number, act: "copy", th: this }, this.copy_btn_processing); // , {num: this.rows_number});
			$(`.del-btn${this.rows_number}`).on("click", { num: this.rows_number, act: "del", th: this }, this.del_btn_processing);
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


