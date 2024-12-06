import { fetchGames } from './displayCards';

// Navbar scroll effect
const navbar = document.querySelector('.custom-navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-fixed');
    } else {
        navbar.classList.remove('navbar-fixed');
    }
});

// Attach click event to nav links
document.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const category = link.getAttribute('data-category'); // Get category from data attribute
        fetchGames(category); // Fetch games for selected category
    });
});

// Fetch default category on page load
fetchGames('mmorpg');

