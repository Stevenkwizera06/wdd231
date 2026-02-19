// contact.js - Contact page functionality (ES Module)

// ===== ADD TIMESTAMP TO FORM =====
function addTimestamp() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
}

// ===== FORM VALIDATION & SUBMISSION =====
function initForm() {
    const form = document.getElementById('contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            addTimestamp();
            // Form will submit naturally to thankyou.html via GET
        });
    }
}

// Initialize
initForm();
