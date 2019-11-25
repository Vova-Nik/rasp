
(function ($) {
	'use strict';

	/*let matrix = [

		//<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie/">Софиевская 10, "Дорога к дому"</a>
		//<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>
		//<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>
		//<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessashag/">Канатная 28</a>
		//<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessaeramiloserdiya/">Героев обороны Одессы 68 </a>
		//sun
		[1200, 1300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', '+38 0636251943 Алиса', 0],
		[1315, 1415, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 — Андрей (Кроха)', 0],
		[1900, 2000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0],
		//mon  
		[11200, 11300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', '+38 0636251943 Алиса', 0],
		[11800, 11900, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessaeramiloserdiya/">Героев обороны Одессы 68 </a>', '+38 067 7308475 Валерий (Полковник)', 0],
		[11900, 12000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 Андрей (Кроха)', 0],
		[11900, 12000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessashag/">Канатная 28 "Шаг" </a>', '+ 38 067 4597082 Валера', 0],
		[12015, 12115, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0],
		//tue
		[21200, 21300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', '+380 636251943 Алиса', 0],
		[21900, 22000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0],
		[21930, 22030, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 Андрей (Кроха)', 0],
		//wed
		[31200, 31300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', ' +380 636251943 Алиса', 0],
		[31800, 31900, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessaeramiloserdiya/">Героев обороны Одессы 68 </a>', '+38 0677308475 Валерий (Полковник)', 0],
		[31900, 32000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 Андрей (Кроха)', 0],
		[31900, 32000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessashag/">Канатная 28 "Шаг" </a>', '+ 38 067 4597082 Валера', 0],
		[32015, 32115, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0],
		//thu
		[41200, 41300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', '+38 0636251943 Алиса', 0],
		[41900, 42000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0],
		[41910, 42010, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 Андрей (Кроха)', 0],
		//fri
		[51200, 51300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', '+38 0636251943 Алиса', 0],
		[51800, 51900, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessaeramiloserdiya/">Героев обороны Одессы 68 </a>', '+38 0677308475 Валерий (Полковник)', 0],
		[51900, 52000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 Андрей (Кроха)', 0],
		[51900, 52000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessashag/">Канатная 28 "Шаг" </a>', '+ 38 067 4597082 Валера', 0],
		[52015, 52115, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0],
		//sat
		[61030, 61130, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aaodessakontakt/">Ицхака Рабина 7</a>', '+38 0730294601 Андрей (Кроха)', 0],
		[61200, 61300, '<a href="http://www.aa-odessa.ho.ua/aaodessarassvet/">Ицхака рабина 7 (РЦ Ступени 2 эт)</a>', '+38 0636251943 Алиса', 0],
		[61900, 62000, '<a href="http://www.aa-odessa.ho.ua/raspisanieaaodessa/aavozrogdenie">Канатная 28 "Софиевская"</a>', '+38 0634941149 Владимир (Связист)', 0]
	];
	*/

	function rasp_ready() {
		/*Getting data from PHP thru DOM*/
		let events_list_array = new Array();
		let events_list = document.getElementsByClassName("event_data_element");
		for (let i = 0; i < events_list.length; i++) {
			events_list_array[i] = JSON.parse(events_list[i].textContent);
		}
		events_list = null;
		/**------------------------------------------------------- */

		//const today = new Date();
		var today = new Date('20 nov 2019 19:00:00');
		console.log("Sivodni " + today);
		let current_moment = today.getDay() * 10000 + today.getHours() * 100 + today.getMinutes();
		console.log("currentMoment " + current_moment);

		/*
		* calculating string value of type week(0...6)+hours(0...23)+minutes(0...59)mondey 19:00:00 -> 11900
		* and insertitg to evry event object as "event_begin_time_formated"
		* if "event_begin_time_formated" less then current -> event_begin_time_formated moving  to next week (+70000)
		*/
		events_list_array.forEach(function (element) {
			let beg_time_v = element.event_begin_time;
			beg_time_v = (element.event_day_of_week + beg_time_v[0] + beg_time_v[1] + beg_time_v[3] + beg_time_v[4]);
			let beg_time_v_int = parseInt(beg_time_v, 10);
			if (beg_time_v_int <= current_moment)
				beg_time_v_int = beg_time_v_int + 70000; 	//to next week
			element.event_begin_time_formated = beg_time_v_int;
		});
		//console.log(events_list_array);
		/*---------------------------------------------------------------------------------------------------*/


		/*sorting array by "event_begin_time_formated"*/
		function arr_comp(a, b) {
			if (a.event_begin_time_formated > b.event_begin_time_formated)
				return 1;
			if (a.event_begin_time_formated < b.event_begin_time_formated)
				return -1;
			return 0;
		}

		events_list_array.sort(arr_comp);

		console.log(events_list_array);
		/*-----------------------------------------------------------------------------------------------------*/




		// var aa = today.getDate() + '.0' + (today.getMonth() + 1) + '.' + today.getFullYear();
		// if (today.getMonth() >= 9)
		let current_full_date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear();

		/* Phrase before table type Сегодня суббота 23.11.2019*/
		let dayMatrix = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
		let sDayOfweek = dayMatrix[today.getDay()];
		document.querySelector(".before-grid").innerHTML += ' ' + sDayOfweek + ' ' + current_full_date ;  // + ' ' + today.getHours() +':' + today.getMinutes();

					let today_day_of_week = today.getDay();
					//let tomorrow_day_of_week = today_day_of_week +1;

					let text_for_col0 = "сегодня";
					if((today_day_of_week + 1) == parseInt(events_list_array[0].event_day_of_week))
						text_for_col0 = "завтра";
					if((today_day_of_week + 1) < events_list_array[0].event_day_of_week)
						text_for_col0 = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear();
					document.querySelector('#item00').innerHTML = text_for_col0;

					document.getElementById('item01').innerHTML = events_list_array[0].event_begin_time;
					document.getElementById('item02').innerHTML = events_list_array[0].event_name;
					document.getElementById('item03').innerHTML = events_list_array[0].event_place;


					text_for_col0 = "сегодня";
					if((today_day_of_week + 1) == parseInt(events_list_array[1].event_day_of_week))
						text_for_col0 = "завтра";
					if((today_day_of_week + 1) < parseInt(events_list_array[1].event_day_of_week));
						text_for_col0 = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear();
					document.querySelector('#item10').innerHTML = text_for_col0;

					document.getElementById('item11').innerHTML = events_list_array[1].event_begin_time;
					document.getElementById('item12').innerHTML = events_list_array[1].event_name;
					document.getElementById('item13').innerHTML = events_list_array[1].event_place;

					text_for_col0 = "сегодня";
					if((today_day_of_week + 1) == parseInt(events_list_array[2].event_day_of_week))
						text_for_col0 = "завтра";
					if((today_day_of_week + 1) < parseInt(events_list_array[2].event_day_of_week))
						text_for_col0 = today.getDate() + '.' + today.getMonth() + '.' + today.getFullYear();
					document.querySelector('#item20').innerHTML = text_for_col0;

					document.getElementById('item21').innerHTML = events_list_array[2].event_begin_time;
					document.getElementById('item22').innerHTML = events_list_array[2].event_name;
					document.getElementById('item23').innerHTML = events_list_array[2].event_place;

	}
	document.addEventListener("DOMContentLoaded", rasp_ready);
	//Видеокарта AMD Radeon HD8490 1Gb GDDR3 DVI, DisplayPort OEM  #300121042



})(jQuery);

