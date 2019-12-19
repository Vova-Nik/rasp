<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://www.facebook.com/vnikols
 * @since      1.0.0
 *
 * @package    Rasp
 * @subpackage Rasp/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Rasp
 * @subpackage Rasp/includes
 * @author     Volodymyr Nikolenko < vmaseich@gmail.com>
 */
class Rasp {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Rasp_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'RASP_VERSION' ) ) {
			$this->version = RASP_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'rasp';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Rasp_Loader. Orchestrates the hooks of the plugin.
	 * - Rasp_i18n. Defines internationalization functionality.
	 * - Rasp_Admin. Defines all hooks for the admin area.
	 * - Rasp_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {
		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-rasp-loader.php';
		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-rasp-i18n.php';
		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-rasp-admin.php';
		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-rasp-public.php';

		//require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public\partials\rasp-public-display.php';
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/rasp-public-display.php';

		$this->loader = new Rasp_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Rasp_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {
		$plugin_i18n = new Rasp_i18n();
		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {
		$plugin_admin = new Rasp_Admin( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Rasp_Public( $this->get_plugin_name(), $this->get_version() );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );
		
		$plugin_public_display = new Display();
		$this->loader->add_filter( 'the_content', $plugin_public_display, 'display_rasp_table' );
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */

	 /**
	 * VVV POST from admin part to DB changing 
	 * https://www.youtube.com/watch?v=9pslVgOMEGM
	 */
	public function run() {
		$this->loader->run();
	}
	


	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Rasp_Loader    Orchestrates the hooks of the plugin.
	 */

	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

}

/*

Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP; dc_jqmegamenu has a deprecated constructor in /virt/homes/aa-odessa/htdocs/wp-content/plugins/jquery-mega-menu/dcwp_jquery_mega_menu.php on line 14

Deprecated: Methods with the same name as their class will not be constructors in a future version of PHP; dc_jqmegamenu_widget has a deprecated constructor in /virt/homes/aa-odessa/htdocs/wp-content/plugins/jquery-mega-menu/dcwp_jquery_mega_menu_widget.php on line 3

Deprecated: Function create_function() is deprecated in /virt/homes/aa-odessa/htdocs/wp-content/plugins/jquery-mega-menu/dcwp_jquery_mega_menu.php on line 58

Deprecated: Function create_function() is deprecated in /virt/homes/aa-odessa/htdocs/wp-content/plugins/wp-miniaudioplayer/inc/popup.php on line 87

Notice: Вызванный метод конструктора класса WP_Widget в dc_jqmegamenu_widget считается устаревшим с версии 4.3.0! Используйте
__construct()
. in /virt/homes/aa-odessa/htdocs/wp-includes/functions.php on line 4716

Notice: Вызванный метод конструктора класса WP_Widget в dc_jqmegamenu_widget считается устаревшим с версии 4.3.0! Используйте
__construct()
. in /virt/homes/aa-odessa/htdocs/wp-includes/functions.php on line 4716

Warning: require_once(/virt/homes/aa-odessa/htdocs/wp-content/plugins/rasp/public\partials\rasp-public-display.php): failed to open stream: No such file or directory in /virt/homes/aa-odessa/htdocs/wp-content/plugins/rasp/includes/class-rasp.php on line 120

Fatal error: require_once(): Failed opening required '/virt/homes/aa-odessa/htdocs/wp-content/plugins/rasp/public\partials\rasp-public-display.php' (include_path='.:/usr/local/share/pear') in /virt/homes/aa-odessa/htdocs/wp-content/plugins/rasp/includes/class-rasp.php on line 120
*/
