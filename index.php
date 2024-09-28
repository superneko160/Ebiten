<?php get_header(); ?>

    <main class="main-contents wrapper">
        <div class="post-list">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <?php get_template_part('components/content', 'post'); ?>
            <?php endwhile; else : ?>
                <p>記事はありません</p>
            <?php endif; ?>
        </div>

        <button id="loadPosts">もっと見る</button>
    </main>

<?php get_footer(); ?>
