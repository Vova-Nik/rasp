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
	$handler = fopen("wp-content/plugins/rasp/rasp_data.txt", 'w');
	$rasp = ($request["raspMod"]);

	$to_file = json_encode($rasp, JSON_HEX_TAG);
	error_log($to_file);
	fputs($handler, $to_file);
	fclose($handler);
	return;
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
		// error_log(json_encode($rasp));
	 	foreach ($rasp as  $value) {
			//$to_page = json_encode($results, JSON_HEX_TAG);
			fputcsv($handler, $value);
		 }
		fclose($handler);
		return;
	}

	if ($action == 'load') {
		
			if (($handler = fopen("wp-content/plugins/rasp/rasp_data.csv", "r")) !== FALSE) {

					$arr = array();
					//$data = fread($handler,filesize("wp-content/plugins/rasp/rasp_data.txt"));
					//while(! feof($handler)){
					while (($str = fgetcsv($handler)) !== FALSE) {
						$str = fgetcsv($handler);
						//array_push($arr, (json_encode($str, JSON_HEX_TAG)));
						error_log(json_encode($str, JSON_HEX_TAG));
					}
					fclose($handler);
					error_log(json_encode($arr, JSON_HEX_TAG));

		}
	}
}
