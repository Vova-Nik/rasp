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
		error_log($the_content);
		if (strpos($the_content, "[RASP]") < 0) {
			return "Ниххуя!" . $the_content;
		}
		else{
			$replacement =
				'
				<div class="before-grid">Сегодня</div>
				<div class="grid-container">
				</div>
				';

			//global $wpdb;
				$fileName = "wp-content/plugins/rasp/rasp_data.txt";
				if(file_exists($fileName)){
					$handler = fopen($fileName, 'r');
					if (($handler = fopen("wp-content/plugins/rasp/rasp_data.txt", "r")) !== FALSE) {
						$data = fread($handler,filesize("wp-content/plugins/rasp/rasp_data.txt"));
						fclose($handler);
						$loadedFileObj = json_decode($data);
						error_log('PHP Read ' );
					}
				 }
				 else{
					error_log('File rasp_data.txt not exist, or rasp page is under administrating');
					return;
				 }
			
			$replacement .= '<div id="event_data">';
			foreach($loadedFileObj  as $record){
				//$rasp_event = (string) json_encode($record, JSON_HEX_TAG );
				$replacement .= '<div class="event_data_element">';
				$replacement .= (string) json_encode($record, JSON_HEX_TAG );
				$replacement .= '</div>';
			}
			$replacement .= '</div>';
			$pattern = '/\[RASP\]/'; // '/\[RASP\]/'
			$the_content = preg_replace($pattern, $replacement, $the_content);
			return $the_content;
		}
		return $the_content;
	}
}
