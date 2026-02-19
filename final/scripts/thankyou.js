// thankyou.js - Display form submission data (ES Module)

function displaySubmissionData() {
    const dataContainer = document.getElementById('submission-data');
    if (!dataContainer) return;

    // Get parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);

    // Check if we have any data
    if (urlParams.toString() === "") {
        dataContainer.innerHTML = '<p style="text-align:center; color:var(--text-muted);">No submission data found.</p>';
        return;
    }

    // Map of labels for the keys
    const labels = {
        'first': 'First Name',
        'last': 'Last Name',
        'email': 'Email Address',
        'subject': 'Inquiry Subject',
        'region': 'Favorite Region',
        'message': 'Message Content',
        'timestamp': 'Submission Time'
    };

    let html = '';

    // Iterate through params using forEach on entries or specifically requested keys
    urlParams.forEach((value, key) => {
        const label = labels[key] || key.charAt(0).toUpperCase() + key.slice(1);

        let displayValue = value;
        if (key === 'timestamp') {
            displayValue = new Date(value).toLocaleString();
        }

        html += `
            <div class="data-row">
                <span class="data-label">${label}</span>
                <span class="data-value">${displayValue}</span>
            </div>
        `;
    });

    dataContainer.innerHTML = html;
}

// Initialize
displaySubmissionData();
