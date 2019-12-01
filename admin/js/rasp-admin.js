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

	// function admdel(ind) {
	// 	console.log("admdel= " + ind);
	// }



	document.addEventListener("DOMContentLoaded", rasp_ready);

	async function rasp_ready() {

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

		let raspEdit = new RaspEdit(rasp); //rasp[cl]

		$(".admin-grid-container-div").dblclick(function (element) {
			element.srcElement.classList.forEach(cl => {
				if (cl.indexOf('agcd-row') > -1) {
					cl = parseInt(cl.substring(8));
					//console.log(rasp[cl]);
					//let raspEdit = new RaspEdit(rasp[cl]);
					raspEdit.editEvent(rasp[cl]);
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


	class RaspEdit {

		constructor(rasp_array){
			this.rasp = rasp_array;
			this.is_activated = false;
			this.wp_client_area = document.querySelector("#wpbody-content");

			this.edit_conteiner = document.createElement("div"); //
			this.edit_conteiner.className = "edit-container";
			this.edit_conteiner.style.display = "none";

			this.wp_client_area.insertAdjacentElement("beforeBegin", this.edit_conteiner);
			this.edit_area = document.createElement("div");
			this.edit_area.className = "edit-area";
			this.edit_conteiner.appendChild(this.edit_area);
			//console.log(this.edit_conteiner);
			this.edit_area.innerHTML = `
			<form id = "rasp-form">
				<ul class="flex-outer">
					<li>
						<label for="form-time">Event time*</label>
						<input type="time" id="form-time" placeholder="Time of beginning">
					</li>
					<li>
						<label for="form-name">Event Name*</label>
						<input type="text" id="form-name" placeholder="Enter event name">
					</li>
					<li>
						<label for="form-description">Description</label>
						<input type="text" id="form-description" placeholder="Event description">
					</li>
					<li>
						<label for="form-url">Event URL</label>
						<input type="url" id="form-url" placeholder="Event url">
					</li>
					<li>
						<label for="form-day">Dday of week (0..6)*</label>
						<input type="number" id="form-day" placeholder="Event day of week">
					</li>

					<li>
					<div id = "form_btn_copy" class = 'form-btn'>Change</div>
					<div id = "form_btn_save" class = 'form-btn'>Save as copy</div>
					</li>
				</ul>
			</form>
			`
		}


		is_Activated(){
			return this.is_activated;
		}

		editEvent(event_to_edit) {
			if(this.is_activated)
				return;
			this.is_activated = true;
			this.table_container = document.querySelector(".admin-grid-container");
			this.table_container.style.opacity = ".8";
			this.edit_conteiner.style.display = "";
			console.log(event_to_edit);

			document.querySelector("#form-time").innerHTML = event_to_edit.event_begin_time;

			//console.log(this.rasp[parseInt(event_to_edit)]);
			console.log(this.rasp[1]);

			this.btn_copy = document.querySelector("#form_btn_copy");
			this.btn_save = document.querySelector("#form_btn_save");



			

			this.btn_copy.onclick = (function()
				{alert("button copy");}
			);
			this.btn_save.onclick = (function()
				{alert("button save");}
			);



			event_to_edit = null;
			return event_to_edit;
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


