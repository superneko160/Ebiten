<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="<?=esc_url(get_theme_file_uri('/images/ebiten-icon.svg')) ?>" type="image/svg+xml">
    <?php wp_head();?>
</head>
<body <?php body_class(); ?>>
    <?php wp_body_open(); ?>
    <header class="site-header">
        <div class="wrapper">
            <h1 class="site-title">
                <a href="<?=esc_url(home_url('/')) ?>">
                    <?php bloginfo('name'); ?>
                </a>
            </h1>
            <p class="site-description"><?php bloginfo('description'); ?></p>
        </div>
    </header>
    <nav class="primary-navigation wrapper">
        <button class="btn-menu">
            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"/>
            </svg>
        </button>
        <?php
            wp_nav_menu(
                [
                    'theme_location' => 'main-menu',
                    'container' => '',
                    'menu_class' => 'menu-wrapper',
                ]
            );
        ?>
    </nav>
