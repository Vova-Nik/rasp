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
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	$results = $wpdb->get_results("SELECT * FROM $table_name");
	$to_page = json_encode($results, JSON_HEX_TAG);
	// error_log('PHP Read');
	return  $to_page;
}

function rasp_restAPI_point_del(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	$id = $request['id'];
	// error_log('del function in rasp-admin-display.php  ' . $id);
	if (is_numeric($id)) {
		$wpdb->delete('wp_rasp_rasp', array('id' => $id));
	}
}

function rasp_restAPI_point_write(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	/* If there is id - change this record in DB, if no create new record*/
	if (is_numeric($request['id'])) {
		$wpdb->update(
			'wp_rasp_rasp', //$data, $where, $data_format=null, $formatwhere=null );
			array(
				'event_begin_time' => $request['event_begin_time'], //s
				'event_day_of_week' => $request['event_day_of_week'], //d
				'event_name' => $request['event_name'], //s
				'event_place' => $request['event_place'], //s
				'event_description' => $request['event_description'], //s
				'event_url' => $request['event_url'], //s
				'event_show' => $request['event_show'], //d
				'unic' => $request['unicId'] //d
			),
			array('ID' => $request['id']),
			array('%s', '%d', '%s', '%s', '%s', '%s', '%d', '%d'),
			array('%d')
		);
		error_log('Update (Edit)');
	} else {
		$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_begin_time' => $request['event_begin_time'], 	//s
				'event_day_of_week' => $request['event_day_of_week'], 	//d
				'event_name' => $request['event_name'],		//s
				'event_place' => $request['event_place'],	 //s
				'event_description' => $request['event_description'], 	//s
				'event_url' => $request['event_url'], 	//s
				'event_show' => $request['event_show'], 	//d
				'unic' => $request['unicId'] //d
			),
			array('%s', '%d', '%s', '%s', '%s', '%s', '%d', '%d')
		);
		error_log('inserted (copy)');
	}
	$current_unic = $request['unicId'];
	$sql = "SELECT * FROM $table_name WHERE unic = $current_unic";
	esc_sql($sql);
	$results = $wpdb->get_results($sql);
	$to_page = json_encode($results, JSON_HEX_TAG);
	return $to_page;
}


function rasp_restAPI_point_file(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	$action = $request['action'];   //load or save


	/************************Write file**************************************** */
	if ($action == 'save') {

		$results = $wpdb->get_results("SELECT * FROM $table_name");
		//	 $to_page = json_encode($results, JSON_HEX_TAG);
		$ToFile = array();
		foreach ($results as $key => $value) {
			$ToFile[$key] = (array) $value; //		error_log('Field =  ' .);
		}

		$handler = fopen("wp-content/plugins/rasp/rasp_data.txt", 'w');
		error_log('File handler for  sawing =  ' . $handler);
		$to_page = json_encode($results, JSON_HEX_TAG);
		fwrite($handler, $to_page);
		fclose($handler);
		return;
	}

	if ($action == 'load') {
		$handler = fopen("wp-content/plugins/rasp/rasp_data.txt", 'r');
			if (($handler = fopen("wp-content/plugins/rasp/rasp_data.txt", "r")) !== FALSE) {
			$results = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);
			foreach ($results as $field)
			{
				//error_log(json_encode($field, JSON_HEX_TAG));
				$id = $field['id'];
				error_log($id);
				$wpdb->delete( 'wp_rasp_rasp', array( 'id' => $id), array('%d'));
			}
			$data = fread($handler,filesize("wp-content/plugins/rasp/rasp_data.txt"));
			fclose($handler);
			// error_log('Data loaded =  ' . $data);
			$loadedFileObj = json_decode($data);
			foreach($loadedFileObj as $ind => $rec)
			{
				//error_log(json_encode($rec, JSON_HEX_TAG));
				$rec_array = (array)$rec;
				$wpdb->insert(
					'wp_rasp_rasp',
					array(
						'event_begin_time' => $rec_array['event_begin_time'],
						'event_day_of_week' => $rec_array['event_day_of_week'], 	//d
						'event_name' => $rec_array['event_name'],		//s
						'event_place' => $rec_array['event_place'],	 //s
						'event_description' => $rec_array['event_description'], 	//s
						'event_url' => $rec_array['event_url'], 	//s
						'event_show' => $rec_array['event_show'], 	//d
						'unic' => $rec_array['unic'] //d
					),
					array('%s', '%d', '%s', '%s', '%s', '%s', '%d', '%d')
				);
			}
	}
}
}
