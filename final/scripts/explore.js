// explore.js - Explore page functionality (ES Module)
import { createCountryCard, favorites, trackVisit } from './main.js';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,languages,currencies,cca3,area,subregion';

let allCountries = [];
let filteredCountries = [];
let currentSort = 'name';

// ===== FETCH COUNTRIES WITH TRY/CATCH =====
async function fetchCountries() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching countries:', error);
        displayError('Failed to load countries. Please check your connection.');
        return [];
    }
}

// ===== DISPLAY ERROR =====
function displayError(message) {
    const container = document.getElementById('countries-grid');
    if (container) {
        container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; color:var(--text-muted);">
        <p style="font-size:3rem; margin-bottom:16px;">⚠️</p>
        <p style="font-size:1.1rem;">${message}</p>
      </div>
    `;
    }
}

// ===== SORT COUNTRIES =====
function sortCountries(countries, sortBy) {
    // Using array method: sort
    return [...countries].sort((a, b) => {
        if (sortBy === 'name') {
            return a.name.common.localeCompare(b.name.common);
        } else if (sortBy === 'population') {
            return (b.population || 0) - (a.population || 0);
        } else if (sortBy === 'area') {
            return (b.area || 0) - (a.area || 0);
        }
        return 0;
    });
}

// ===== FILTER COUNTRIES =====
function filterCountries() {
    const searchTerm = document.getElementById('search-input')?.value.toLowerCase() || '';
    const regionFilter = document.getElementById('region-filter')?.value || '';

    // Using array method: filter
    filteredCountries = allCountries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchTerm) ||
            country.name.official.toLowerCase().includes(searchTerm);
        const matchesRegion = !regionFilter || country.region === regionFilter;
        return matchesSearch && matchesRegion;
    });

    filteredCountries = sortCountries(filteredCountries, currentSort);
    displayCountries(filteredCountries);
    updateResultsCount(filteredCountries.length);
}

// ===== UPDATE RESULTS COUNT =====
function updateResultsCount(count) {
    const resultsCount = document.getElementById('results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${count} ${count === 1 ? 'country' : 'countries'}`;
    }
}

// ===== DISPLAY COUNTRIES =====
function displayCountries(countries) {
    const container = document.getElementById('countries-grid');
    if (!container) return;

    if (countries.length === 0) {
        container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:60px 20px; color:var(--text-muted);">
        <p style="font-size:2.5rem; margin-bottom:12px;">🔍</p>
        <p>No countries found matching your criteria.</p>
      </div>
    `;
        return;
    }

    container.innerHTML = '';

    // Using array method: forEach
    countries.forEach((country, index) => {
        const card = createCountryCard(country, index);
        container.appendChild(card);
    });
}

// ===== DISPLAY FAVORITES =====
function displayFavorites() {
    const favSection = document.getElementById('favorites-section');
    const favGrid = document.getElementById('favorites-grid');

    if (!favSection || !favGrid) return;

    const favCodes = favorites.getAll();

    if (favCodes.length === 0) {
        favSection.style.display = 'none';
        return;
    }

    favSection.style.display = 'block';

    // Using array method: filter and map
    const favCountries = allCountries.filter(c => favCodes.includes(c.cca3));

    favGrid.innerHTML = '';
    favCountries.forEach((country, index) => {
        const card = createCountryCard(country, index);
        favGrid.appendChild(card);
    });
}

// ===== INIT SEARCH & FILTERS =====
function initFilters() {
    const searchInput = document.getElementById('search-input');
    const regionFilter = document.getElementById('region-filter');
    const sortBtns = document.querySelectorAll('.sort-btn');

    if (searchInput) {
        searchInput.addEventListener('input', filterCountries);
    }

    if (regionFilter) {
        regionFilter.addEventListener('change', filterCountries);
    }

    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentSort = btn.dataset.sort;
            filterCountries();
        });
    });
}

// ===== INITIALIZE EXPLORE PAGE =====
async function init() {
    trackVisit();

    allCountries = await fetchCountries();

    if (allCountries.length > 0) {
        filteredCountries = sortCountries(allCountries, currentSort);
        displayCountries(filteredCountries);
        displayFavorites();
        updateResultsCount(filteredCountries.length);
        initFilters();
    }
}

// Run on page load
init();
