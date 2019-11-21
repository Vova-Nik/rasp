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

        <input type="hidden" name="action" value="import">        <!--VVV "action" & "import" are used in class-rasp.php to call POST procesing (changin rasp table) on SERVER-->

    </form>
</div>

<!-- This file should primarily consist of HTML with a little bit of PHP. -->