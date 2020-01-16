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
    		  event_category int DEFAULT 0,
    		  event_show bool DEFAULT 1,
    		  unic bigint default 0,
    		  PRIMARY KEY  (id)
    		) $charset_collate;";

    		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    		dbDelta($sql);

    		$wpdb->insert(
    			'wp_rasp_rasp',
    			array(
    				'event_name' => 'Meeting Sofi',
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
    				'event_place' => 'Ицхака Рабина 7', //s
    				'event_day_of_week' => '1' //d
    			),
    			array('%s', '%s', '%s', '%d')
    		);

    		$wpdb->insert(
    			'wp_rasp_rasp',
    			array(
    				'event_name' => "Meeting PosKOt",
    				'event_begin_time' => '18:00',	//s
    				'event_place' => 'Канатная 28', //s
    				'event_day_of_week' => '3', //d
    				'event_url' => "https://www.w3schools.com"
    			),
    			array('%s', '%s', '%s', '%d', '%s')
    		);

    		$wpdb->insert(
    			'wp_rasp_rasp',
    			array(
    				'event_name' => 'Meeting Sofi',   //s
    				'event_begin_time' => '19:00',	//s
    				'event_place' => 'Канатная 28', //s
    				'event_day_of_week' => '2', //d
    				'event_url' => "https://www.w3schools.com" //s
    			),
    			array('%s', '%s', '%s', '%d', '%s')
    		);

    		$wpdb->insert(
    			'wp_rasp_rasp',
    			array(
    				'event_name' => 'Meeting Sofi',   //s
    				'event_begin_time' => '19:00',	//s
    				'event_place' => 'Канатная 28', //s
    				'event_day_of_week' => '4' //d
    			),
    			array('%s', '%s', '%s', '%d')
    		);

    		$wpdb->insert(
    			'wp_rasp_rasp',
    			array(
    				'event_name' => 'Rassvet',   //s
    				'event_begin_time' => '12:00',	//s
    				'event_place' => 'Ицхака рабина 7 (РЦ Ступени 2 эт)', //s
    				'event_day_of_week' => '1' //d
    			),
    			array('%s', '%s', '%s', '%d')
    		);

    		$wpdb->insert(
    			'wp_rasp_rasp',
    			array(
    				'event_name' => 'Rassvet',   //s
    				'event_begin_time' => '12:00',	//s
    				'event_place' => 'Ицхака рабина 7 (РЦ Ступени 2 эт)', //s
    				'event_day_of_week' => '6' //d
    			),
    			array('%s', '%s', '%s', '%d')
			);
			
			$table_name = $wpdb->prefix . 'options';
			$charset_collate = $wpdb->get_charset_collate();
			$wpdb->insert(
    			$table_name,
    			array(
    				'option_name' => 'rasp_plugin_data',   //s
    				'option_value' => 'rasp_plugin_data!!!!!!',	//s
    				'autoload' => 'no', //s
    			),
    			array('%s', '%s', '%s')
			);
			error_log('rasp_plugin_data rasp-activator');

    	}

    	public function __toString()
    	{
    		return 'class Rasp_Activator';
    	}
    }