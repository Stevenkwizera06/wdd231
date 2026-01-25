// --- Common Logic (Nav & Footer) --- //

// Hamburger Menu Toggle
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("show");
    });
}

// Footer Dates
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

if (currentYear) {
    const today = new Date();
    currentYear.textContent = today.getFullYear();
}

if (lastModified) {
    lastModified.textContent = `Last Modification: ${document.lastModified}`;
}


// --- Home Page Specific Logic --- //

// Weather API Configuration
// OpenWeatherMap API key - Active and configured
const apiKey = 'dd89002c5c6c7d50edccfb9817c994c5';

// Coordinates for Timbuktu, Mali
const lat = 16.7666;
const lon = -3.0026;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        console.log('Fetching weather from:', weatherUrl);
        const response = await fetch(weatherUrl);
        console.log('Weather API Response Status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Weather data received:', data);
            displayCurrentWeather(data);
        } else {
            const errorText = await response.text();
            console.error('Weather API Error:', response.status, errorText);

            let errorMessage = `Error loading weather. Status: ${response.status}`;
            if (response.status === 401) {
                errorMessage = 'API Key Error: Unauthorized. Check if key is activated or if domain restrictions block it.';
            } else if (response.status === 404) {
                errorMessage = 'Location not found.';
            } else if (response.status === 429) {
                errorMessage = 'Too many requests. API limit reached.';
            }

            document.getElementById('weather-info').innerHTML = `<p>${errorMessage}</p><p style="font-size: 0.8em; color: red;">${errorText.slice(0, 50)}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        document.getElementById('weather-info').innerHTML = '<p>Network error. Check console for details.</p>';
    }
}

async function fetchForecast() {
    try {
        console.log('Fetching forecast from:', forecastUrl);
        const response = await fetch(forecastUrl);
        console.log('Forecast API Response Status:', response.status);

        if (response.ok) {
            const data = await response.json();
            console.log('Forecast data received:', data);
            displayForecast(data);
        } else {
            const errorText = await response.text();
            console.error('Forecast API Error:', response.status, errorText);
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    weatherInfo.innerHTML = `
        <img id="weather-icon" src="${iconUrl}" alt="${desc}">
        <div>
            <p><strong>${temp}°F</strong></p>
            <p style="text-transform: capitalize;">${desc}</p>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-info');
    forecastContainer.innerHTML = ''; // Clear loading

    // Filter for one forecast per day (approx noon)
    // We want the *next* 3 days. API returns 5 days/3h data (40 items).
    // We can filter by "12:00:00" in dt_txt string, then slice 0-3.
    // If we are past 12:00 today, the first 12:00 might be tomorrow. 
    // If it's morning today, the first 12:00 is today. We generally want *forecast* (tomorrow onwards).

    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

    const nextThreeDays = data.list.filter(item => {
        return item.dt_txt.includes('12:00:00') && !item.dt_txt.startsWith(today);
    }).slice(0, 3);

    nextThreeDays.forEach(day => {
        const date = new Date(day.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('forecast-day');
        dayDiv.innerHTML = `
            <p>${dayName}</p>
            <img src="${iconUrl}" alt="${day.weather[0].description}" width="40" height="40">
            <p>${temp}°F</p>
        `;
        forecastContainer.appendChild(dayDiv);
    });
}


// Member Spotlights
const membersUrl = 'data/members.json';

async function fetchMembers() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        // Filter Gold (3) and Silver (2)
        const qualifiedMembers = data.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
        displaySpotlights(qualifiedMembers);
    } catch (error) {
        console.error('Error fetching members:', error);
        document.getElementById('spotlight-container').innerHTML = '<p>Unable to load members.</p>';
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = ''; // Clear loading

    // Shuffle array
    const shuffled = members.sort(() => 0.5 - Math.random());

    // Pick 2 or 3
    const selected = shuffled.slice(0, 3); // Get top 3

    selected.forEach(member => {
        const div = document.createElement('div');
        div.classList.add('spotlight-member');

        // Level text
        let levelName = member.membershipLevel === 3 ? 'Gold Partner' : 'Silver Partner';

        div.innerHTML = `
            <h4>${member.name}</h4>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy">
            <p class="member-level">${levelName}</p>
            <hr>
            <div class="member-info">
                <p>${member.phone}</p>
                <p>${member.address}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
            </div>
        `;
        container.appendChild(div);
    });
}

// Initialize
fetchWeather();
fetchForecast();
fetchMembers();
