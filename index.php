<?php get_header(); ?>

    <main class="main-contents wrapper">
        <div class="post-list">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <?php get_template_part('components/content', 'post'); ?>
            <?php endwhile; else : ?>
                <p>記事はありません</p>
            <?php endif; ?>
        </div>
        
        <?php if ( have_posts() ) : ?>
            <button id="loadPosts">もっと見る</button>
        <?php endif; ?>
    </main>

<?php get_footer(); ?>
