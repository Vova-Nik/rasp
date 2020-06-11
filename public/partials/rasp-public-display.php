<?php

/**
 * Provide a public-facing view for the plugin
 *
 * This file is used to markup the public-facing aspects of the plugin.
 *
 * @link       https://www.facebook.com/vnikols
 * @since      1.0.0
 *
 * @package    Rasp
 * @subpackage Rasp/public/partials
 */

//<!-- This file should primarily consist of HTML with a little bit of PHP. -->

class Display
{
    public function display_rasp_table($the_content)
    {
        if (strpos($the_content, '[RASP]') < 0) {
            return $the_content;
        } else {
            $replacement =
                '
				<div class="before-grid">Сегодня</div>
				<div class="grid-container">
				</div>
				';

            global $wpdb;
            $table_name = $wpdb->prefix . 'rasp_rasp';
            $charset_collate = $wpdb->get_charset_collate();

            if (!empty($wpdb->error)) {
                wp_die($wpdb->error);
            }
            try{
                $results = $wpdb->get_results("SELECT * FROM $table_name");
            }
            catch(Exception $e){
             $results[0] = json_decode(
                     '{
                         "id":"1",
                         "event_begin_time":"19:00:00",
                         "event_end_time":null,
                         "event_day_of_week":"0",
                         "event_name":"Db exception.",
                         "event_place":"test record provided",
                         "event_description":null,
                         "event_url":"","event_category":"0",
                         "event_show":"1",
                         "unic":"128"
                     }'
                 );
            }
            if(sizeof($results)<1)
            {
                         $results[0] = json_decode(
                                 '{
                                     "id":"1",
                                     "event_begin_time":"19:00:00",
                                     "event_end_time":null,
                                     "event_day_of_week":"0",
                                     "event_name":"DB is empty.",
                                     "event_place":"test record provided",
                                     "event_description":null,
                                     "event_url":"","event_category":"0",
                                     "event_show":"1",
                                     "unic":"128"
                                 }'
                             );
            }

            $table_name = $wpdb->prefix . 'options';
            $charset_collate = $wpdb->get_charset_collate();
            $settings = new stdClass();
            try{
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
            }
            catch(Exception $e){
                     $settings->option_id = "default";
                     $settings->option_name = "rasp_plugin_data";
                     $settings->src = "db_exc";
                     $settings->option_value = "
                     \"disp_name\":true,
                     \"disp_place\":true,
                     \"disp_descr\":true,
                     \"disp_url\":true,
                     \"adaptive\":true,
                     \"num_of_rows\":\"3\",
         			 \"style_background\": \"#f0f0f0\",
                     \"style_foreground\": \"#ffffff\",
                     \"style_font\": \"#000000\"
                     " ;
            }

            //error_log("rasp public display read encoded  Data sourse - ". $settings->src . "\n Settings- " . $settings->option_value);

            //JSON_UNESCAPED_SLASHES ( integer ) Не экранировать /. Доступно с PHP 5.4.0.
            //JSON_HEX_TAG ( integer ) Все < и > кодируются в \u003C и \u003E. Доступно с PHP 5.3.0.

            $replacement .= '<div id="event_data">';
            foreach ($results as $record) {
                //$rasp_event = ( string ) json_encode( $record, JSON_HEX_TAG );
                $replacement .= '<div class="event_data_element">';
                $replacement .= (string) json_encode($record, JSON_HEX_TAG);
                $replacement .= '</div>';
            }

            $replacement .= '</div>';

            $replacement .= '<div id="rasp_settings">';
            $replacement .= $settings->option_value;
            $replacement .= '</div>';

            $pattern = '/\[RASP\]/';
            $the_content = preg_replace($pattern, $replacement, $the_content);
            // error_log($the_content);
            return $the_content;
        }
        return $the_content;
    }
}
