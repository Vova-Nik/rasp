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
    global $wpdb;
    $table_name = $wpdb->prefix . 'rasp_rasp';
    $charset_collate = $wpdb->get_charset_collate();
    if (!empty($wpdb->error)) {
        wp_die($wpdb->error);
    }

    $results = $wpdb->get_results("SELECT * FROM $table_name");
    $to_page = json_encode($results, JSON_HEX_TAG);
    error_log('PHP Read');
    error_log($to_page);
    return $to_page;
}

function rasp_restAPI_point_del(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'rasp_rasp';
    $charset_collate = $wpdb->get_charset_collate();
    if (!empty($wpdb->error)) {
        wp_die($wpdb->error);
    }

    $id = $request['id'];
    error_log('del function in rasp-admin-display.php  id = ' . $id);
    if (is_numeric($id)) {
        $wpdb->delete('wp_rasp_rasp', array('id' => $id));
    }
}

function rasp_restAPI_point_write(WP_REST_Request $request)
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'rasp_rasp';
    $charset_collate = $wpdb->get_charset_collate();
    if (!empty($wpdb->error)) {
        wp_die($wpdb->error);
    }

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
            ),
            array('ID' => $request['id']),
            array('%s', '%d', '%s', '%s', '%s', '%s', '%d'),
            array('%d')
        );
        error_log('save in work');
    } else {
        $wpdb->insert(
            'wp_rasp_rasp',
            array(
                'event_begin_time' => $request['event_begin_time'], //s
                'event_day_of_week' => $request['event_day_of_week'], //d
                'event_name' => $request['event_name'], //s
                'event_place' => $request['event_place'], //s
                'event_description' => $request['event_description'], //s
                'event_url' => $request['event_url'], //s
                'event_show' => $request['event_show'], //d
            ),
            array('%s', '%d', '%s', '%s', '%s', '%s', '%d')
        );
        error_log('copy (insert)  in work');
    }

    // error_log($request['id']);
    // error_log($request['event_begin_time']);
    // error_log($request['event_day_of_week']);
    // error_log($request['event_name']);
    // error_log($request['event_place']);
    // error_log($request['event_description']);
    // error_log($request['event_url']);
    // error_log($request['event_show']);
    //error_log('Request = ' . json_decode( $request));
    return 'save_rasp_DB() processed';
}

function rasp_restAPI_point_file(WP_REST_Request $request)
{
    $action = $request['request_for_server']; //load or save
    error_log('Request Action - ' . $action);
    /************************Write file**************************************** */
    if ($action == 'save') {
        global $wpdb;
        $table_name = $wpdb->prefix . 'rasp_rasp';
        $charset_collate = $wpdb->get_charset_collate();
        if (!empty($wpdb->error)) {
            wp_die($wpdb->error);
        }

        $results = $wpdb->get_results("SELECT * FROM $table_name");
        if (count($results) < 1) {
            return 'false';
        }

        error_log('PHP saving from DB to csv');

        $handler = fopen("wp-content/plugins/rasp/rasp_data.csv", 'w');
        if (!$handler) {
            return false;
        }
        $headers = array();
        foreach ($results[0] as $key => $item) {
            array_push($headers, $key);
        }
        fputcsv($handler, $headers); //header
        $row = array();
        foreach ($results as $i => $record) {
            $rows[$i] = array();
            foreach ($record as $key => $item) {
                array_push($rows[$i], $item);
            }
            fputcsv($handler, $rows[$i]);
        }
        fclose($handler);
        return true;
    }

    if ($action == 'load') {
        if (($handler = fopen("wp-content/plugins/rasp/rasp_data.csv", "r")) !== false) {
            global $wpdb;
            $table_name = $wpdb->prefix . 'rasp_rasp';

            $charset_collate = $wpdb->get_charset_collate();
            if (!empty($wpdb->error)) {
                wp_die($wpdb->error);
            }

            $handler = fopen("wp-content/plugins/rasp/rasp_data.csv", 'r');
            if (!$handler) {
                return false;
            }
            $wpdb->query("TRUNCATE TABLE $table_name");

            error_log('File input to DB');
            $recordKeys = fgetcsv($handler);

            $recordCounter = 0;

            while (!feof($handler)) {
                $recordsArray[$recordCounter] = fgetcsv($handler);
                $recordCounter++;
            }

            error_log('$RecordsArray = ' . json_encode($recordsArray, JSON_HEX_TAG));
            $requestArray = array();
            $requestFormatArray = array();
            array_pop($recordsArray); //removes last record ('false' from fread);

            foreach ($recordsArray as $num => $record) {
                foreach ((array) $record as $colNum => $colValue) {
                    $requestArray[$num][$recordKeys[$colNum]] = $colValue;
                }
                array_shift($requestArray[$num]);
            }

            foreach ($requestArray as $rrr) {
                error_log(json_encode($rrr, JSON_HEX_TAG));
            }

            foreach ($requestArray[0] as $item) {
                if (is_numeric($item)) {
                    array_push($requestFormatArray, '%d');
                } else {
                    array_push($requestFormatArray, '%s');
                }
            }

            foreach ($requestArray as $req) {
                $wpdb->insert(
                    $table_name,
                    $req,
                    $requestFormatArray
                );
            }

            fclose($handler);
            return true;
        }
    }

}

function rasp_restAPI_point_settings(WP_REST_Request $request)
{
    $action = $request['action'];
    $settings = $request['settings'];
    myLog($settings);

    global $wpdb;
    $table_name = $wpdb->prefix . 'options';
    $charset_collate = $wpdb->get_charset_collate();

    if ($action == 'save_settings') {
        $wpdb->update(
            $table_name,
            array(
                'option_value' => $settings,
            ),
            array('option_name' => "rasp_plugin_data"),
            array('%s'),
            array('%s')
        );
        return;
    }

    if ($action == 'load_settings') {
        $settings = new stdClass();
        $set = $wpdb->get_results("SELECT * FROM $table_name WHERE option_name ='rasp_plugin_data'");
         if(sizeof($set)>0){
                                 $settings = $set[0];
                                 $settings->src = "db_normal";
                             }
                        else{
                             $settings->option_id = "default";
                             $settings->option_name = "rasp_plugin_data";
                             $settings->src = "db_null";
                             $settings->option_value = "
                             \"disp_name\":true,
                             \"disp_place\":true,
                             \"disp_descr\":true,
                             \"disp_url\":true,
                             \"adaptive\":true,
                             \"num_of_rows\":\"3\",
                 			 \"style_background\": \"#e0e0f0\",
                             \"style_foreground\": \"#ffffff\",
                             \"style_font\": \"#000000\"
                             " ;
                          }

          error_log("rasp admin display read from DB" . (string) json_encode($set[0]));

    return $set[0];
    }
}


function myLog($toLog)
{
    $type = gettype($toLog);
    if ($type == "string. ") {
        error_log('myLog. type = String ' . $toLog);
        return;
    }
    if ($type == "array. ") {
        error_log('myLog. type = Array ' . json_encode($toLog));
        error_log('Array length = ' . count($toLog));
        foreach ((array) $toLog as $key => $item) {
            error_log($key . ' -- ' . $item);
        }
        return;
    }
    if ($type == "object. ") {
        error_log('myLog. type = object ');
        foreach ($toLog as $key => $item) {
            error_log($key . ' -- ' . $item);
        }
        return;
    }
    error_log('Other type ' . $toLog);
}
