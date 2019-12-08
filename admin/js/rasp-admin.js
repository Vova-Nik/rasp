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

		//let rasp_View_in_obj = {num: 0, raspViewRef: null}
		let raspModel = new RaspModel(null);
		let raspView =  new RaspView(null);
		

		$('#ddd').on('rasp_data_loaded', function () {
			raspView.initRasp(raspModel.rasp);
			// rasp_View_in_obj.raspViewRef = raspView;
			// console.log(rasp_View_in_obj);

		});

		$(" .button_discard ").on("click", function () {
			console.log('button discard');
			raspModel.del_New_Rows(raspView);

		});

		$(" .button_save ").on("click", function () {
			console.log('button save');
			//raspModel.del_New_Rows();
		});

	} // end of main()

	// async function save_to_db() {
	// 	let response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', name: 1, b: 2 }) });
	// 	let rasp = await response.json();
	// 	return rasp;
	// }

	/* ---------------------------------------------------------------------------------------------------- */
	class RaspModel {

		constructor(rv) {
			//this.raspVievObj = rv.raspViewRef;
			this.rasp_data_loaded_event = new Event('rasp_data_loaded');  //let event = new Event(type[, options]);
			this.RaspRecord_ready = false;
			this.rasp = null;
			this.readDB();

		}

		del_New_Rows(rv) {  //discard button
			let i = this.rasp.length;
			while(i--)
				if (this.rasp[i].new==true){
					this.rasp.splice(i, 1);
			}
			rv.reDraw();
		}

		upDate(){
			
		}

		async readDB() {
			this.response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'read' }) });
			this.raspp = await this.response.json();
			this.rasp = JSON.parse(this.raspp);
			this.rasp.forEach(rasp_record => rasp_record.new = false);
			this.RaspRecord_ready = true;
			let d = document.querySelector('#ddd');
			d.dispatchEvent(this.rasp_data_loaded_event);
		}

		async save_To_DB() {
			let response = await fetch('http://raspwp/wp-json/rasp/v1/rasp', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'save', name: 1, b: 2 }) });
			let rasp = await response.json();
			return rasp;
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
			
			//this.rasp.forEach(row => row.new = false);
			console.log(this.rasp);
		}

		initRasp(rasp_obj){
			this.rasp = rasp_obj;
			this.reDraw();
		}

		copy_btn_processing(eventObject) {
			//console.log(eventObject.data.num);
			//console.log(eventObject.data.th.rasp[eventObject.data.num]);
			eventObject.data.th.copyRow(eventObject.data.num, eventObject.data.th.rasp[eventObject.data.num]);
		};

		del_btn_processing(eventObject) {
			console.log(eventObject.data.num);
			eventObject.data.th.delRow(eventObject.data.num);
		};

		addRow(row) {

		}

		delRow(row_number) {
			this.rasp.splice(row_number, 1);
			this.reDraw();
		}

		copyRow(row_number, row) {
			//let objCopy = Object.assign({}, obj);
			let new_row = JSON.parse(JSON.stringify(row));
			this.rasp.splice((row_number + 1), 0, new_row);
			this.rasp[row_number + 1].new = true;
			this.rasp[row_number + 1].id = '';
			this.reDraw();
			//debugger;
		}

		reDraw() {
			$(".admin-grid-container > div").remove();
			this.rows_number = 0; //display row also changes
			//console.log(this.rasp);
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

			this.rasp.forEach((item, i) => {
				this.displayRow(i);
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

		displayRow(rowN) {
			let row = this.rasp[rowN];
			let new_old_class = '';
			if (row.new)
				new_old_class = 'is_new';
			else
				new_old_class = 'is_old';

			//this.rasp[rowN].new = false;

			$(".admin-grid-container").append(`<div  class="btn_copy agcd-row${this.rows_number} copy-btn${this.rows_number}"> copy </div>`);
			$(".admin-grid-container").append(`<div class="admin-grid-container-div ${new_old_class} agcd-row${this.rows_number} id_col"> ${row.id}</div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div ${new_old_class} agcd-row${this.rows_number}"> ${row.event_day_of_week} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div ${new_old_class} agcd-row${this.rows_number}"> ${row.event_begin_time} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div ${new_old_class} agcd-row${this.rows_number}"> ${row.event_place} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div ${new_old_class} agcd-row${this.rows_number}"> ${row.event_name} </div>`);
			$(".admin-grid-container").append(`<div contenteditable="true" class="admin-grid-container-div ${new_old_class} agcd-row${this.rows_number}"> ${row.event_show} </div>`);
			$(".admin-grid-container").append(`<div class="btn_del agcd-row${this.rows_number} del-btn${this.rows_number}"> del </div>`);

			$(`.copy-btn${this.rows_number}`).on("click", { num: this.rows_number, act: "copy", th: this }, this.copy_btn_processing); // , {num: this.rows_number});
			$(`.del-btn${this.rows_number}`).on("click", { num: this.rows_number, act: "del", th: this }, this.del_btn_processing);

			this.rows_number++; //redraw also changes 
		}

		get number_of_rows() {
			return this.rows_number;
		}

	}

})(jQuery);


/*
	$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_name' => 'Meeting Stupi',   //s
				'event_begin_time' => '19:00',	//s
				'event_place' => 'Ицхака Рабина 7', //s
				'event_day_of_week' => '1' //d
			),
			array('%s', '%s', '%s', '%d')
		);
*/