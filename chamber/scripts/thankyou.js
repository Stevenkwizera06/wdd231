// Thank You Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Set current year and last modified date in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const lastModifiedP = document.getElementById('lastModified');
    if (lastModifiedP) {
        lastModifiedP.textContent = `Last Modified: ${document.lastModified}`;
    }

    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            mainNav.classList.toggle('show');
        });
    }

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // Display form data
    const firstName = urlParams.get('first-name') || '';
    const lastName = urlParams.get('last-name') || '';
    const email = urlParams.get('email') || '';
    const mobile = urlParams.get('mobile') || '';
    const organization = urlParams.get('organization') || '';
    const timestamp = urlParams.get('timestamp') || '';

    // Populate the display elements
    const displayName = document.getElementById('display-name');
    if (displayName) {
        displayName.textContent = `${firstName} ${lastName}`;
    }

    const displayEmail = document.getElementById('display-email');
    if (displayEmail) {
        displayEmail.textContent = email;
    }

    const displayMobile = document.getElementById('display-mobile');
    if (displayMobile) {
        displayMobile.textContent = mobile;
    }

    const displayOrganization = document.getElementById('display-organization');
    if (displayOrganization) {
        displayOrganization.textContent = organization;
    }

    const displayTimestamp = document.getElementById('display-timestamp');
    if (displayTimestamp && timestamp) {
        // Format the timestamp to a readable date
        const date = new Date(timestamp);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short'
        };
        displayTimestamp.textContent = date.toLocaleDateString('en-US', options);
    }
});
