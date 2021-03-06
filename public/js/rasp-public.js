(function ($) {
	'use strict';
	/*------------------------------------------------------------------------------------------------*/
	document.addEventListener("DOMContentLoaded", rasp_ready);
	/*------------------------------------------------------------------------------------------------*/
	function rasp_ready() {

		//return;

		let settings = {};
		let sets = document.getElementById("rasp_settings").innerHTML;
		sets = "{" + sets + "}";
		 console.log("setts ", sets);

		try {
			settings = JSON.parse(sets);
		}
		catch{
			console.log("settings parsing error", settings);
			settings = {
				disp_name: true,
				disp_place: true,
				disp_descr: true,
				disp_url: true,
				adaptive: true,
				num_of_rows: "5",
				style_background: "#e0e0f0",
				style_foreground: "#ffffff",
				style_font: "#000000",
			};
		}
		console.log("settings", settings);



		/* Getting data from PHP thru the DOM */
		let events_list_array = []; //new Array();
		let events_list = document.getElementsByClassName("event_data_element");
		for (let i = 0; i < events_list.length; i++) {
			events_list_array[i] = JSON.parse(events_list[i].textContent);
		}
		events_list = null;

		const today = new Date();
		//var today = new Date('20 nov 2019 19:00:00');
		console.log("Sivodni " + today);
		let current_moment = today.getDay() * 10000 + today.getHours() * 100 + today.getMinutes();

		/*
		* Below programm calculates string value of type week(0...6)+hours(0...23)+minutes(0...59) for inst. monday 19:00:00 -> 11900
		* and insertitg into evry event object as "event_begin_time_formated"
		* if "event_begin_time_formated" less then current -> event_begin_time_formated moving to next week (+70000)
		*/

		let event_class_array = []; //new Array();
		events_list_array.forEach(function (element, num) {
			event_class_array[num] = new Event(element, today);
		});

		/*---------------------------------------------------------------------------------------------------*/
		event_class_array.sort(arr_compare);
		//console.log(event_class_array);
		/*sorting array by "event_begin_time_formated"*/
		function arr_compare(a, b) {
			if (a.BegTimeForm > b.BegTimeForm)
				return 1;
			if (a.BegTimeForm < b.BegTimeForm)
				return -1;
			return 0;
		}
		/*-----------------------------------------------------------------------------------------------------*/
		let current_full_date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

		/* Phrase before table message type Сегодня суббота 23.11.2019*/
		let dayMatrix = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		let sDayOfweek = dayMatrix[today.getDay()];
		document.querySelector(".before-grid").innerHTML += ' ' + sDayOfweek + ' ' + current_full_date;
		let today_day_of_week = today.getDay();

		let num_to_show = settings.num_of_rows;
		if (num_to_show > event_class_array.length)
			num_to_show = event_class_array.length;

		if (settings.adaptive) {
			let num_to_show_calc = 0;
			for (let i = 0; i < event_class_array.length; i++) {
				if (event_class_array[i].event_data.day_offset == 0)
					num_to_show_calc++;
			}
			if (num_to_show_calc > num_to_show)
				num_to_show = num_to_show_calc; // to show all today events, in case if them less then num_to_show
		}

		//let grid_props = '[day] minmax(5em, auto) [time] minmax(5em, auto)';
		let grid_props = '[day] auto [time] auto';
		let grid_width = 2;

		if (settings.disp_name) {
			grid_props += ' [name] auto';
			grid_width++;
		}
		if (settings.disp_place) {
			grid_props += ' [place] auto';
			grid_width++;
		}
		if (settings.disp_descr) {
			grid_props += ' [description] auto';
			grid_width++;
		}

		$(".grid-container").css("grid-template-columns", grid_props);

		//grid-template-columns: [day] 5em [time] 5em [name] auto [place] auto [description] auto;
		console.log('grid_props --', grid_props);

		for (let i = 0; i < num_to_show; i++) {
			if (event_class_array[i].event_data.e_show == 0) continue;
			$(".grid-container").append(`<div class="grid-container-div"> ${event_class_array[i].DisplayDate} </div>`);
			$(".grid-container").append(`<div class="grid-container-div"> ${event_class_array[i].DisplayTime} </div>`);
			if (settings.disp_name)
				$(".grid-container").append(`<div class="grid-container-div"> ${event_class_array[i].DisplayName(settings.disp_url)} </div>`);
			if (settings.disp_place)
				$(".grid-container").append(`<div class="grid-container-div"> ${event_class_array[i].DisplayPlace} </div>`);
			if (settings.disp_descr)
				$(".grid-container").append(`<div class="grid-container-div"> ${event_class_array[i].DisplayDescription} </div>`);
		}
		$(".grid-container").css("background-color", settings.style_background);
		$(".grid-container>div").css("background-color", settings.style_foreground);
		$(".grid-container>div").css("color", settings.style_font);
	}

	class Event {
		constructor(event, todayDate) {
			try {
				this.event_data = {
					//taken from BD
					e_begin_time: event.event_begin_time, //19:00:00
					e_day_of_week: parseInt(event.event_day_of_week),
					e_description: event.event_description,
					e_name: event.event_name,
					e_place: event.event_place,
					e_url: event.event_url,
					e_id: event.id,
					e_show: event.event_show,

					//calculated
					e_now_date: todayDate,			// current (real) date 20.07.2019
					e_calculated_date: null, 		//new Date(),    // shud be calculated for day of week of event that has been got from DB
					e_begin_time_formated: 0,
					e_current_time_formated: 0,
					e_display_date: '',
					day_offset: 0,
					sortier: 0,
				}
				this.event_data.e_begin_time_formated = parseInt(this.event_data.e_day_of_week + this.event_data.e_begin_time[0] + this.event_data.e_begin_time[1] + this.event_data.e_begin_time[3] + this.event_data.e_begin_time[4], 10);
				this.event_data.e_current_time_formated = 10000 * this.event_data.e_now_date.getDay() + 100 * this.event_data.e_now_date.getHours() + this.event_data.e_now_date.getMinutes();

				this.event_data.day_offset = this.dayOffset(this.event_data.e_begin_time_formated, this.event_data.e_current_time_formated);

				this.event_data.e_calculated_date = this.addDay(this.event_data.e_now_date, this.event_data.day_offset);
				this.event_data.e_calculated_date.setHours(parseInt(this.event_data.e_begin_time[0] + this.event_data.e_begin_time[1]), parseInt(this.event_data.e_begin_time[3] + this.event_data.e_begin_time[4]), 0);
				this.event_data.sortier = this.event_data.e_calculated_date.getTime();
			}
			catch{
				console.log('event constructor error!');
				return false;
			}
			return true;
		}

		addDay(date, days) {
			let oldMS = date.getTime();
			let ofs = days * 24 * 60 * 60 * 1000;
			return new Date(oldMS + ofs);
		}

		dayOffset(ftRasp, ftNow) {
			let offs = ftRasp - ftNow;
			let fto = (ftRasp / 10000 | 0) - (ftNow / 10000 | 0);
			if (fto > 0)
				return fto;
			if (fto < 0)
				return fto + 7;
			if (offs < 0)
				return 7;
			if (offs > 0)
				return 0;
			return 9;
		}

		//for sorting of array of Event class instances function(a,b);
		get BegTimeForm() {
			return this.event_data.sortier;
		}

		get DisplayDescription() {
			return this.event_data.e_description;
		}

		get DisplayDate() {
			if (this.event_data.day_offset == 0)
				return "Сегодня";
			if (this.event_data.day_offset == 1)
				return "Завтра";
			return (`${this.event_data.e_calculated_date.getDate()}.${this.event_data.e_calculated_date.getMonth() + 1}.${this.event_data.e_calculated_date.getFullYear()}`);
		}	//today, tomorow, 12.10.2019 ....

		get DisplayTime() {
			return (this.event_data.e_begin_time.substr(0, 5));
		}

		DisplayName(settings_url) {
			if(settings_url)
				return `<a href = "${this.event_data.e_url}">${this.event_data.e_name}</a>`;

				return `${this.event_data.e_name}`;
		}

		get DisplayPlace() {
			return this.event_data.e_place;
		}

		get DisplayDescription() {
			return this.event_data.e_description;
		}
	}

})(jQuery);
