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
	//global $wpdb;
	//$table_name = $wpdb->prefix . 'rasp_rasp';
	//$charset_collate = $wpdb->get_charset_collate();
	//if (!empty($wpdb->error))
	//	wp_die($wpdb->error);
	//$ans = $args[0];
	//$action = $request['action'];
	//error_log('Request = ' . $request['action']);
	global $wpdb;
	$table_name = $wpdb->prefix . 'rasp_rasp';
	$charset_collate = $wpdb->get_charset_collate();
	if (!empty($wpdb->error))
		wp_die($wpdb->error);

	$results = $wpdb->get_results("SELECT * FROM $table_name");
	$to_page = json_encode($results, JSON_HEX_TAG);
	error_log('PHP Read');
	error_log($to_page);
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
	error_log('del function in rasp-admin-display.php  id = ' . $id);
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

function rasp_restAPI_point_file(WP_REST_Request $request)
{
	$action = $request['request_for_server'];   //load or save
	error_log($action );
	/************************Write file**************************************** */
	if ($action == 'save') {
        	global $wpdb;
        	$table_name = $wpdb->prefix . 'rasp_rasp';
        	$charset_collate = $wpdb->get_charset_collate();
        	if (!empty($wpdb->error))
        		wp_die($wpdb->error);

        	$results = $wpdb->get_results("SELECT * FROM $table_name");
        	//$to_file = json_encode($results, JSON_HEX_TAG);
        	error_log('PHP Read');
        	//error_log($to_file);

    		$handler = fopen("wp-content/plugins/rasp/rasp_data.csv", 'w');
    		$keyArray = array();
    		$record = $results[0];
   		   foreach($record as $key=>$cell){
	               array_push($keyArray, strval($key));
    		     }
        	 error_log(json_encode($record, JSON_HEX_TAG));
            fputcsv($handler, $keyArray);

    		$recordArray = array();
    		foreach($results as $record){
    		   foreach($record as $key=>$cell){
   		            array_push($recordArray, strval($cell));
    		     }
    	    	 error_log(json_encode($record, JSON_HEX_TAG));
		         fputcsv($handler, $recordArray);
			}
		    fclose($handler);
		return;
	}

	if ($action == 'load') {
			if (($handler = fopen("wp-content/plugins/rasp/rasp_data.csv", "r")) !== FALSE) {
				global $wpdb;
            	//$table_name = $wpdb->prefix . 'rasp_rasp';
            	$table_name = 'wp_rasp_rasp';
            	$charset_collate = $wpdb->get_charset_collate();
            	if (!empty($wpdb->error))
            		wp_die($wpdb->error);
                $delete = $wpdb->query("TRUNCATE TABLE $table_name");
                $recordKeys = fgetcsv($handler);
                error_log(json_encode($recordKeys, JSON_HEX_TAG));
                error_log('File input to DB');

                $requestArray = array();
                $recordCounter = 0;
				while( !feof($handler )){
    		        	    $recordsArray[$recordCounter] = fgetcsv($handler);
    		        	  //  error_log(json_encode($recordsArray, JSON_HEX_TAG));
    		        	   // error_log($recordsArray[$recordCounter][1]);
    		        	    $recordCounter ++;
    		        	};

    		        	error_log(json_encode($recordsArray, JSON_HEX_TAG));
                              $i=0;
                              $requestArray["event_begin_time"] = $recordsArray[$i][1];
                              $requestArray["event_end_time"] = $recordsArray[$i][2];
                              $requestArray["event_day_of_week"] = intval($recordsArray[$i][3]);
                              $requestArray["event_name"] = $recordsArray[$i][4];
                              $requestArray["event_place"] =  $recordsArray[$i][5];
                              $requestArray["event_description"] = $recordsArray[$i][6];
                              $requestArray["event_url"] = $recordsArray[$i][7];
                              $requestArray["event_category"] = intval($recordsArray[$i][8]);
                              $requestArray["event_show"] = intval($recordsArray[$i][9]);
                              $requestArray["unic"] = intval($recordsArray[$i][10]);
                 //       $wpdb->insert(
                 //          $table_name,
                  //         $requestArray,
                 //          array( '%s', '%s', '%d', '%s', '%s', '%s', '%s', '%d', '%d', '%d'  )
                 //      );

					fclose($handler);
					return;
		}
	}
}
 //       1     2     3    4     5      6     7     8    9     10
