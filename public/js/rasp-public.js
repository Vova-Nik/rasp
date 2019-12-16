
(function ($) {
	'use strict';

	/*------------------------------------------------------------------------------------------------*/
	document.addEventListener("DOMContentLoaded", rasp_ready);
	/*------------------------------------------------------------------------------------------------*/


	function rasp_ready() {

		/* Getting data from PHP thrue DOM */
		// let events_list_array = new Array();
		let events_list_array = new Array();
		let events_list = document.getElementsByClassName("event_data_element");
		
		for (let i = 0; i < events_list.length; i++) {
			events_list_array[i] = JSON.parse(events_list[i].textContent);
		//	console.log(events_list_array[i]);
		}
		events_list = null;
		/**------------------------------------------------------- */

		const today = new Date();
		//var today = new Date('20 nov 2019 19:00:00');
		console.log("Sivodni " + today);
		let current_moment = today.getDay() * 10000 + today.getHours() * 100 + today.getMinutes();

		/*
		* calculating string value of type week(0...6)+hours(0...23)+minutes(0...59)mondey 19:00:00 -> 11900
		* and insertitg to evry event object as "event_begin_time_formated"
		* if "event_begin_time_formated" less then current -> event_begin_time_formated moving  to next week (+70000)
		*/

		let event_class_array = new Array();

		events_list_array.forEach(function (element, num) {
			event_class_array[num] = new Event(element);
			//console.log (event_class_array[num].BegTimeForm);
		});
		console.log(event_class_array);

		/*---------------------------------------------------------------------------------------------------*/
		event_class_array.sort(arr_compare);

		/*sorting array by "event_begin_time_formated"*/
		function arr_compare(a, b) {
			if (a.BegTimeForm > b.eBegTimeForm)
				return 1;
			if (a.BegTimeForm < b.BegTimeForm)
				return -1;
			return 0;
		}

		//event_class_arrayy.sort(arr_comp);
		//console.log(events_list_array);
		/*-----------------------------------------------------------------------------------------------------*/
		// var aa = today.getDate() + '.0' + (today.getMonth() + 1) + '.' + today.getFullYear();
		// if (today.getMonth() >= 9)
		let current_full_date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

		/* Phrase before table type Сегодня суббота 23.11.2019*/
		let dayMatrix = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		let sDayOfweek = dayMatrix[today.getDay()];
		document.querySelector(".before-grid").innerHTML += ' ' + sDayOfweek + ' ' + current_full_date;

		let today_day_of_week = today.getDay();
		//let tomorrow_day_of_week = today_day_of_week +1;
		console.log(event_class_array[0].DisplayDate);

		document.querySelector('#item00').innerHTML = event_class_array[0].DisplayDate;
		document.getElementById('item01').innerHTML = event_class_array[0].DisplayTime;
		document.getElementById('item02').innerHTML = event_class_array[0].DisplayName;
		document.getElementById('item03').innerHTML = event_class_array[0].DisplayPlace;

		document.querySelector('#item10').innerHTML = event_class_array[1].DisplayDate;
		document.getElementById('item11').innerHTML = event_class_array[1].DisplayTime;
		document.getElementById('item12').innerHTML = event_class_array[1].DisplayName;
		document.getElementById('item13').innerHTML = event_class_array[1].DisplayPlace;

		document.querySelector('#item20').innerHTML = event_class_array[2].DisplayDate;
		document.getElementById('item21').innerHTML = event_class_array[2].DisplayTime;
		document.getElementById('item22').innerHTML = event_class_array[2].DisplayName;
		document.getElementById('item23').innerHTML = event_class_array[2].DisplayPlace;
	}



	class Event {

		constructor(event) {
			try {
				this.event_data = {

					//taken from BD
					e_begin_time: event.event_begin_time, //19:00:00
					e_day_of_week: parseInt(event.event_day_of_week),
					e_description: event.event_description,
					e_name: event.event_name,
					e_place: event.event_place,
					e_description: event.event_description,
					e_url: event.event_url,
					e_id: event.id,

					//calculated
					e_now_date: new Date(),			// current (real) date 20.07.2019
					e_calculated_date: new Date(),    // shud be calculated fjr day of week of event hb got from DB
					e_begin_time_formated: 0,
					e_current_time_formated: 0,
					e_display_date: '',
				}
				this.event_data.e_begin_time_formated = parseInt(this.event_data.e_day_of_week + this.event_data.e_begin_time[0] + this.event_data.e_begin_time[1] + this.event_data.e_begin_time[3] + this.event_data.e_begin_time[4], 10);
				this.event_data.e_current_time_formated = 10000 * this.event_data.e_now_date.getDay() + 100 * this.event_data.e_now_date.getHours() + this.event_data.e_now_date.getMinutes();
				this.e_offset = this.event_data.e_begin_time_formated - this.event_data.e_current_time_formated;
				if (this.e_offset > 0)
					this.event_data.e_calculated_date.setDate(this.event_data.e_now_date.getDate() + this.event_data.e_day_of_week - this.event_data.e_now_date.getDay());
				if (this.e_offset < 0)
					this.event_data.e_calculated_date.setDate(this.event_data.e_now_date.getDate() + this.event_data.e_day_of_week - this.event_data.e_now_date.getDay() + 7);
			}
			catch{
				console.log('event constructor error!');
				return false;
			}
			return true;
		}

		//for sorting of array of Event class instances function(a,b);
		get BegTimeForm() {
			return this.event_data.e_calculated_date;
		}

		get DisplayDate() {
			if (this.event_data.e_now_date.getDate() == this.event_data.e_calculated_date.getDate())
				return 'Сегодня';
			if ((this.event_data.e_calculated_date.getDate() - 1) == this.event_data.e_now_date.getDate())
				return 'Завтра';
			return (`${this.event_data.e_calculated_date.getDate()}.${this.event_data.e_calculated_date.getMonth() + 1}.${this.event_data.e_calculated_date.getFullYear()}`);
		}

		get DisplayTime() {
			return (this.event_data.e_begin_time.substr(0, 5));
		}

		get DisplayName() {
			return `<a href = "${this.event_data.e_url}">${this.event_data.e_name}</a>`;
		}
		
		get DisplayPlace() {
			return this.event_data.e_place;
		}

		get DisplayDescription() {
			return this.event_data.e_description;
		}
	}

})(jQuery);
