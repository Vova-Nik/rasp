<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://www.facebook.com/vnikols
 * @since      1.0.0
 *
 * @package    Rasp
 * @subpackage Rasp/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Rasp
 * @subpackage Rasp/includes
 * @author     Volodymyr Nikolenko < vmaseich@gmail.com>
 */
class Rasp_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
		//VVV
	// 	private	function remove_table() {
	// 		global $wpdb;
	// 		$table_name = "rasp";
	// 		$sql = "DROP TABLE IF EXISTS $table_name;";
	// 		//$wpdb->query($sql);
	// 		//delete_option("my_plugin_db_version");
	//    }    

	public static function deactivate() {
			//  exit("deactivate in" . "\rasp\includes\class-rasp-deactivator.php");
			global $wpdb;
			$table_name = "wp_rasp_rasp";
			$sql = "DROP TABLE IF EXISTS $table_name;";
			$wpdb->query($sql);
			//delete_option("my_plugin_db_version");
	}

	public function __toString()
	{
			return 'class Rasp_Deactivator';
	}
}
