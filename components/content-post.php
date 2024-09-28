<article class="post-item">
    <a href="<?=esc_url(get_permalink()) ?>">
    <?php if (has_post_thumbnail()): ?>
        <?php the_post_thumbnail('medium'); ?>
    <?php else: ?>
        <img src="<?=esc_url(get_theme_file_uri('/images/ph.png')) ?>" alt="" class="wp-post-image">
    <?php endif; ?>
    </a>

    <header class="post-header">
        <h2 class="post-title">
            <a href="<?=esc_url(get_permalink()); ?>"><?php the_title() ?></a>
        </h2>
        <time class="post-date" datetime="<?=get_the_date('Y-m-d') ?>"><?php the_date(); ?></time>
        <?php the_category(); ?>
    </header>
</article>
