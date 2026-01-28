// Join Page JavaScript

// Set current year and last modified date in footer
document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Set last modified date
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

    // Set timestamp when form loads
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        timestampField.value = now.toISOString();
    }

    // Modal functionality
    const learnMoreButtons = document.querySelectorAll('.learn-more-btn');

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);

            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close modal functionality
    const closeModalButtons = document.querySelectorAll('.close-modal, .modal-close-btn');

    closeModalButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('dialog');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside (on backdrop)
    const modals = document.querySelectorAll('.membership-modal');

    modals.forEach(modal => {
        modal.addEventListener('click', function (event) {
            const rect = this.getBoundingClientRect();
            const isInDialog = (
                rect.top <= event.clientY &&
                event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX &&
                event.clientX <= rect.left + rect.width
            );

            if (!isInDialog) {
                this.close();
            }
        });
    });

    // Form validation enhancement
    const form = document.getElementById('membership-form');

    if (form) {
        // Add custom validation messages
        const orgTitleInput = document.getElementById('org-title');

        if (orgTitleInput) {
            orgTitleInput.addEventListener('input', function () {
                if (this.value && !this.validity.valid) {
                    this.setCustomValidity('Please enter at least 7 characters using only letters, spaces, and hyphens.');
                } else {
                    this.setCustomValidity('');
                }
            });
        }

        // Form submission
        form.addEventListener('submit', function (event) {
            // Update timestamp right before submission
            if (timestampField) {
                const now = new Date();
                timestampField.value = now.toISOString();
            }
        });
    }
});
