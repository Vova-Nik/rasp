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

            $results = $wpdb->get_results("SELECT * FROM $table_name");

            $table_name = $wpdb->prefix . 'options';
            $charset_collate = $wpdb->get_charset_collate();
            $settings = $wpdb->get_results("SELECT * FROM $table_name WHERE option_name ='rasp_plugin_data'")[0];
            error_log("rasp public display read" . (string) json_encode($settings));

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
            return $the_content;
        }
        return $the_content;
    }
}
