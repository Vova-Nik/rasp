<?php
/*
Plugin Name: Rasp
Plugin URI: http://www.aa-odessa.ho.ua/
Description: Краткое описание плагина.
Version: Номер версии плагина, например: 1.0
Author: vmaseich@gmail.com
Author URI: http://www.aa-odessa.ho.ua/
*/


function insert_css()
{

	$plugins_url = plugins_url('rasp.css', __FILE__);
		wp_enqueue_style( 'rasp.css', $plugins_url);
}
	
function rasp_redir($the_content)
{
	
	if (strpos($the_content, 'RASP')!== false)
	{
	
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

	
	$js_script__url = plugins_url('rasp.js', __FILE__);
	
	$replacement .= '<script src="';
	$replacement .= $js_script__url;
	$replacement .= '"></script>';
		
		
		$pattern = '/RASP/';
		$the_content = preg_replace($pattern, $replacement, $the_content);
		return $the_content;

	}
	
	return $the_content;
}

/* function rasp_js_run()
{
	
	$js_script__url = plugins_url('rasp.js', __FILE__);
	$ss= '<script src="';
	$ss .= $js_script__url;
	$ss .= '"></script>';
	//echo $ss;
	//echo <script src="$js_script__url"></script>;

} */
//<script src="./rasp.js"></script>
add_filter('the_content','rasp_redir');
add_action( 'wp_enqueue_scripts', 'insert_css' );
//add_action('wp_footer','rasp_js_run');

