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
	//$ans = $args[0];
	$action = $request['action'];
	//error_log('Request = ' . $request['action']);
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);

	$results = $wpdb->get_results("SELECT * FROM $table_name");
	$to_page = json_encode($results, JSON_HEX_TAG);
	error_log('PHP Read');
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
	error_log('del function in rasp-admin-display.php  ' . $id);
	if (is_numeric($id)) {
		$wpdb->delete( 'wp_rasp_rasp', array( 'id' => $id ) );
	}
}

function rasp_restAPI_point_write(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	//$ans = $args[0];
	// $action = $request['action'];
	$vvv = $request->get_body();
	error_log('copy1 (insert)  in work. Request = '. $vvv);
	if (is_numeric($request['id'])) { 
		$wpdb->update( 'wp_rasp_rasp', //$data, $where, $data_format=null, $formatwhere=null );
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
			array( 'ID' => $request['id'] ),
			array( '%s', '%d', '%s', '%s', '%s', '%s', '%d', '%d' ),
			array( '%d' )
		);
		error_log('save in work');
	} 
	else {
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
		
	}
	// error_log($request['id']);
	// error_log($request['event_begin_time']);

	$current_unic = $request['unicId'];
	$sql = "SELECT * FROM $table_name WHERE unic = $current_unic";
	//esc_sql($sql);
	$results = $wpdb->get_results($sql);
	error_log("Write results  " . $results[0]->id);
	return $results[0]->id;
}

function rasp_restAPI_point_file(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	$action = $request['act'];
	error_log('file function  ' . $id);
	// if (is_numeric($id)) {
	// 	$wpdb->delete( 'wp_rasp_rasp', array( 'id' => $id ) );
	// }
}

