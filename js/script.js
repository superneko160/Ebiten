'use strict';

const menuButton = document.querySelector('.btn-menu');
const nav = document.querySelector('.menu-wrapper');

menuButton.addEventListener('click', () => {
  nav.classList.toggle('open-menu');
  menuButton.innerHTML = menuButton.innerHTML === 'Menu' ? 'Close' : 'Menu';
});
