// Data Source
const url = 'data/members.json';
const cards = document.querySelector('#members');

// Fetch and Display Members
async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = ''; // Clear existing content

    members.forEach((member) => {
        // Create elements
        let card = document.createElement('section');
        let fullName = document.createElement('h3');
        let img = document.createElement('img');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let membership = document.createElement('p');

        // Set content
        fullName.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = 'Website';
        website.href = member.website;
        website.target = '_blank';
        membership.textContent = `Membership Level: ${getLevel(member.membershipLevel)}`;

        // Set attributes for image
        img.setAttribute('src', member.image);
        img.setAttribute('alt', `Portrait of ${member.name}`);
        img.setAttribute('loading', 'lazy');
        img.setAttribute('width', '200');
        img.setAttribute('height', '150');

        // Append to card
        card.appendChild(img);
        card.appendChild(fullName);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(membership);

        // Append card to container
        cards.appendChild(card);
    });
}

function getLevel(level) {
    switch (level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Member';
    }
}

getMembers();

// Grid/List Toggle Logic
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
const display = document.querySelector("#members");

gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});


// Footer Dates
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

const today = new Date();
currentYear.textContent = today.getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

// Hamburger Menu Toggle
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("show");
});
