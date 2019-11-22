<?php

/**
 * Fired during plugin activation
 *
 * @link       https://www.facebook.com/vnikols
 * @since      1.0.0
 *
 * @package    Rasp
 * @subpackage Rasp/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Rasp
 * @subpackage Rasp/includes
 * @author     Volodymyr Nikolenko < vmaseich@gmail.com>
 */
class Rasp_Activator
{

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */

	//VVV
	public static function activate()
	{
		//  exit("Activate in" . "\rasp\includes\class-rasp-activator.php");
		//create_table();
		global $wpdb;
		$table_name = $wpdb->prefix . 'rasp_rasp';
		$charset_collate = $wpdb->get_charset_collate();

		$sql = "CREATE TABLE $table_name (
		  id int NOT NULL AUTO_INCREMENT,
		  event_begin_time time,
		  event_end_time time,
		  event_day_of_week int DEFAULT 0,
		  event_name tinytext NOT NULL,
		  event_place varchar(512),
		  event_description varchar(512),
		  event_url varchar(512) DEFAULT '',
		--   sun bool DEFAULT FALSE,
		--   mon bool DEFAULT FALSE,
		--   tue bool DEFAULT FALSE,
		--   wed bool DEFAULT FALSE,
		--   thu bool DEFAULT FALSE,
		--   fry bool DEFAULT FALSE,
		--   sat bool DEFAULT FALSE,
		  event_category int DEFAULT 0,
		  event_show bool DEFAULT 1,
		  PRIMARY KEY  (id)
		) $charset_collate;";

		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
				
		$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_name' => 'Meeting Sofi',   //s
				'event_begin_time' => '19:00',	//s
				'event_place' => 'Канатная 28', //s
				'event_day_of_week' => '0' //d
			),
			array('%s', '%s', '%s', '%d')
		);

		$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_name' => 'Meeting Stupi',   //s
				'event_begin_time' => '19:00',	//s
				'event_place' => 'Канатная 28', //s
				'event_day_of_week' => '1' //d
			),
			array('%s', '%s', '%s', '%d')
		);

		$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_name' => 'Meeting Kot',   //s
				'event_begin_time' => '19:00',	//s
				'event_place' => 'Канатная 28', //s
				'event_day_of_week' => '3' //d
			),
			array('%s', '%s', '%s', '%d')
		);

		$wpdb->insert(
			'wp_rasp_rasp',
			array(
				'event_name' => 'Meeting Sofi',   //s
				'event_begin_time' => '19:00',	//s
				'event_place' => 'Канатная 28', //s
				'event_day_of_week' => '2' //d
			),
			array('%s', '%s', '%s', '%d')
		);
		//$record_id = $wpdb->insert_id;  //number of last record hb inserted to DB
		//exit("Insertion " . $record_id);
		//exit('1-st');
	}

	public function __toString()
	{
			return 'class Rasp_Activator';
	}
}
