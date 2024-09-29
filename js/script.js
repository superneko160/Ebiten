'use strict';

const menuButton = document.querySelector('.btn-menu');
const nav = document.querySelector('.menu-wrapper');

// メニューが閉じているときのアイコン
const menuBars = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-width='2' d='M5 7h14M5 12h14M5 17h14'/></svg>";
// メニューが開いているときのアイコン
const menuClose = "<svg class='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'><path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 18 17.94 6M18 18 6.06 6'/></svg>";

let isMenuOpen = false;  // アイコン切替判定

menuButton.addEventListener('click', () => {
    nav.classList.toggle('open-menu');
    isMenuOpen = !isMenuOpen;
    menuButton.innerHTML = isMenuOpen ? menuClose : menuBars;
});
