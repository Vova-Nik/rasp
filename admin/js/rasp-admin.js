(function ($) {
	'use strict';
	document.addEventListener("DOMContentLoaded", rasp_ready);

	async function rasp_ready() {

		let rasp = await read_from_db();
		rasp = JSON.parse(rasp);

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

class raspEvent {
	constructor(templObj) {
		if (typeof templObj === "undefined") {
			this.event_begin_time = '23:59:30';
			this.event_category = "0";
			this.event_day_of_week = 0;
			this.event_description = 'event_description';
			this.event_end_time = 'event_end_time',
			this.event_name = 'event_name';
			this.event_place = 'event_place';
			this.event_show = 1;
			this.event_url = 'event_url';
		}
		else {
			if (typeof templObj.event_begin_time === "undefined") this.event_begin_time = '00:00:00';
			else this.event_begin_time = templObj.event_begin_time;
			if (typeof templObj.event_category === "undefined") this.event_category = '0';
			else this.event_category = templObj.event_category;
			if (typeof templObj.event_day_of_week === "undefined") this.event_day_of_week = 0;
			else this.event_day_of_week = templObj.event_day_of_week;
			if (typeof templObj.event_description === "undefined") this.event_description = 'Event Description';
			else this.event_description = templObj.event_description;
			if (typeof templObj.event_end_time === "undefined") this.event_end_time = 0;
			else this.event_end_time = templObj.event_end_time;
			if (typeof templObj.event_name === "undefined") this.event_name = 'Event Name';
			else this.event_name = templObj.event_name;
			if (typeof templObj.event_place === "undefined") this.event_place = 'Event Place';
			else this.event_place = templObj.event_place;
			if (typeof templObj.event_show === "undefined") this.event_show = 1;
			else this.event_show = templObj.event_show;
			if (typeof templObj.event_url === "undefined") this.event_url = 'Event URL';
			else this.event_url = templObj.event_url;
		}
	}
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
		/********************** HTML for FORM******************************** */
		{
			this.edit_area.innerHTML = `
		<form id = "rasp-form">
			<ul class="flex-outer">
				<li>
					<label for="form-time" class="input-label">Event time HH:MM:SS</label>
					<input type="text" id="form-time" placeholder="00:00:00">
				</li>

				<li>
					<label for="form-day" class="input-label">Dday of week (0..6)*</label>
					<input type="number" id="form-day" placeholder="Event day of week">
				</li>

				<li>
					<label for="form-name" class="input-label">Event Name*</label>
					<input type="text" id="form-name" placeholder="Enter event name">
				</li>
				<li>
				<label for="form-place" class="input-label">Description</label>
				<input type="text" id="form-place" placeholder="Event place">
				</li>
				<li>
					<label for="form-description" class="input-label">Description</label>
					<input type="text" id="form-description" placeholder="Event description">
				</li>
				<li>
					<label for="form-url" class="input-label">Event URL</label>
					<input type="url" id="form-url" placeholder="Event url">
				</li>
				<li>
				<label for="form-show" class="input-label">Show 1-yes, 0-no*</label>
				<input type="number" id="form-show" placeholder="1-show, 0-hide ">
				</li>

				<li>
				<div id = "form_btn_save" class = 'form-btn'>Save</div>
				<div id = "form_btn_copy" class = 'form-btn'>Save as copy</div>
				
				</li>
			</ul>
		</form>
		`
		}
		//<div id = "form_btn_save" class = 'form-btn'>Save as copy</div>
		this.btn_copy = document.querySelector("#form_btn_copy");
		this.btn_save = document.querySelector("#form_btn_save");

		this.btn_save.onclick = () => {
			this.edit_conteiner.style.display = "none";
			this.is_activated = false;
			console.log('btn save');

			{				//form submiting
				let time = $('#form-time').val();
				jQuery.trim(time);
				let th = parseInt(time.substring(0, 2));
				if (isNaN(th)) th = 0;
				if (th > 23) th = 23;
				if (th < 0) th = 0;
				if (th < 10) th = '0' + th;
				else th = '' + th;

				let tm = parseInt(time.substring(3, 5));
				if (isNaN(tm)) tm = 0;
				if (tm > 59) tm = 59;
				if (tm < 0) tm = 0;
				if (tm < 10) tm = '0' + tm;
				else tm = '' + tm;

				let ts = parseInt(time.substring(6, 8));
				if (isNaN(ts)) ts = 0;
				if (ts > 59) ts = 59;
				if (ts < 0) ts = 0;
				if (ts < 10) ts = '0' + ts;
				else ts = '' + ts;

				this.event.event_begin_time = th + ':' + tm + ':' + ts;

				let dofw = $('#form-day').val();
				jQuery.trim(time);
				dofw = parseInt(dofw);
				if (isNaN(dofw)) dofw = 0;
				if (dofw < 0) dofw = 0;
				if (dofw > 6) dofw = dofw % 7;
				this.event.event_day_of_week = dofw;

				this.event.event_name = $('#form-name').val();
				this.event.event_place = $('#form-place').val();
				this.event.event_description = $('#form-description').val();
				this.event.event_url = $('#form-url').val();

				let sh = $('#form-show').val();
				if (sh != 0) sh = 1;
				this.event.event_show = sh;
			}

			save_to_db(this.event);
		}

		this.btn_copy.onclick = () => {
			this.edit_conteiner.style.display = "none";
			this.is_activated = false;
			/************************ FORM data checking***************************/
			{				//form submiting
				let time = $('#form-time').val();
				jQuery.trim(time);
				let th = parseInt(time.substring(0, 2));
				if (isNaN(th)) th = 0;
				if (th > 23) th = 23;
				if (th < 0) th = 0;
				if (th < 10) th = '0' + th;
				else th = '' + th;

				let tm = parseInt(time.substring(3, 5));
				if (isNaN(tm)) tm = 0;
				if (tm > 59) tm = 59;
				if (tm < 0) tm = 0;
				if (tm < 10) tm = '0' + tm;
				else tm = '' + tm;

				let ts = parseInt(time.substring(6, 8));
				if (isNaN(ts)) ts = 0;
				if (ts > 59) ts = 59;
				if (ts < 0) ts = 0;
				if (ts < 10) ts = '0' + ts;
				else ts = '' + ts;

				this.event.event_begin_time = th + ':' + tm + ':' + ts;

				let dofw = $('#form-day').val();
				jQuery.trim(time);
				dofw = parseInt(dofw);
				if (isNaN(dofw)) dofw = 0;
				if (dofw < 0) dofw = 0;
				if (dofw > 6) dofw = dofw % 7;
				this.event.event_day_of_week = dofw;

				this.event.event_name = $('#form-name').val();
				this.event.event_place = $('#form-place').val();
				this.event.event_description = $('#form-description').val();
				this.event.event_url = $('#form-url').val();

				let sh = $('#form-show').val();
				if (sh != 0) sh = 1;
				this.event.event_show = sh;
			}
			this.event.id = "";
			console.log(this.event);
			save_to_db(this.event);
		}
	}

	getEvent() {
		return this.event;
	}

	editEvent(action, event_to_edit) {
		if (this.is_activated)
			return;
		this.is_activated = true;
		if (action == 'create') {
			this.event = new raspEvent();
			$('#form_btn_copy').css("display", "none");
		}
		else {
			$('#form_btn_copy').css("display", "block");
			this.event = event_to_edit;
			console.log('else branch');
		}

		this.table_container = document.querySelector(".admin-grid-container");
		this.table_container.style.opacity = ".8";
		this.edit_conteiner.style.display = "";

		console.log('---------------------');
		console.log(this.event.event_description);

		$("#form-time").val(this.event.event_begin_time);
		$("#form-day").val(this.event.event_day_of_week);
		$("#form-name").val(this.event.event_name);
		$("#form-description").val(this.event.event_description);
		$("#form-url").val(this.event.event_url);
		$("#form-show").val(this.event.event_show);
	}
}

})(jQuery);


