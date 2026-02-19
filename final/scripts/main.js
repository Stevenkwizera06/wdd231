// main.js - Shared utilities and components (ES Module)

// ===== HAMBURGER MENU =====
export function initHamburgerMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            navMenu.classList.toggle('open');
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('open');
                navMenu.classList.remove('open');
            });
        });
    }
}

// ===== FOOTER DATES =====
export function updateFooterDates() {
    const yearSpan = document.getElementById('year');
    const lastModSpan = document.getElementById('lastmod');

    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModSpan) lastModSpan.textContent = document.lastModified;
}

// ===== LOCAL STORAGE UTILITIES =====
export const storage = {
    get(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error reading from localStorage:', error);
            return null;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing from localStorage:', error);
        }
    }
};

// ===== FAVORITES MANAGEMENT =====
export const favorites = {
    getAll() {
        return storage.get('worldscope_favorites') || [];
    },

    add(countryCode) {
        const favs = this.getAll();
        if (!favs.includes(countryCode)) {
            favs.push(countryCode);
            storage.set('worldscope_favorites', favs);
            return true;
        }
        return false;
    },

    remove(countryCode) {
        const favs = this.getAll();
        const filtered = favs.filter(code => code !== countryCode);
        storage.set('worldscope_favorites', filtered);
    },

    has(countryCode) {
        return this.getAll().includes(countryCode);
    }
};

// ===== VISIT TRACKING =====
export function trackVisit() {
    const now = Date.now();
    const lastVisit = storage.get('worldscope_last_visit');

    let message = '';

    if (!lastVisit) {
        message = '👋 Welcome! This is your first visit.';
    } else {
        const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
        if (daysSince === 0) {
            message = '🎉 Welcome back! You visited earlier today.';
        } else if (daysSince === 1) {
            message = '👋 Welcome back! You last visited yesterday.';
        } else {
            message = `👋 Welcome back! You last visited <strong>${daysSince} days ago</strong>.`;
        }
    }

    storage.set('worldscope_last_visit', now);

    const banner = document.getElementById('visit-banner');
    if (banner && message) {
        banner.innerHTML = message;
        banner.style.display = 'block';
    }
}

// ===== FORMAT UTILITIES =====
export function formatNumber(num) {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US').format(num);
}

export function formatPopulation(pop) {
    if (!pop) return 'N/A';
    if (pop >= 1e9) return `${(pop / 1e9).toFixed(1)}B`;
    if (pop >= 1e6) return `${(pop / 1e6).toFixed(1)}M`;
    if (pop >= 1e3) return `${(pop / 1e3).toFixed(1)}K`;
    return pop.toString();
}

export function formatArea(area) {
    if (!area) return 'N/A';
    return `${formatNumber(area)} km²`;
}

// ===== COUNTRY CARD GENERATOR =====
export function createCountryCard(country, index = 0) {
    const card = document.createElement('div');
    card.className = 'country-card';
    card.style.setProperty('--i', index);

    const languages = country.languages
        ? Object.values(country.languages).slice(0, 2).join(', ')
        : 'N/A';

    card.innerHTML = `
    <div class="flag-wrapper">
      <img src="${country.flags?.svg || country.flags?.png || ''}" 
           alt="Flag of ${country.name?.common || 'Country'}" 
           loading="lazy"
           width="300"
           height="200">
    </div>
    <div class="card-body">
      <h3>${country.name?.common || 'Unknown'}</h3>
      <div class="card-info">
        <div class="info-row">
          <span class="label">Capital:</span>
          <span class="value">${country.capital?.[0] || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="label">Population:</span>
          <span class="value">${formatNumber(country.population)}</span>
        </div>
        <div class="info-row">
          <span class="label">Region:</span>
          <span class="value">${country.region || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="label">Languages:</span>
          <span class="value">${languages}</span>
        </div>
      </div>
    </div>
  `;

    card.addEventListener('click', () => openModal(country));

    return card;
}

// ===== MODAL MANAGEMENT =====
let currentCountry = null;

export function openModal(country) {
    currentCountry = country;
    const overlay = document.getElementById('modal-overlay');
    const modalFlag = document.getElementById('modal-flag');
    const modalTitle = document.getElementById('modal-title');
    const modalDetails = document.getElementById('modal-details');
    const favBtn = document.getElementById('modal-fav-btn');

    if (!overlay) return;

    modalFlag.src = country.flags?.svg || country.flags?.png || '';
    modalFlag.alt = `Flag of ${country.name?.common || 'Country'}`;
    modalTitle.innerHTML = country.name?.common || 'Unknown';

    const languages = country.languages
        ? Object.values(country.languages).join(', ')
        : 'N/A';

    const currencies = country.currencies
        ? Object.values(country.currencies).map(c => `${c.name || ''} (${c.symbol || ''})`).join(', ')
        : 'N/A';

    modalDetails.innerHTML = `
    <div class="detail-item">
      <span class="detail-label">Official Name</span>
      <span class="detail-value">${country.name?.official || 'N/A'}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Capital</span>
      <span class="detail-value">${country.capital?.[0] || 'N/A'}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Region</span>
      <span class="detail-value">${country.region || 'N/A'}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Subregion</span>
      <span class="detail-value">${country.subregion || 'N/A'}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Population</span>
      <span class="detail-value">${formatNumber(country.population)}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Area</span>
      <span class="detail-value">${formatArea(country.area)}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Languages</span>
      <span class="detail-value">${languages}</span>
    </div>
    <div class="detail-item">
      <span class="detail-label">Currencies</span>
      <span class="detail-value">${currencies}</span>
    </div>
  `;

    // Update favorite button
    updateFavoriteButton(favBtn, country.cca3);

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

export function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        currentCountry = null;
    }
}

function updateFavoriteButton(btn, countryCode) {
    if (!btn) return;

    const isFav = favorites.has(countryCode);
    btn.textContent = isFav ? '⭐ Saved' : '⭐ Save to Favorites';
    btn.onclick = () => {
        if (favorites.has(countryCode)) {
            favorites.remove(countryCode);
            btn.textContent = '⭐ Save to Favorites';
        } else {
            favorites.add(countryCode);
            btn.textContent = '⭐ Saved';
        }
    };
}

// ===== MODAL EVENT LISTENERS =====
export function initModal() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    const closeBtn2 = document.getElementById('modal-close-btn');

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (closeBtn2) closeBtn2.addEventListener('click', closeModal);

    if (overlay) {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });
    }

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// ===== INITIALIZE ON LOAD =====
initHamburgerMenu();
updateFooterDates();
initModal();
