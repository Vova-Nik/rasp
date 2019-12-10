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
	//error_log($to_page);
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

	if (is_numeric($request['id'])) { 
		$wpdb->update( 'wp_rasp_rasp', //$data, $where, $data_format=null, $formatwhere=null );
			array( 
				'event_begin_time' => $request['event_begin_time'], //s
				'event_day_of_week' => $request['event_day_of_week'], //d
				'event_name' => $request['event_name'], //s
				'event_place' => $request['event_place'], //s
				'event_description' => $request['event_description'], //s
				'event_url' => $request['event_url'], //s
				'event_show' => $request['event_show'] //d
			),
			array( 'ID' => $request['id'] ),
			array( '%s', '%d', '%s', '%s', '%s', '%s', '%d' ),
			array( '%d' )
		);
		error_log('save in work');
	} 
	else {
		$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_begin_time' => $request['event_begin_time'], //s
				'event_day_of_week' => $request['event_day_of_week'], //d
				'event_name' => $request['event_name'], //s
				'event_place' => $request['event_place'], //s
				'event_description' => $request['event_description'], //s
				'event_url' => $request['event_url'], //s
				'event_show' => $request['event_show'] //d
			),
			array('%s', '%d', '%s', '%s', '%s', '%s', '%d')
		);
		error_log('copy (insert)  in work');
	}

	
	error_log($request['id']);
	error_log($request['event_begin_time']);
	error_log($request['event_day_of_week']);
	error_log($request['event_name']);
	error_log($request['event_place']);
	error_log($request['event_description']);
	error_log($request['event_url']);
	error_log($request['event_show']);
	//error_log('Request = ' . json_decode( $request));
	return 'save_rasp_DB() processed';
}

//require_once plugin_dir_path(dirname(__FILE__)) . '/admin/partials/rasp-admin-display.php';

//require_once( wp-includes/rest-api/class-wp-rest-request.php);
