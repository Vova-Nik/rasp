(function ($) {
    'use strict';

    document.addEventListener("DOMContentLoaded", rasp_ready);

    async function rasp_ready() {
        //let rasp = await read_from_db();

        let response = await fetch('/wp-json/rasp/v1/raspread', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({action: 'read'})
        });
        let rasp = await response.json();
        rasp = JSON.parse(rasp);
        let raspController = new RaspController(rasp);
    }

    /***************************** End of main() ******************************************* */

    /***************************** RaspController ************************* */
    class RaspController {
        constructor(rasp) {
            this.raspModel = new RaspModel(rasp); //RaspModel
            this.raspView = new RaspView(this.raspModel, this);
        }

        fileBtn() {
            $(".form_act_button").on("click", function (element) {
                let btn_functionality = element.originalEvent.path[0].className;
                if (btn_functionality.includes('save')) {
                    this.raspModel.saveModeltoCSV();
					$.notify("Access granted", "success");
                    //alert("Saved to file rasp_data.txt in rasp folder of server");
                }
                if (btn_functionality.includes('btn_load')) {
                    this.raspModel.loadModelfromCSV();
                    //alert("DB loaded from file rasp_data.txt in rasp folder of server");
                    location.reload();
                }
                if (btn_functionality.includes('download'))
                    window.open('/wp-content/plugins/rasp/rasp_data.csv');
                //<p><a href="images/xxx.jpg" download>Скачать файл</a>

                if (btn_functionality.includes('upload')) {
                }
            }.bind(this));

			//upload file
            $("#inp-file").on("change", function (element) {
                if (element.target.files.length > 1) {
                    alert("Only one file at once");
                    return;
                }
                if (element.target.files[0].name.endsWith('.csv') != true) {
                    alert("Only correct .csv file");
                    return;
                }
                console.log("file selected", element.target.files[0].name);
            });
        }

        additInp() {
            $('.addit_inp').on("change", function (element) {
                console.log("additInp!!");
            });
        }
    }

    /**************************** RaspView  Class **************************** */
    class RaspView {
        constructor(raspModel, raspCtrl) {
            this.rasp_model = raspModel;
            this.rasp_controller = raspCtrl;
            this.updateView();
            this.is_activated = false;
            this.createForm();
            this.num_of_colls = 3;
            this.currentFormID = 0;	//num of event in table for form/ Set - in show form, use in save btn in form
        }

        updateView() {
            $(".admin-grid-container >* ").remove();
            $(".down-form").remove();
            $(".common-settings-form").remove();
            //console.log("View updated", this.rasp_model.getArr());
            const adminGridContainer = $(".admin-grid-container");
            //	$(".admin-grid-container").append(`

            adminGridContainer.append(`
			<div  class="admin-grid-container-div-th grid-act">Action</div>
			<div  class="admin-grid-container-div-th th-day-col">Day</div>
			<div  class="admin-grid-container-div-th th-time-col">Time</div>
			<div  class="admin-grid-container-div-th th-name-col">Name</div>
			<div  class="admin-grid-container-div-th th-place-col">Place</div>
			<div  class="admin-grid-container-div-th th-description-col">Description</div>
			<div  class="admin-grid-container-div-th th-URL-col">URL</div>
			<div  class="admin-grid-container-div-th th-show_col">Show</div>
			<div  class="admin-grid-container-div-th">Del</div>	
			`);  //Header of table

            this.rasp_model.sort_col();
            if (this.rasp_model.sort_col == this.rasp_model.sortByDay) $(".th-day-col").append(`<b> ^</b>`);
            if (this.rasp_model.sort_col == this.rasp_model.sortByTime) $(".th-time-col").append(` ^`);
            if (this.rasp_model.sort_col == this.rasp_model.sortByName) $(".th-name-col").append(` ^`);
            if (this.rasp_model.sort_col == this.rasp_model.sortByPlace) $(".th-place-col").append(` ^`);
			if (this.rasp_model.sort_col == this.rasp_model.sortByShow) $(".th-show_col").append(` ^`);

			//************************************************ Sortings *********************************************************
			{
				$('.admin-grid-container-div-th').on("click", function (element) {
					let btn_functionality = element.originalEvent.path[0].className;
					//console.log('btn_functionality ---', btn_functionality); //,  .classList[0]);
					if (btn_functionality.includes('th-day-col')) {
						this.rasp_model.sortByDay();
						this.updateView();
					}
					if (btn_functionality.includes('th-time-col')) {
						this.rasp_model.sortByTime();
						this.updateView();
					}
					if (btn_functionality.includes('th-name-col')) {
						this.rasp_model.sortByName();
						this.updateView();
					}
					if (btn_functionality.includes('th-place-col')) {
						this.rasp_model.sortByPlace();
						this.updateView();
					}
					if (btn_functionality.includes('th-show_col')) {
						this.rasp_model.sortByShow();
						this.updateView();
					}
				}.bind(this));
			}

            this.rasp_model.getArr().forEach((item, i) => {
                adminGridContainer.append(`<div class="admin-grid-container-div-btn edit-btn agcd-row${i}" data-index = ${i}>Edit</div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div-btn copy-btn agcd-row${i}" data-index = ${i}>Copy</div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_day_of_week} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_begin_time} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_name} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_place} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_description} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_url} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div agcd-row${i}"> ${item.event_show} </div>`);
                adminGridContainer.append(`<div class="admin-grid-container-div-btn del-btn agcd-row${i}" data-index = ${i}>Del</div>`);
                if (i % 2 == 1) {
                    $(`.agcd-row${i}`).css('opacity', '.8');
                }
            });

            adminGridContainer.append(`<div class="admin-grid-container-div-btn new-btn">New</div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div-blank"></div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div"> </div>`);
            adminGridContainer.append(`<div class="admin-grid-container-div-blank"></div>`);

			const th = this;
			$(`.edit-btn`).on("click", function (event) {
				const ind = event.target.dataset.index;
				th.showForm(ind);
			}.bind(th));

			$(`.copy-btn`).on("click", function (event) {
				const ind = event.target.dataset.index;
				const copiedEventInd = th.rasp_model.addEventCopy(ind);
				th.showForm(copiedEventInd);
			}.bind(th));

			$('.del-btn').on("click", function (event) {
				const ind = event.target.dataset.index;
				th.rasp_model.delEvent(ind);
			}.bind(th));

			$('.newBtn').on("click", function(event){
					let ind = th.rasp_model.addEventNew();
					th.showForm(ind);
			}.bind(th));

            let ph = this.num_of_colls;
            $(".aditional").append(
                `
			<div class="common-settings-form">
				<div class="settings-form">
						<p>Table. Way to show settings</p>
						<div><input type="checkbox" checked>Display Name</div>
						<div><input type="checkbox" checked>Display Place</div>
						<div><input type="checkbox" checked>Display Description</div>
						<div><input type="checkbox" checked>Display URL Link</div>
					<div>
								<input type="number" class="addit_inp" id="down-num" min="0" max="32" placeholder=${ph}>
								<label for="scales">Number of rows</label>
					</div>
					<div>
								<input type="checkbox" class="addit_inp" id="down-chk" name="Adaptive" checked>
								<label for="scales">Adaptive</label>
					</div>
					<div  class="form_act_button btn_save">Save</div>
		  		</div>
					<div class="file-oper-form">
							<p>Local .csv file</p>
							<div  class="form_act_button btn_save">Save to File</div>
							<div  class="form_act_button btn_load">Load from File</div>
							<div  class="form_act_button btn_download">Download</div>
							<input id="inp-file" name="myCsvFile" type="file">
							<label class="form_act_button btn_upload" for="inp-file">Upload</label>
					</div>
				</div>
			`);

           //this.rasp_controller.newBtn();
            this.rasp_controller.fileBtn();
            //this.rasp_controller.sortBtn();
            this.rasp_controller.additInp();
        }

///////////////////////////////////////////////////////////////////////////////////////////////
        createForm(numOfEvent) {
            $('#wpbody-content').append('<div class="edit-area"></div>');
            {
                /********************** HTML for FORM******************************** */
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
						<input type="number" id="form-show" min="0" max="128" placeholder="">
						</li>
						<li>
							<div class = "form-btn-area">
								<div id = "form_btn_save" class = 'form-btn'>Save</div>
								<div id = "form_btn_escape" class = 'form-btn'>Cancel</div>  
							</div> 
						</li>
					</ul>
				</form>
				`);
            }
            $('.edit-area').css('display', 'none');

            let that = this;
            $('#form_btn_escape').on('click', function (event) {
                $('.edit-area').css('display', 'none');
                that.is_activated = false;
            }.bind(that));

////////////////////////////////////////////////////////////////////////////////////////////////
            $('#form_btn_save').on('click', function (event) {
                const numOfEvent = $('#form_btn_save').data("numOfEvent");
                console.log('numOfEvent = ', numOfEvent);
                //console.log('btn save on click in form callback!');
                $('.edit-area').css('display', 'none');
                const rasp_event_id = that.currentFormID;
                const currentEvent = that.rasp_model.getEvent(rasp_event_id);
                //this.rasp_model.is_activated = false;
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

                    //this.rasp_model.getEvent(numOfEvent).event_begin_time = th + ':' + tm + ':' + ts;
                    currentEvent.event_begin_time = th + ':' + tm + ':' + ts;

                    let dofw = $('#form-day').val();
                    jQuery.trim(time);
                    dofw = parseInt(dofw);
                    if (isNaN(dofw)) dofw = 0;
                    if (dofw < 0) dofw = 0;
                    if (dofw > 6) dofw = dofw % 7;
                    currentEvent.event_day_of_week = dofw;

                    currentEvent.event_name = $('#form-name').val();
                    currentEvent.event_place = $('#form-place').val();
                    currentEvent.event_description = $('#form-description').val();
                    currentEvent.event_url = $('#form-url').val();

                    let sh = $('#form-show').val();
                    //if (sh != 0) sh = 1;
                    currentEvent.event_show = sh;
                }
                that.is_activated = false;
                that.rasp_model.updateEvent(numOfEvent);
                that.updateView();
            }.bind(that));
        }

        showForm(numOfEvent) {
            if (this.is_activated)
                return; 			//escape dublicate call of the form
            this.is_activated = true;
            const event = this.rasp_model.getEventCopy(numOfEvent);
            this.currentFormID = numOfEvent;  // for "save" button
            $('#form-time').val(event.event_begin_time);
            $('#form-day').val(event.event_day_of_week);
            $('#form-name').val(event.event_name);
            $('#form-place').val(event.event_place);
            $('#form-description').val(event.event_description);
            $('#form-url').val(event.event_url);
            $('#form-show').val(event.event_show);
            $('#form_btn_save').data("numOfEvent", numOfEvent);  //Passin to button "Save" onclick processing

            $('.edit-area').css('display', 'block');  //Show form


            //this.btn_save = document.querySelector("#form_btn_save");
            //this.btn_escape = document.querySelector("#form_btn_escape");

            ////////////////////////////////////////////////////////////////////////////////////////////////////
        }
    }

    /**************************** RaspModel Class ******************************************** */
    class RaspModel {
        constructor(rasp) {
            this.raspMod = new Array();
            let rEvnt = '';
            if (rasp.length >= 1) {
                rasp.forEach((evnt, i) => {
                    rEvnt = new RaspEvent();
                    rEvnt.assignEvent(evnt, i);
                    rEvnt.num_in_rasp_model = i;
                    this.raspMod.push(rEvnt);
                });
            }
            this.num_of_rows = 3;
            this.adaptive = false;
            this.sort_col = this.sortByDay;
            this.srv_ans = 0;
            this.request_for_server = 'save'; //read, write - for txt, save load for .csv
        }

        updateEvent(numOfEvent) {
            console.log('Rasp model updateEvent numOfEvent  - ', numOfEvent,);
            let req_body = JSON.stringify(this.raspMod[numOfEvent]);
            //console.log("saving", req_body);
            this.srv_ans = fetch('/wp-json/rasp/v1/raspwrite', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: req_body
            });
        }

        saveModel() {
            //this.request_for_server = 'write';
            let req_body = JSON.stringify(this);
            console.log("saving", req_body);
            this.srv_ans = fetch('/wp-json/rasp/v1/raspwrite', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: req_body
            });
        }

        // editDBRecord(numInModel){
        // 	let req_body = JSON.stringify(this.raspMod[numInModel]);
        // 	console.log("saving", req_body);
        // 	this.srv_ans = fetch('/wp-json/rasp/v1/raspwrite', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: req_body });
        // }
        //
        // copyRecord(numInModel){
        // 	return numInModel;
        // }

        saveModeltoCSV() {
            this.request_for_server = 'save';
            let req_body = JSON.stringify(this);
            console.log(req_body);
            this.srv_ans = fetch('/wp-json/rasp/v1/raspfile', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: req_body
            });
        }

        loadModelfromCSV() {
            this.request_for_server = 'load';
            let req_body = JSON.stringify(this);
            console.log(req_body);
            this.srv_ans = fetch('/wp-json/rasp/v1/raspfile', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: req_body
            });
        }

        getEventCopy(ind) {
            const ev = {};
            Object.assign(ev, this.raspMod[ind]);
            return ev;
        }

        getEvent(ind) {
            return this.raspMod[ind];
        }

        //
        // updateEvent(index, event){
        //
        // 	this.raspMod[ind].event_begin_time = event.event_begin_time;
        // 	this.raspMod[ind].event_category = event.event_category;
        // 	this.raspMod[ind].event_day_of_week = event.event_day_of_week;
        // 	this.raspMod[ind].event_description = event.event_description;
        // 	this.raspMod[ind].event_end_time = event.event_end_time;
        // 	this.raspMod[ind].event_name = event.event_name;
        // 	this.raspMod[ind].event_place = event.event_place;
        // 	this.raspMod[ind].event_show = event.event_show;
        // 	this.raspMod[ind].event_url = event.event_url;
        // 	this.raspMod[ind].id = event.id;
        // 	//this.raspMod[ind].saved = false;
        // }


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

        addEventNew() {
            let ind = this.raspMod.length;
            let newEvent = new RaspEvent;
            this.raspMod.push(newEvent);
            return ind;
        }

        addEvent(indeX) {
            let evnt = this.raspMod[indeX];
            evnt.id = '';
            this.raspMod.push(evnt);
            this.saveModel();
        }

        delEvent(num) {
            //this.saveModel();
            //let idd = this.raspMod[num].id;
            console.log(this.raspMod);
            fetch('http://raspwp/wp-json/rasp/v1/raspdel', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({action: 'del', id: this.raspMod[num].id})
            });
            this.raspMod[num].killYourself();
            this.raspMod.splice(num, 1);
        }

        sortByDay() {
            this.sort_col = this.sortByDay;
            this.raspMod.sort(function (a, b) {
                if (a.event_day_of_week > b.event_day_of_week) {
                    return 1;
                }
                if (a.event_day_of_week < b.event_day_of_week) {
                    return -1;
                }
                if (a.event_begin_time > b.event_begin_time) {
                    return 1;
                }
                if (a.event_begin_time < b.event_begin_time) {
                    return -1;
                }
                if (a.event_name > b.event_name) {
                    return 1;
                }
                if (a.event_name < b.event_name) {
                    return -1;
                }
                return 0;
            });
        }

        sortByTime() {
            this.sort_col = this.sortByTime;
            this.raspMod.sort(function (a, b) {
                if (a.event_begin_time > b.event_begin_time) {
                    return 1;
                }
                if (a.event_begin_time < b.event_begin_time) {
                    return -1;
                }
                if (a.event_day_of_week > b.event_day_of_week) {
                    return 1;
                }
                if (a.event_day_of_week < b.event_day_of_week) {
                    return -1;
                }
                if (a.event_name > b.event_name) {
                    return 1;
                }
                if (a.event_name < b.event_name) {
                    return -1;
                }
                return 0;
            });
        }

        sortByName() {
            this.sort_col = this.sortByName;
            this.raspMod.sort(function (a, b) {
                if (a.event_name > b.event_name) {
                    return 1;
                }
                if (a.event_name < b.event_name) {
                    return -1;
                }
                if (a.event_day_of_week > b.event_day_of_week) {
                    return 1;
                }
                if (a.event_day_of_week < b.event_day_of_week) {
                    return -1;
                }
                if (a.event_begin_time > b.event_begin_time) {
                    return 1;
                }
                if (a.event_begin_time < b.event_begin_time) {
                    return -1;
                }
                return 0;
            });
        }

        sortByPlace() {
            this.sort_col = this.sortByPlace;
            this.raspMod.sort(function (a, b) {
                if (a.event_place > b.event_place) {
                    return 1;
                }
                if (a.event_place < b.event_place) {
                    return -1;
                }
                if (a.event_name > b.event_name) {
                    return 1;
                }
                if (a.event_name < b.event_name) {
                    return -1;
                }
                if (a.event_day_of_week > b.event_day_of_week) {
                    return 1;
                }
                if (a.event_day_of_week < b.event_day_of_week) {
                    return -1;
                }
                if (a.event_begin_time > b.event_begin_time) {
                    return 1;
                }
                if (a.event_begin_time < b.event_begin_time) {
                    return -1;
                }
                return 0;
            });
        }

        sortByShow() {
            this.sort_col = this.sortByShow;
            this.raspMod.sort(function (a, b) {
                if (parseInt(a.event_show) > parseInt(b.event_show)) {
                    return 1;
                }
                if (parseInt(a.event_show) < parseInt(b.event_show)) {
                    return -1;
                }
                return 0;
            });
        }
    }

    /**************************** RaspEvent Class ************************************ */
    class RaspEvent {
        constructor() {
            this.event_begin_time = '';
            this.event_category = "0";
            this.event_day_of_week = 0;
            this.event_description = '';
            this.event_end_time = '';
            this.event_name = '';
            this.event_place = '';
            this.event_show = 1;
            this.event_url = '';
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
            this.event_show = eventObj.event_show;
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

        createId(numInArr) {
            return this.date.getTime() + numInArr;
        }


        killYourself() {
            if (!this.saved)
                return null;
            if (!isNaN(this.id))
            //fetch('http://raspwp/wp-json/rasp/v1/raspdel', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'del', id: this.id }) });
                return null;
        }

        saveYourself() {
            if (!this.saved) {
                let req_body = JSON.stringify(this);
                console.log(req_body);
                //this.id = fetch('/wp-json/rasp/v1/raspwrite', { method: 'post', headers: { 'Content-Type': 'application/json' }, body: req_body });
                this.saved = true;
            }
        }
    }

    /**************************** RaspEvent class END ************************************* */

})(jQuery);


