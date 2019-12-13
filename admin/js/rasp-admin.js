(function ($) {
	'use strict';

	document.addEventListener("DOMContentLoaded", rasp_ready);

	async function rasp_ready() {
		let rasp = await read_from_db();
		rasp = JSON.parse(rasp);
		let raspController = new RaspController(rasp);
	}
	/******************************end of main()******************************************* */
	async function save_to_db(rasp_event) {
		//rasp_event.action = 'save';
		let req_body = JSON.stringify(rasp_event);
		//console.log(req_body);
		// let json_rasp_event = JSON.stringify(rasp_event);
		// let command = JSON.stringify({ action: 'save'})
		let response = await fetch('/wp-json/rasp/v1/raspwrite', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: req_body });
		let rasp = await response.json();
		console.log(`Write response = ${rasp}`);
		return rasp_event;
	}

	/******** Delets record with id= db_id **********/
	async function del_in_db(db_id) {
		let response = await fetch('http://raspwp/wp-json/rasp/v1/raspdel', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'del', id: db_id }) });
		// console.log(response);
		// let rasp = await response.json();
		return rasp;
	}

	/******** Reads table from DB and then shows whole table it on display**********/
	async function read_from_db() {

		let response = await fetch('/wp-json/rasp/v1/raspread', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'read' }) });
		let rasp = await response.json();
		return rasp;
	}


	/******************RaspController************************* */
	class RaspController {
		constructor(rasp) {
			this.raspModel = new RaspModel(rasp); //RaspModel
			this.raspView = new RaspView(this.raspModel, this);


		}
		editBtn(selfRef, numOfEvent) {
			//console.log('editBtn in controller ' + numOfEvent);
			//let ind = selfRef.raspModel.addEventCopy(numOfEvent);
			this.raspView.showForm(numOfEvent);
		}

		copyBtn(selfRef, numOfEvent) {
			let ind = selfRef.raspModel.addEventCopy(numOfEvent);
			this.raspView.showForm(ind);
		}

		async saveBtnInFormCopy(selfRef, numOfEvent) {
			//debugger;
			console.log('editBtn in controller part 2 - Save in FORM', numOfEvent);
			let req_body = JSON.stringify(selfRef.raspModel.getArr()[numOfEvent]);
			console.log(req_body);
			let response = await fetch('/wp-json/rasp/v1/raspwrite', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: req_body });
			let resp = await response.json();
			console.log(resp);
			//save_to_db(req_body);
			//selfRef.raspView.updateView();
		}

		delBtn(selfRef, numOfEvent) {
			selfRef.raspModel.delEvent(numOfEvent);
			selfRef.raspView.updateView();
		}

		fileBtn(){
			//let aa = $('btn_save');
			$(".file_act_button").on("click", function (element) {
				console.log('file button', element);
				console.log(element.originalEvent.path[0]); //,  .classList[0]);

			});

		}
	}

	/********************** RaspView  Class *****************************/
	class RaspView {
		constructor(raspModel, raspCtrl) {
			this.rasp_model = raspModel;
			this.rasp_controller = raspCtrl;
			this.updateView();
			this.is_activated = false;
			this.createForm();
		}
		updateView() {
			$(".admin-grid-container >* ").remove();
			$(".file_act_button").remove();
			//		debugger;
			$(".admin-grid-container").append(`
			<div  class="admin-grid-container-div-th grid-act">Action</div>
			<div  class="admin-grid-container-div-th ">Id</div>
			<div  class="admin-grid-container-div-th">Day</div>
			<div  class="admin-grid-container-div-th">Time</div>
			<div  class="admin-grid-container-div-th">Name</div>
			<div  class="admin-grid-container-div-th">Place</div>
			<div  class="admin-grid-container-div-th">Description</div>
			<div  class="admin-grid-container-div-th">URL</div>
			<div  class="admin-grid-container-div-th">Show</div>
			<div  class="admin-grid-container-div-th">Del</div>	
			`);  //Header of table

			this.rasp_model.getArr().forEach((item, i) => {
				$(".admin-grid-container").append(`<div class="admin-grid-container-div-btn edit-btn agcd-row${i}">Edit`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div-btn copy-btn agcd-row${i}">Copy`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.id}</div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_day_of_week} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_begin_time} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_name} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_place} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_description} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_url} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_show} </div>`);
				$(".admin-grid-container").append(`<div class="admin-grid-container-div-btn del-btn agcd-row${i}">Del</div>`);

				let thisRaspController = this.rasp_controller;
				$(`.edit-btn.agcd-row${i}`).on("click", function (element) {
					thisRaspController.editBtn(thisRaspController, i);
				}).bind(thisRaspController, i);

				$(`.copy-btn.agcd-row${i}`).on("click", function (element) {
					thisRaspController.copyBtn(thisRaspController, i);
				}).bind(thisRaspController, i);

				$(`.del-btn.agcd-row${i}`).on("click", function (element) {
					thisRaspController.delBtn(thisRaspController, i);
				}).bind(thisRaspController, i);
			});

			$("#wpbody-content").append(`
			<div  class="file_act_button btn_save">Save to File</div>
			<div  class="file_act_button btn_load">Load from File</div>
			`);
			this.rasp_controller.fileBtn();
			// let aa = $('btn_save');
			// console.log('Save button init', aa);

			// function zam(trc){
			// 	return function(trc){
			// 		return trc;
			// 	}
			// }

			// let aa = zam(this.rasp_controller);



		}

		createForm(numOfEvent) {
			$('#wpbody-content').append('<div class="edit-area"></div>');
			
			{					/********************** HTML for FORM******************************** */
				$('.edit-area').append(`
				<form id = "rasp-form">
					<ul class="flex-outer">
						<li>
							<label for="form-time" class="input-label">Event time HH:MM:SS</label>
							<input type="text" id="form-time" placeholder="00:00:00">
						</li>
						<li>
							<label for="form-day" class="input-label"> Day of week (0..6)*</label>
							<input type="number" id="form-day" min="0" max="6" placeholder="">
						</li>
						<li>
							<label for="form-name" class="input-label">Event Name</label>
							<input type="text" id="form-name" placeholder="">
						</li>
						<li>
						<label for="form-place" class="input-label">Event place</label>
						<input type="text" id="form-place" placeholder="">
						</li>
						<li>
							<label for="form-description" class="input-label">Description</label>
							<input type="text" id="form-description" placeholder="">
						</li>
						<li>
							<label for="form-url" class="input-label">Event URL</label>
							<input type="url" id="form-url" placeholder="">
						</li>
						<li>
						<label for="form-show" class="input-label">1-show, 0-hide</label>
						<input type="number" id="form-show" min="0" max="1" placeholder="">
						</li>
						<li>
						<div id = "form_btn_save" class = 'form-btn'>Save</div>
						</li>
					</ul>
				</form
				`);
			}

			$('.edit-area').css('display', 'none');

			this.btn_save = document.querySelector("#form_btn_save");

		}

		showForm(numOfEvent) {
			if (this.is_activated)
				return; 			//escape dublicate call of the form
			this.is_activated = true;
			$('#form-time').val(this.rasp_model.getEvent(numOfEvent).event_begin_time);
			$('#form-day').val(this.rasp_model.getEvent(numOfEvent).event_day_of_week);
			$('#form-name').val(this.rasp_model.getEvent(numOfEvent).event_name);
			$('#form-place').val(this.rasp_model.getEvent(numOfEvent).event_place);
			$('#form-description').val(this.rasp_model.getEvent(numOfEvent).event_description);
			$('#form-url').val(this.rasp_model.getEvent(numOfEvent).event_url);
			$('#form-show').val(this.rasp_model.getEvent(numOfEvent).event_show);

			$('.edit-area').css('display', 'block');

			////////////////////////////////////////////////////////////////////////////////////////////////////

			let this_Rasp_Model = this.rasp_model;
			let this_ = this;

			this.btn_save.onclick = function () {
				console.log('btn save on click in form callback!');
				$('.edit-area').css('display', 'none');
				//this_.Rasp_Model.is_activated = false;
				this_.rasp_model.is_activated = false;

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

					this_.rasp_model.getEvent(numOfEvent).event_begin_time = th + ':' + tm + ':' + ts;

					let dofw = $('#form-day').val();
					jQuery.trim(time);
					dofw = parseInt(dofw);
					if (isNaN(dofw)) dofw = 0;
					if (dofw < 0) dofw = 0;
					if (dofw > 6) dofw = dofw % 7;
					this_.rasp_model.getEvent(numOfEvent).event_day_of_week = dofw;

					this_.rasp_model.getEvent(numOfEvent).event_name = $('#form-name').val();
					this_.rasp_model.getEvent(numOfEvent).event_place = $('#form-place').val();
					this_.rasp_model.getEvent(numOfEvent).event_description = $('#form-description').val();
					this_.rasp_model.getEvent(numOfEvent).event_url = $('#form-url').val();

					let sh = $('#form-show').val();
					if (sh != 0) sh = 1;
					this_.rasp_model.getEvent(numOfEvent).event_show = sh;
				}
				this_.is_activated = false;
				this_.updateView();
				this_.rasp_controller.saveBtnInFormCopy(this_.rasp_controller, numOfEvent);
			}.bind(this_, numOfEvent);
			////////////////////////////////////////////////////////////////////////////////////
		}
	}


	/**************************** RaspModel Class ************************************* */
	class RaspModel {
		constructor(rasp) {
			this.raspMod = new Array();
			let rEvnt = '';
			rasp.forEach((evnt, i) => {
				rEvnt = new RaspEvent();
				rEvnt.assignEvent(evnt, i);
				this.raspMod.push(rEvnt);
			});
		}
		getEvent(ind) {
			return this.raspMod[ind];
		}

		getArr() {
			return this.raspMod;
		}

		addEventCopy(indeX) {
			let newEvent = new RaspEvent;
			let ind = this.raspMod.length;
			newEvent.copyEvent(this.raspMod[indeX], ind);
			this.raspMod.push(newEvent);
			return ind;
		}

		addEvent(indeX) {
			let evnt = this.raspMod[indeX];
			evnt.id = '';
			this.raspMod.push(evnt);
		}

		delEvent(num) {
			this.raspMod[num].killYourself();
			//fetch('http://raspwp/wp-json/rasp/v1/raspdel', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'del', id: this.raspMododel[num].id }) });
			this.raspMod.splice(num, 1);
		}
	}

	/**************************** RaspEvent Class************************************* */
	class RaspEvent {
		constructor() {
			this.event_begin_time = '23:59:30';
			this.event_category = "0";
			this.event_day_of_week = 0;
			this.event_description = 'event_description';
			this.event_end_time = 'event_end_time';
			this.event_name = 'event_name';
			this.event_place = 'event_place';
			this.event_show = 1;
			this.event_url = 'event_url';
			this.id = '';
			this.saved = false;
			this.date = new Date();
		}

		assignEvent(eventObj, numInRaspModel) {
			this.event_begin_time = eventObj.event_begin_time;
			this.event_category = eventObj.event_category;
			this.event_day_of_week = eventObj.event_day_of_week;
			this.event_description = eventObj.event_description;
			this.event_end_time = eventObj.event_end_time;
			this.event_name = eventObj.event_name;
			this.event_place = eventObj.event_place;
			this.event_show = eventObj.event_show ;
			this.event_url = eventObj.event_url;
			this.id = eventObj.id;
			this.saved = eventObj.saved;
			this.num_in_rasp_model = numInRaspModel;
			this.unicId = eventObj.unicId;
			if (this.unicId === "undefined" || this.unicId == null || this.unicId == 0) {
				this.unicId = this.createId(numInRaspModel);
			}
			this.saved = true;
			//return this;
		}

		copyEvent(templObj, numInRaspModel) {
			this.saved = false;
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
			this.id = null;
			this.event_sortier = this.event_day_of_week + this.event_begin_time[0] + this.event_begin_time[1] + this.event_begin_time[3] + this.event_begin_time[4] + this.event_begin_time[6] + this.event_begin_time[7];
			this.unicId = this.createId(numInRaspModel);
			return this;
		}

		createId(numInArr){
			return this.date.getTime() + numInArr;
		}


		killYourself() {
			if (!this.saved)
				return null;
			if (!isNaN(this.id))
				fetch('http://raspwp/wp-json/rasp/v1/raspdel', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'del', id: this.id }) });
			return null;
		}

		saveYourself() {
			if (!this.saved) {
				let req_body = JSON.stringify(this);
				console.log(req_body);
				this.id = fetch('/wp-json/rasp/v1/raspwrite', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: req_body });
				this.saved = true;
			}
		}

		getYorself() {
			let Ya = {

			}
		}

		createForm() {

		}
	}
	/**************************** RaspEvent class END ************************************* */

})(jQuery);


