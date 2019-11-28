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
	echo "<h2>Its admin part of RASP</h2>";
	echo "<div class='admin-grid-container' id='tab1'></div>";
	//error_log('display_frame');
}


// function rasp_restAPI_point($data)
// {
// 	global $wpdb;
// 	$table_name = $wpdb->prefix . 'rasp_rasp';
// 	$charset_collate = $wpdb->get_charset_collate();
// 	if (!empty($wpdb->error))
// 		wp_die($wpdb->error);
// 	$results = $wpdb->get_results("SELECT * FROM $table_name");
// 	$to_page = '';
// 	foreach ($results as $record) {
// 		$to_page .= (string) json_encode($record, JSON_HEX_TAG);
// 	}
// 	//JSON_UNESCAPED_SLASHES (integer) Не экранировать /. Доступно с PHP 5.4.0.
// 	//JSON_HEX_TAG (integer) Все < и > кодируются в \u003C и \u003E. Доступно с PHP 5.3.0.
// 	return  $to_page;
// }

function rasp_restAPI_point(WP_REST_Request $request)
{
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);
	//$ans = $args[0];
	$param = $request['name'];
	error_log($param . 'vvv');
	return  $param;
}

// function rasp_restAPI_point()
// {
// 	global $wpdb;
// 	$table_name = $wpdb->prefix . 'rasp_rasp';
// 	$charset_collate = $wpdb->get_charset_collate();
// 	if (!empty($wpdb->error))
// 		wp_die($wpdb->error);
// 	//$ans = $args[0];
// 	//$param = $request['name'];
// 	//error_log($param . 'vvv');
// 	return  'vvv';
// }