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

		//add_action('wp_enqueue_scripts', 'insert_css');
		//error_log("Display is running, congrats" . __FILE__ . '  ' . __LINE__);

		if (strpos($the_content, 'RASP') !== false) {

			$replacement =
				'
				<div id="before-grid">Сегодня</div>
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


			// $js_script__url = plugins_url('rasp.js', __FILE__);
			$js_script__url  = plugin_dir_url(__FILE__) . '/js/rasp-public.js';
			$js_script__url  = str_replace('/partials/', '', $js_script__url);
			//error_log( $js_script__url  . ' in file ' . __FILE__ . __LINE__ );

			$replacement .= '<script src="';
			$replacement .= $js_script__url;
			$replacement .= '"></script>';


			$pattern = '/RASP/';
			$the_content = preg_replace($pattern, $replacement, $the_content);
			return $the_content;
		}

		return $the_content;
	}
}
