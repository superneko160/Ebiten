<?php
/**
 * 各ファイルの読み込み
 */
function add_files() {
    // リセットCSS
    wp_enqueue_style('reset-style', 'https://unpkg.com/destyle.css@2.0.2/destyle.css');
    // Google Fonts
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap');
    // メインのCSSファイル
    wp_enqueue_style('main-style', get_stylesheet_uri());
    // JavaScriptファイル
    wp_enqueue_script('main-script', get_theme_file_uri().'/js/script.js', array(), '', true);
}
add_action('wp_enqueue_scripts', 'add_files');

/**
 * テーマ設定
 */
function theme_setup() {
    // titleタグ
    add_theme_support('title-tag');
    // アイキャッチ画像
    add_theme_support('post-thumbnails');
    // メニュー
    register_nav_menus(
        [
            'main-menu' => 'メインメニュー',
        ]
    );
}
add_action('after_setup_theme', 'theme_setup');

/**
 * 過去の投稿を非同期で読み込む
 */
function load_more_posts() {
    $paged = $_POST['page'];
    $posts_per_page = 10;  // 1回のリクエストで10投稿を取得

    $args = [
        'post_type' => 'post',
        'post_status' => 'publish',
        'posts_per_page' => $posts_per_page,
        'paged' => $paged,
    ];

    $query = new WP_Query($args);
    $max_pages = $query->max_num_pages;

    if ($query->have_posts()) {
        ob_start();
        while ($query->have_posts()) : $query->the_post();
            get_template_part('components/content', 'post');
        endwhile;
        $html = ob_get_clean();

        wp_send_json_success([
            'html' => $html,
            'max_pages' => $max_pages
        ]);
    } else {
        wp_send_json_error('No posts found');
    }

    wp_die();
}
add_action('wp_ajax_load_more_posts', 'load_more_posts');
add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts');

/**
 * JSファイル読み込み
 */
function enqueue_custom_scripts() {
    $ajax_params = [
        'ajax_url' => admin_url('admin-ajax.php')
    ];

    // 無限スクロールのページテンプレートの場合、無限スクロール用で過去投稿を取得する用のJS読み込み
    if (is_page_template('loadPostsInfScroll.php')) {
        wp_enqueue_script('load-posts-inf-scroll-js', get_template_directory_uri() . '/js/loadPostsInfScroll.js', [], '1.0', true);
        wp_localize_script('load-posts-inf-scroll-js', 'ajax_object', $ajax_params);
    }
    // それ以外の場合（通常のindex.phpなど）、ボタンで過去投稿を取得する用のJS読み込み
    if (is_home()) {
        wp_enqueue_script('load-posts-js', get_template_directory_uri() . '/js/loadPosts.js', [], '1.0', true);
        wp_localize_script('load-posts-js', 'ajax_object', $ajax_params);
    }
}
add_action('wp_enqueue_scripts', 'enqueue_custom_scripts');
