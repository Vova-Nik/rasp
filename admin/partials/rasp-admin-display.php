<?php

/**
 * Grab latest post title by an author!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */

function display_frame()
{
	echo "<div class='container'>";
	echo "<h2>Its admin part of RASP</h2>";
	echo "<div class='admin-grid-container' id='tab1'></div>";
	echo "<div class='aditional' id='tab1'></div>";
	echo "</div>";
}

/***************************organized in C:\openserver\ospanel\domains\raspwp\wp-content\plugins\rasp\admin\class-rasp-admin.php */
function rasp_restAPI_point_read(WP_REST_Request $request)
{
	$handler = fopen("wp-content/plugins/rasp/rasp_data.txt", 'r');
	if (($handler = fopen("wp-content/plugins/rasp/rasp_data.txt", "r")) !== FALSE) {
		$data = fread($handler,filesize("wp-content/plugins/rasp/rasp_data.txt"));
		fclose($handler);
		$loadedFileObj = json_decode($data);
		error_log('PHP Read ' );
		return  $loadedFileObj;
	}
	return false;
}

function rasp_restAPI_point_write(WP_REST_Request $request)
{
	error_log('write rasp request');
	//"num_of_rows":3,"srv_ans":0,"request_for_server":"write","guid":52,"is_activated":false
	$rasp = (array)($request['raspMod']);
  
	$handler = fopen("wp-content/plugins/rasp/rasp_data.txt", 'w');
	$cntr=0;
	foreach($rasp as $rr){
		//error_log(implode("---", $rr));
		$cntr++;
	}
	$to_file = json_encode($rasp, JSON_HEX_TAG);
	fputs($handler, $to_file);
	fclose($handler);

	class Settings{
		public $rasp_num_of_rows = 5;
		public $rasp_adaptive = false;
		public $rasp_sort_col = "sortByDay";
	}

	$settings = new Settings();
	$settings->rasp_num_of_rows = $request['num_of_rows'];
	$settings->rasp_adaptive = $request['adaptive'];
	$settings->rasp_sort_col = $request['sort_col'];

	error_log("style adaptive " . json_encode($settings));
	$handler = fopen("wp-content/plugins/rasp/rasp_config.txt", 'w');
	fputs($handler, json_encode($settings));
	fclose($handler);

	return $cntr;
}

function rasp_restAPI_point_del(WP_REST_Request $request)
{
	// global $wpdb;
	// $table_name = $wpdb->prefix . 'rasp_rasp';
	// $charset_collate = $wpdb->get_charset_collate();
	// if (!empty($wpdb->error))
	// 	wp_die($wpdb->error);
	// $id = $request['id'];
	// // error_log('del function in rasp-admin-display.php  ' . $id);
	// if (is_numeric($id)) {
	// 	$wpdb->delete('wp_rasp_rasp', array('id' => $id));
	// }
	error_log("rasp_restAPI_point_del");
}

function rasp_restAPI_point_file(WP_REST_Request $request)
{
	$action = $request['request_for_server'];   //load or save
	error_log($action );
	/************************Write file**************************************** */
	if ($action == 'save') {
		$handler = fopen("wp-content/plugins/rasp/rasp_data.csv", 'w');
		$rasp = (array)($request['raspMod']);
		// error_log(gettype($rasp));
		error_log(json_encode($rasp));
	 	foreach ($rasp as  $value) {
			//$to_page = json_encode($results, JSON_HEX_TAG);
			fputcsv($handler, $value);
		 }
		fclose($handler);
		return;
	}

	if ($action == 'load') {
		
			if (($handler = fopen("wp-content/plugins/rasp/rasp_data.csv", "r")) !== FALSE) {

					//$eventArr = array();
					class EventObj{
						public $event_begin_time;
						public $event_category;
						public $event_day_of_week;
						public $event_description;
						public $event_end_time;
						public $event_name;
						public $event_place;
						public $event_show;
						public $event_url;
						public $saved;
						public $date;
						public $num_in_rasp_model;
						public $unicId;

						// function toString(){
						// 	return 	"-"	. " event_begin_time: " . $this->event_begin_time . " event_day_of_week: " . $this->event_day_of_week . " event_description: " . $this->event_description	. " event_name: " . $this->event_name;
						// }
					}

					//while (($str = fgetcsv($handler)) !== FALSE) {
				
					$raspArr = array();
					while(! feof($handler)){
					
						$str = fgetcsv($handler);
							$eventObj = new EventObj;
							$eventObj->event_begin_time = $str[0];
							$eventObj->event_category = $str[1];
							$eventObj->event_day_of_week = $str[2];
							$eventObj->event_description = $str[3];
							$eventObj->event_end_time = $str[4];
							$eventObj->event_name = $str[5];
							$eventObj->event_place = $str[6];
							$eventObj->event_show = $str[7];
							$eventObj->event_url = $str[8];
							$eventObj->saved = $str[9];
							$eventObj->date = $str[10];
							$eventObj->num_in_rasp_model = $str[11];
							$eventObj->unicId = $str[12];
						//error_log(json_encode($eventObj, JSON_HEX_TAG));
						//array_push($raspArr, $eventObj);
						//error_log($eventObj -> toString());
						$raspArr[] =  $eventObj;
						//error_log(implode(" --- ", $eventObj));
						//error_log(json_encode($eventObj, JSON_HEX_TAG));
						//error_log($eventObj->toString());
						
					}
					fclose($handler);
					array_pop($raspArr);

					//error_log(implode(" --- ", $raspArr));
					//error_log(json_encode($raspArr, JSON_HEX_TAG));
					$handler = fopen("wp-content/plugins/rasp/rasp_data.txt", 'w');
					//$rasp = ($request["raspMod"]);
					$to_file = json_encode($raspArr, JSON_HEX_TAG);
					error_log($to_file);
					fputs($handler, $to_file);
					fclose($handler);
					
		}
	}
}
