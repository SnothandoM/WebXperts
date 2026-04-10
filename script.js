// FORM VALIDATION FUNCTIONS
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9\s\-\+\(\)]{10,}$/;
    return regex.test(phone);
}

// UTILITY FUNCTION: Show message with styling
function showMessage(element, text, type) {
    if (!element) return;

    element.textContent = text;
    element.className = type; // 'success' or 'error'
    element.style.display = "block";

    // Auto-hide after 5 seconds
    setTimeout(() => {
        element.style.display = "none";
    }, 5000);
}

// DONATION FORM
const donationForm = document.getElementById("donation-form");

if (donationForm) {
    donationForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const formMsg = document.getElementById("form-msg");

        // Get form values
        const fullname = document.getElementById("fullname").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const donationType = document.getElementById("donation-type").value;
        const quantity = document.getElementById("quantity").value;

        // Validate
        if (!fullname) {
            showMessage(formMsg, "Please enter your full name.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showMessage(formMsg, "Please enter a valid email address.", "error");
            return;
        }

        if (!validatePhone(phone)) {
            showMessage(formMsg, "Please enter a valid phone number.", "error");
            return;
        }

        if (!donationType) {
            showMessage(formMsg, "Please select a donation type.", "error");
            return;
        }

        if (!quantity || quantity < 1) {
            showMessage(formMsg, "Please enter a valid quantity.", "error");
            return;
        }

        // If all valid, show success
        showMessage(formMsg, "✅ Donation submitted successfully! Thank you for your generosity.", "success");
        donationForm.reset();

        // Optional: Send to server (uncomment when backend is ready)
        // sendDonationData({ fullname, email, phone, donationType, quantity });
    });
}

// CONTACT FORM
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const contactMsg = document.getElementById("contact-msg");

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("contact-email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // Validate
        if (!name) {
            showMessage(contactMsg, "Please enter your name.", "error");
            return;
        }

        if (!validateEmail(email)) {
            showMessage(contactMsg, "Please enter a valid email address.", "error");
            return;
        }

        if (!subject) {
            showMessage(contactMsg, "Please enter a subject.", "error");
            return;
        }

        if (!message || message.length < 10) {
            showMessage(contactMsg, "Please enter a message (at least 10 characters).", "error");
            return;
        }

        // If all valid, show success
        showMessage(contactMsg, "✅ Message sent successfully! We'll get back to you soon.", "success");
        contactForm.reset();

        // Optional: Send to server (uncomment when backend is ready)
        // sendContactData({ name, email, subject, message });
    });
}

// SCROLL ANIMATION
const fadeInElements = document.querySelectorAll(".fade-in");

function handleScroll() {
    fadeInElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("show");
        }
    });
}

window.addEventListener("scroll", handleScroll);
handleScroll(); // Run on page load

// SAMPLE DONATION DATA (Mock API)
const sampleDonations = [
    { name: "Winter Clothing Drive", amount: "250 items" },
    { name: "Children's Summer Collection", amount: "180 items" },
    { name: "Professional Wear Donation", amount: "120 items" },
    { name: "Community Support Initiative", amount: "95 items" }
];

// FETCH DONATIONS (Using mock data for school project)
async function fetchDonations() {
    const box = document.getElementById("who-data");
    if (!box) return;

    try {
        // Using mock data - in production, replace with real API
        const data = sampleDonations;

        box.innerHTML = data.map(item => `
            <div class="card">
                <h4>${item.name}</h4>
                <p><strong>${item.amount}</strong></p>
            </div>
        `).join("");

    } catch (error) {
        console.error("Error fetching donations:", error);
        box.innerHTML = "<p>Failed to load donation data.</p>";
    }
}

fetchDonations();

