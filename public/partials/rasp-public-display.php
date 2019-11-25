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
//<link rel="stylesheet" type="text/css" href="C:\openserver\ospanel\domains\raspwp\wp-content\plugins\rasp\public\css\rasp-public.css">

//VVV

class Display
{


	public function display_rasp_table($the_content)
	{

		if (strpos($the_content, 'RASP') !== false) {

			$replacement =
				'
				<div class="before-grid">Сегодня</div>
				<div class="grid-container">
					<div id="item00">00</div>
					<div id="item01">01</div>
					<div id="item02">02</div>  
					<div id="item03">03</div>
					<div id="item10">10</div>
					<div id="item11">11</div>
					<div id="item12">12</div>
					<div id="item13">13</div> 
					<div id="item20">20</div>
					<div id="item21">21</div>
					<div id="item22">22</div>
					<div id="item23">23</div> 
				</div>
				';

			global $wpdb;
			$table_name = $wpdb->prefix . 'rasp_rasp';
			$charset_collate = $wpdb->get_charset_collate();

			// connection not sucessfull
			if (!empty($wpdb->error))
				wp_die($wpdb->error);

			// getting data from DB
			$results = $wpdb->get_results("SELECT * FROM $table_name");

			$replacement .= '<div id="event_data">';
			foreach($results as $record){
				$rasp_event = (string) json_encode($record);
				$replacement .= '<div class="event_data_element">';
				$replacement .= $rasp_event;
				$replacement .= '</div>';
			}

			$replacement .= '</div>';

			//DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
			//error_log($replacement);

			$pattern = '/RASP/';
			$the_content = preg_replace($pattern, $replacement, $the_content);
			return $the_content;
		}

		return $the_content;
	}
}
