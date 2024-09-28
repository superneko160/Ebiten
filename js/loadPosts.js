'use strict';

(() => {
    /**
     * 非同期で投稿を読み込む
     */
    const loadPosts = (() => {
        const state = {
            page: 2,  // 最初のページは読み込み済みのため、2から開始
            loading: false,
            maxPages: null
        };

        const loadPostsButton = document.getElementById('loadPosts');
        const postList = document.querySelector('.post-list');

        /**
         * 読み込み時、ボタンにメッセージ表示
         */
        const setLoading = (isLoading) => {
            state.loading = isLoading;
            loadPostsButton.textContent = isLoading ? '読み込み中...' : 'もっと見る';
            loadPostsButton.disabled = isLoading;
        };

        /**
         * ボタンの非表示
         */
        const hideButton = () => {
            loadPostsButton.style.display = 'none';
        };

        /**
         * ボタンにエラーメッセージ表示
         */
        const showError = (message) => {
            loadPostsButton.textContent = message;
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
         * 過去の投稿の取得
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
                        hideButton();
                    }
                } else {
                    hideButton();
                }
            } catch (error) {
                console.error('Error:', error);
                showError('読み込み失敗：もう一度押してください');
            } finally {
                setLoading(false);
            }
        };

        /**
         * 初期化
         */
        const init = () => {
            // 「もっと見る」ボタン押下時
            loadPostsButton.addEventListener('click', () => {
                if (state.loading) return;
                setLoading(true);
                fetchPosts();
            });
        };

        return { init };
    })();

    // DOM構築後にloadPosts関数を設定
    document.addEventListener('DOMContentLoaded', loadPosts.init);
})();
