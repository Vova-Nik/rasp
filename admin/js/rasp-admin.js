(function ($) {
	'use strict';
	{
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
	}


	document.addEventListener("DOMContentLoaded", rasp_ready);

	async function rasp_ready() {

		var rasp = await read_from_db();
		rasp = JSON.parse(rasp);
		$('body').append(`<div>${rasp}</div>`);

		//let save_res = await save_to_db();
		//console.log(save_res);

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

		$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-empty"> - </div>`);
		$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-empty">  </div>`);
		$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-empty">  </div>`);
		$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-empty">  </div>`);
		$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-empty">  </div>`);
		$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-empty">-  </div>`);


		let raspEdit = new RaspEdit(rasp); //rasp[cl]

		$(".admin-grid-container-div").on("dblclick", function (element) {
			for (let i = 0; i < element.srcElement.classList.length; i++) {
				if (element.srcElement.classList[i].indexOf('agcd-row') >= 0) {
					let num_of_rec = parseInt(element.srcElement.classList[i].substring(8));
					console.log("num_of_rec = " + num_of_rec);
					raspEdit.editEvent('edit', rasp[num_of_rec]);
					break;
				}
				if (element.srcElement.classList[i].indexOf('agcd-empty') >= 0) {
					console.log("num_of_rec = empty");
					raspEdit.editEvent('create', rasp[0]);
					break;
				}
			}
		});


	} // end of main()

	async function save_to_db(rasp_event) {
		//rasp_event.action = 'save';
		let req_body = JSON.stringify(rasp_event);
		console.log(req_body);
		// let json_rasp_event = JSON.stringify(rasp_event);
		// let command = JSON.stringify({ action: 'save'})
		let response = await fetch('http://raspwp/wp-json/rasp/v1/raspwrite', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: req_body });
		let rasp = await response.json();
		return rasp_event;
	}

	async function read_from_db() {
		let response = await fetch('http://raspwp/wp-json/rasp/v1/raspread', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'readd' }) });
		let rasp = await response.json();
		return rasp;
	}


	class RaspEdit {

		constructor(rasp_array) {
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
			{
				this.edit_area.innerHTML = `
			<form id = "rasp-form">
				<ul class="flex-outer">
					<li>
						<label for="form-time">Event time*</label>
						<input type="time" id="form-time" placeholder="Time of beginning">
					</li>

					<li>
						<label for="form-day">Dday of week (0..6)*</label>
						<input type="number" id="form-day" placeholder="Event day of week">
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
					<label for="form-show">Show 1-yes, 0-no*</label>
					<input type="number" id="form-show" placeholder="1-show, 0-hide ">
					</li>

					<li>
					<div id = "form_btn_copy" class = 'form-btn'>Save</div>
					<div id = "form_btn_save" class = 'form-btn'>Save as copy</div>
					</li>
				</ul>
			</form>
			`
			}
			this.btn_copy = document.querySelector("#form_btn_copy");
			this.btn_save = document.querySelector("#form_btn_save");

			this.btn_save.onclick = () => {
				this.edit_conteiner.style.display = "none";
				this.is_activated = false;
				console.log('btn save');
				//save_to_db(this.event);
			}

			this.btn_copy.onclick = () => {
				this.edit_conteiner.style.display = "none";
				this.is_activated = false;

				this.event.event_begin_time = $('#form-time').val();
				this.event.event_day_of_week = $('#form-day').val();
				this.event.event_name = $('#form-name').val();
				this.event.event_description = $('#description').val();
				this.event.event_url = $('#form-url').val();
				this.event.event_show = $('#form-show').val();

				$('#form-time').textContent;
				this.event.id = "";
				console.log(this.event);

				save_to_db(this.event);
			}

		}

		getEvent(){
			return this.event;
		}

		editEvent(action, event_to_edit) {
			if (this.is_activated)
				return;
			this.is_activated = true;
			if (action == 'create') {
				this.event = Object.assign({}, event_to_edit);
				this.event.event_begin_time = 0;
				this.event.event_category = "0";
				this.event.event_day_of_week = "-";
				this.event.event_description = null;
				this.event.event_end_time = null;
				this.event.event_name = "";
				this.event.event_place = "";
				this.event.event_show = "1";
				this.event.event_url = "";
				this.event.id = "";

				console.log(this.event);
			}
			else {
				this.event = event_to_edit;
				console.log(this.event);
			}

			this.table_container = document.querySelector(".admin-grid-container");
			this.table_container.style.opacity = ".8";
			this.edit_conteiner.style.display = "";
			//document.querySelector("#form-time").innerHTML = event_to_edit.event_begin_time;
			$("#form-time").val(this.event.event_begin_time);
			$("#form-name").val(this.event.event_name);
			$("#form-description").val(this.event_description);
			$("#form-url").val(this.event.event_url);
			$("#form-day").val(this.event.event_day_of_week);


			// this.btn_copy = document.querySelector("#form_btn_copy");
			// this.btn_save = document.querySelector("#form_btn_save");


			// this.btn_copy.onclick = () => {
			// 	this.edit_conteiner.style.display = "none";
			// 	this.is_activated = false;
			// 	//console.log('E TO EDIT' + this.event.event_begin_time);
			// }
			// this.btn_save.onclick = () => {
			// 	this.edit_conteiner.style.display = "none";
			// 	this.is_activated = false;
			// }

			// event_to_edit = null;
			// return event_to_edit;
		}

		editEmptyEvent(templet_event) {
			this.event = Object.assign({}, templet_event);
			this.event.event_begin_time = 0;
			this.event.event_category = "0";
			this.event.event_day_of_week = "-";
			this.event.event_description = null;
			this.event.event_end_time = null;
			this.event.event_name = "";
			this.event.event_place = "";
			this.event.event_show = "1";
			this.event.event_url = "";


			this.table_container = document.querySelector(".admin-grid-container");
			this.table_container.style.opacity = ".8";
			this.edit_conteiner.style.display = "";

			$("#form-time").val(this.event.event_begin_time);
			$("#form-name").val(this.event.event_name);
			$("#form-description").val(this.event_description);
			$("#form-url").val(this.event.event_url);
			$("#form-day").val(this.event.event_day_of_week);

		}

		is_Activated() {
			return this.is_activated;
		}




	}

	/*
					event_begin_time: 0,
					event_category: "0",
					event_day_of_week: "-",
					event_description: null,
					event_end_time: null,
					event_name: "",
					event_place: "",
					event_show: "1",
					event_url: "",
	*/


})(jQuery);


