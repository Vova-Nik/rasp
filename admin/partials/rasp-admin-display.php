<?php

/**
 * Grab latest post title by an author!
 *
 * @param array $data Options for the function.
 * @return string|null Post title for the latest,  * or null if none.
 */
//echo 'C:\openserver\ospanel\domains\raspwp\wp-content\plugins\rasp\admin\partials\rasp-admin-display.php';



function display_frame()
{
	echo "<div class='container'>";
	echo "<h2>Its admin part of RASP</h2>";
	echo "<div  id='ddd'></div>";  // empty elem to contain event for data loaded
	echo "<div class='admin-grid-container' id='tab1'></div>";
	echo "</div>";
}


function rasp_restAPI_point(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	//$ans = $args[0];
	$action = $request['action'];
	//error_log('Request = ' . $request['action']);

	if($action == 'read')
		return  read_rasp_DB();
	if($action == 'save')
		return  save_rasp_DB();
}
function save_rasp_DB()
{
	return 'save_rasp_DB() patch';
}

function read_rasp_DB()
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);

	$results = $wpdb->get_results("SELECT * FROM $table_name");

	$to_page = json_encode($results, JSON_HEX_TAG);
	error_log($to_page);
	return  $to_page;

}

