<?php

/**
 * Provide a admin area view for the plugin
 *
 * This file is used to markup the admin-facing aspects of the plugin.
 *
 * @link       https://www.facebook.com/vnikols
 * @since      1.0.0
 *
 * @package    Rasp
 * @subpackage Rasp/admin/partials
 */
?>

<h2>Its admin part of RASP</h2>

<div class="sent-to-db">
    <form method="post" action="" novalidate="novalidate">
        <input type="text" name="data" value="Data">
        <div class="submit"><input type="submit" id="submit" class="button button-primary" value="Save">
        </div>

        <input type="hidden" name="action" value="import">
        <!--VVV "action" & "import" are used in class-rasp.php to call POST procesing (changin rasp table) on SERVER-->

    </form>
</div>

<script defer src="rasp_admin.js"> </script>

<div class="admin-grid-container" id="tab1">
		
</div>

<!--
<div class="admin-grid-container-fl" id="th">
		<div  class="admin-grid-container-div-th">Id</div>
		<div  class="admin-grid-container-div-th">Day</div>
		<div  class="admin-grid-container-div-th">Time</div>
		<div  class="admin-grid-container-div-th">Place</div>
		<div  class="admin-grid-container-div-th">Contact</div>
		<div  class="admin-grid-container-div-th">Action</div>
</div>


<div class="float-th"> </div>
-->

<a href="http://www.aa-odessa.ho.ua/"> aa </a>

<?php
    global $wpdb;
			$table_name = $wpdb->prefix . 'rasp_rasp';
			$charset_collate = $wpdb->get_charset_collate();

			// connection not sucessfull
			if (!empty($wpdb->error))
				wp_die($wpdb->error);

			// getting data from DB
			$results = $wpdb->get_results("SELECT * FROM $table_name");
			// foreach($results as $v){
			// 	error_log( $v->event_name);
			// }

			//JSON_UNESCAPED_SLASHES (integer) Не экранировать /. Доступно с PHP 5.4.0.
            //JSON_HEX_TAG (integer) Все < и > кодируются в \u003C и \u003E. Доступно с PHP 5.3.0.
            
			$to_page = '<div id="event_data">';
			foreach($results as $record){
				//$to_page = (string) json_encode($record, JSON_HEX_TAG );
				$to_page .= '<div class="event_data_element">';
				$to_page .= (string) json_encode($record, JSON_HEX_TAG );
				$to_page .= '</div>';
			}
            $to_page .= '</div>';
            
            echo $to_page;

