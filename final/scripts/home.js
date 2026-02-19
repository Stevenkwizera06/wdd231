// home.js - Home page functionality (ES Module)
import { createCountryCard, formatPopulation, trackVisit } from './main.js';

const API_URL = 'https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,languages,currencies,cca3,area,subregion';

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
        displayError('Failed to load countries. Please try again later.');
        return [];
    }
}

// ===== DISPLAY ERROR =====
function displayError(message) {
    const container = document.getElementById('featured-countries');
    if (container) {
        container.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-muted);">
        <p style="font-size:2rem; margin-bottom:12px;">⚠️</p>
        <p>${message}</p>
      </div>
    `;
    }
}

// ===== CALCULATE STATS =====
function calculateStats(countries) {
    const totalPopulation = countries.reduce((sum, c) => sum + (c.population || 0), 0);

    const languagesSet = new Set();
    countries.forEach(c => {
        if (c.languages) {
            Object.values(c.languages).forEach(lang => languagesSet.add(lang));
        }
    });

    const regionsSet = new Set(countries.map(c => c.region).filter(Boolean));

    return {
        countries: countries.length,
        population: totalPopulation,
        languages: languagesSet.size,
        regions: regionsSet.size
    };
}

// ===== UPDATE STATS BAR =====
function updateStats(stats) {
    const countStat = document.getElementById('stat-countries');
    const popStat = document.getElementById('stat-population');
    const langStat = document.getElementById('stat-languages');
    const regionStat = document.getElementById('stat-regions');

    if (countStat) countStat.textContent = stats.countries;
    if (popStat) popStat.textContent = formatPopulation(stats.population);
    if (langStat) langStat.textContent = `${stats.languages}+`;
    if (regionStat) regionStat.textContent = stats.regions;
}

// ===== DISPLAY FEATURED COUNTRIES =====
function displayFeaturedCountries(countries) {
    const container = document.getElementById('featured-countries');
    if (!container) return;

    // Featured country codes (handpicked for diversity)
    const featuredCodes = ['USA', 'JPN', 'BRA', 'ZAF', 'FRA', 'AUS', 'IND', 'CAN'];

    // Filter to get featured countries using array method
    const featured = countries.filter(c => featuredCodes.includes(c.cca3));

    container.innerHTML = '';

    // Use forEach array method to create cards
    featured.forEach((country, index) => {
        const card = createCountryCard(country, index);
        container.appendChild(card);
    });
}

// ===== INITIALIZE HOME PAGE =====
async function init() {
    trackVisit();

    const countries = await fetchCountries();

    if (countries.length > 0) {
        const stats = calculateStats(countries);
        updateStats(stats);
        displayFeaturedCountries(countries);
    }
}

// Run on page load
init();
