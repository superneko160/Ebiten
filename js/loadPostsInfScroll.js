'use strict';

(() => {
    /**
     * 非同期で投稿を読み込む（無限スクロールVer）
     */
    const loadPostsInfScroll = (() => {
        const state = {
            page: 1,  // 最初のページは読み込み済みのため、2から開始
            loading: false,
            maxPages: null,
            bottomThreshold: 50  // ページ下部からこのピクセル数に達したら読み込みを開始
        };

        const postList = document.querySelector('.post-list');
        let loadingIndicator;

        /**
         * メッセージ表示領域の作成
         */
        const createLoadingIndicator = () => {
            loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'loading-indicator';
            loadingIndicator.textContent = '読み込み中...';
            loadingIndicator.style.display = 'none';
            postList.after(loadingIndicator);
        };

        /**
         * メッセージの表示・非表示
         */
        const setLoading = (isLoading) => {
            state.loading = isLoading;
            loadingIndicator.style.display = isLoading ? 'block' : 'none';
        };

        /**
         * 読み込んだ投稿の追加
         */
        const appendPosts = (html) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            while (tempDiv.firstChild) {
                postList.appendChild(tempDiv.firstChild);
            }
        };

        /**
         * 過去の投稿を取得
         */
        const fetchPosts = async () => {
            const formData = new FormData();
            formData.append('action', 'load_more_posts');
            formData.append('page', state.page);

            try {
                const response = await fetch(ajax_object.ajax_url, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (data.success) {
                    appendPosts(data.data.html);
                    state.page++;
                    state.maxPages = data.data.max_pages;

                    if (state.page > state.maxPages) {
                        window.removeEventListener('scroll', handleScroll);
                        loadingIndicator.textContent = 'すべての投稿を読み込みました';
                    }
                } else {
                    throw new Error('No posts found');
                }
            } catch (error) {
                console.error('Error:', error);
                loadingIndicator.textContent = 'エラーが発生しました。再更新してください';
            } finally {
                setLoading(false);
            }
        };

        /**
         * スクロール監視
         */
        const handleScroll = () => {
            if (state.loading || (state.maxPages !== null && state.page > state.maxPages)) return;

            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            
            if (scrollTop + clientHeight >= scrollHeight - state.bottomThreshold) {
                setLoading(true);
                fetchPosts();
            }
        };

        /**
         * 初期化
         */
        const init = () => {
            createLoadingIndicator();
            window.addEventListener('scroll', handleScroll);
            // 最初の投稿セットを読み込む
            fetchPosts();
        };

        return { init };
    })();

    // DOM構築後にloadPostsInfScroll関数を設定
    document.addEventListener('DOMContentLoaded', loadPostsInfScroll.init);
})();
