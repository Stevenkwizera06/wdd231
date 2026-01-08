// navigation.js
const hamburger = document.querySelector('#menu-button');
const nav = document.querySelector('nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
});
