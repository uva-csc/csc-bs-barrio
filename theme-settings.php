<?php

/**
 * @file
 * theme-settings.php
 *
 * Provides theme settings for Bootstrap Barrio-based themes.
 */

use Drupal\Core\Form\FormStateInterface;

/**
 * Implements hook_form_system_theme_settings_alter() for settings form.
 */
function csc_bs_sass_form_system_theme_settings_alter(&$form, FormStateInterface $form_state, $form_id = NULL) {
  // Replace Barrio setting options with subtheme ones.
  $form['components']['navbar']['bootstrap_barrio_navbar_top_background']['#options'] = array(
    'bg-primary' => t('Primary'),
    'bg-secondary' => t('Secondary'),
    'bg-light' => t('Light'),
    'bg-dark' => t('Dark'),
    'bg-white' => t('White'),
    'bg-transparent' => t('Transparent'),
  );
  $form['components']['navbar']['bootstrap_barrio_navbar_background']['#options'] = array(
    'bg-primary' => t('Primary'),
    'bg-secondary' => t('Secondary'),
    'bg-light' => t('Light'),
    'bg-dark' => t('Dark'),
    'bg-white' => t('White'),
    'bg-transparent' => t('Transparent'),
  );
  // Test field
  $form['csc_bs_sass_settings'] = [
    '#type' => 'details',
    '#title' => t('Custom Settings'),
    '#open' => TRUE,
  ];

  $form['csc_bs_sass_settings']['default_profile_image'] = [
    '#type' => 'textfield',
    '#maxlength' => 7,
    '#size' => 10,
    '#title' => 'Default Profile Image',
    '#description' => 'Enter the file ID for the image uploaded to the Media Libary to use as the default profile image',
    '#default_value' => theme_get_setting('default_profile_image'),
  ];

  $form['#submit'][] = 'csc_bs_sass_settings_form_submit';
}


/**
 * Custom submit handler to save theme settings.
 */
function csc_bs_sass_settings_form_submit($form, FormStateInterface $form_state) {
  // Save the custom theme settings
  Drupal::configFactory()->getEditable('csc_bs_sass.settings')
    ->set('default_profile_image', $form_state->getValue('default_profile_image'))
    ->save();
}
