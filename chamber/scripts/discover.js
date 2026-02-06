
import { places } from '../data/discover.mjs';

// --- Shared Logic (Nav & Footer) --- //
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("show");
    });
}

const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    const today = new Date();
    currentYear.textContent = today.getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}

// --- Discover Page Specific Logic --- //

// 1. Visit Message (LocalStorage)
const visitMessage = document.getElementById('visit-message');
const now = Date.now();
const lastVisit = localStorage.getItem('lastVisit');

if (!lastVisit) {
    // First visit
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diffTime = now - parseInt(lastVisit);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        visitMessage.textContent = "Back so soon! Awesome!";
    } else {
        const dayWord = diffDays === 1 ? "day" : "days";
        visitMessage.textContent = `You last visited ${diffDays} ${dayWord} ago.`;
    }
}
// Store current visit date
localStorage.setItem('lastVisit', now);


// 2. Render Cards from imported data
const cardsContainer = document.getElementById('cards-container');

function displayPlaces(places) {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = ''; // Clean start

    places.forEach((place, index) => {
        // Create elements
        const card = document.createElement('div');
        card.classList.add('discover-card');

        // Title
        const title = document.createElement('h2');
        title.textContent = place.title;

        // Figure & Image
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = place.image;
        img.alt = place.title;
        img.loading = 'lazy'; // Lazy loading requirement
        img.width = 300;
        img.height = 200;

        figure.appendChild(img);

        // Address
        const address = document.createElement('address');
        address.textContent = place.address;

        // Description
        const desc = document.createElement('p');
        desc.textContent = place.description;

        // Button
        const btn = document.createElement('button');
        btn.textContent = "Learn More";
        btn.addEventListener('click', () => {
            alert(`You clicked on ${place.title}. Future functionality would take you to a detail page.`);
        });

        // Append all
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(desc);
        card.appendChild(btn);

        cardsContainer.appendChild(card);
    });
}

displayPlaces(places);
