<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://www.facebook.com/vnikols
 * @since      1.0.0
 *
 * @package    Rasp
 * @subpackage Rasp/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Rasp
 * @subpackage Rasp/admin
 * @author     Volodymyr Nikolenko < vmaseich@gmail.com>
 * 
 * 
 */
//include plugin_dir_path(dirname(__FILE__)) . '/admin/partials/rasp-admin-display.php';
//require_once plugin_dir_path(dirname(__FILE__)) . '/admin/partials/rasp-admin-display.php';


class Rasp_Admin
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */


	/**VVV
	 * rasp menu in plugins settings creation

	 */

	public function __construct($plugin_name, $version)
	{
		$this->plugin_name = $plugin_name;
		$this->version = $version;
		add_action("admin_menu", array($this, "options_page"));

		add_action('rest_api_init', function () {
			register_rest_route('rasp/v1', '/raspread', 
			array(
				'methods' => 'POST',
				'callback' => 'rasp_restAPI_point_read',
				'args' => array(),
			));
		});

		add_action('rest_api_init', function () {
			register_rest_route('rasp/v1', '/raspwrite', 
			array(
				'methods' => 'POST',
				'callback' => 'rasp_restAPI_point_write',
				'args' => array(),
			));
		});

		add_action('rest_api_init', function () {
			register_rest_route('rasp/v1', '/raspdel', 
			array(
				'methods' => 'POST',
				'callback' => 'rasp_restAPI_point_del',
				'args' => array(),
			));
		});

		add_action('rest_api_init', function () {
			register_rest_route('rasp/v1', '/raspfile', 
			array(
				'methods' => 'POST',
				'callback' => 'rasp_restAPI_point_file',
				'args' => array(),
			));
		});


		add_action('rest_api_init', function () {
			register_rest_route('rasp/v1', '/raspSettings', 
			array(
				'methods' => 'POST',
				'callback' => 'rasp_restAPI_point_settings',
				'args' => array(),
			));
		});



	}

	/**VVV
	 * rasp menu in plugins settings creation
	 */
	public function options_page()
	{
		add_options_page(
			"rasp config",
			"rasp",
			"manage_options",
			"rasp-options",
			array($this, 'render')
		);
	}
	public function render()
	{
			display_frame();
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Rasp_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Rasp_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/rasp-admin.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Rasp_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Rasp_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/rasp-admin.js', array('jquery'), $this->version, false);
	}

	public function __toString()
	{
		return 'class Rasp_Admin';
	}
	//require_once plugin_dir_path(dirname(__FILE__)) . '/admin/partials/rasp-admin-display.php';	

}
require_once plugin_dir_path(dirname(__FILE__)) . '/admin/partials/rasp-admin-display.php';
