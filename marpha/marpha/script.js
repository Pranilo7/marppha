// Preloader with Fallback
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (!preloader) {
        console.error('Preloader element not found');
        return;
    }
    // Hide preloader after 1s or immediately if already loaded
    setTimeout(() => {
        preloader.classList.add('hide');
        console.log('Preloader hidden');
    }, 1000);
});

// Fallback to hide preloader after 5s if window.load doesn't fire
setTimeout(() => {
    const preloader = document.querySelector('.preloader');
    if (preloader && !preloader.classList.contains('hide')) {
        preloader.classList.add('hide');
        console.warn('Preloader hidden via fallback');
    }
}, 5000);

// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });
} else {
    console.error('Hamburger or nav-links not found');
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks) {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Back to Top Button
const backToTop = document.querySelector('#back-to-top');
if (backToTop) {
    window.addEventListener('scroll', () => {
        backToTop.classList.toggle('show', window.scrollY > 300);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
} else {
    console.error('Back-to-top button not found');
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        try {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Hero Tagline Animation Trigger
                if (entry.target.classList.contains('hero')) {
                    const tagline = entry.target.querySelector('.hero-tagline');
                    if (tagline) {
                        tagline.style.animation = 'none';
                        tagline.offsetHeight; // Trigger reflow
                        tagline.style.animation = 'typewriter 4s steps(30, end) forwards, blink-caret 0.75s step-end infinite';
                    }
                }
                // Footer Prayer Wheel Pulse
                if (entry.target.tagName === 'FOOTER') {
                    const prayerWheel = entry.target.querySelector('.footer-prayer-wheel');
                    if (prayerWheel) {
                        prayerWheel.classList.add('pulse');
                        setTimeout(() => prayerWheel.classList.remove('pulse'), 1800);
                    }
                }
                // Timeline Items Animation
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate-timeline');
                }
            }
        } catch (error) {
            console.error('Intersection Observer error:', error);
        }
    });
}, observerOptions);

// Observe Sections and Timeline Items
try {
    document.querySelectorAll('.animate-slide-up, .animate-fade-in, .animate-scale-in, .hero, footer, .timeline-item').forEach(element => {
        observer.observe(element);
    });
} catch (error) {
    console.error('Error setting up Intersection Observer:', error);
}

// Footer Social Icons Animation
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach((icon, index) => {
    try {
        icon.style.animationDelay = `${index * 0.2}s`;
        icon.addEventListener('click', (e) => {
            console.log(`Social link clicked: ${e.currentTarget.href}`);
            // Sparkle Effect
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.position = 'absolute';
            sparkle.style.left = `${e.offsetX}px`;
            sparkle.style.top = `${e.offsetY}px`;
            sparkle.style.width = '10px';
            sparkle.style.height = '10px';
            sparkle.style.background = 'radial-gradient(circle, rgba(255,215,0,0.8), transparent)';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.animation = 'sparkle 0.5s ease-out forwards';
            icon.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 500);
        });
    } catch (error) {
        console.error('Social icon animation error:', error);
    }
});

// Menu Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        try {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            menuItems.forEach(item => {
                item.classList.remove('active');
                if (filter === 'all' || item.dataset.category === filter) {
                    item.classList.add('active');
                }
            });
        } catch (error) {
            console.error('Menu filter error:', error);
        }
    });
});

// Recipe Modal
const viewRecipeButtons = document.querySelectorAll('.view-recipe');
const recipeModal = document.querySelector('.recipe-modal');
const closeModal = document.querySelector('.close-modal');

if (recipeModal && closeModal) {
    viewRecipeButtons.forEach(button => {
        button.addEventListener('click', () => {
            recipeModal.style.display = 'flex';
        });
    });

    closeModal.addEventListener('click', () => {
        recipeModal.style.display = 'none';
    });

    recipeModal.addEventListener('click', (e) => {
        if (e.target === recipeModal) {
            recipeModal.style.display = 'none';
        }
    });
} else {
    console.error('Recipe modal or close button not found');
}

// Contact Cards Ripple Effect
const contactCards = document.querySelectorAll('.contact-card');
contactCards.forEach(card => {
    card.addEventListener('click', (e) => {
        try {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--ripple-x', `${x}px`);
            card.style.setProperty('--ripple-y', `${y}px`);
            card.classList.add('ripple');
            setTimeout(() => card.classList.remove('ripple'), 600);
            console.log(`Contact card clicked: ${card.dataset.action}`);
        } catch (error) {
            console.error('Contact card ripple effect error:', error);
        }
    });
});

// Reservation Form and Table Selection
const reservationApp = document.querySelector('#reservation-app');
const reservationForm = document.querySelector('#reservation-app-form');
const dateInput = document.querySelector('#reservation-app-date');
const calendarPopup = document.querySelector('#reservation-app-calendar');
const timeSelect = document.querySelector('#reservation-app-time');
const guestsInput = document.querySelector('#reservation-app-guests');
const tableSelectionSection = document.querySelector('#table-selection');
const tables = document.querySelectorAll('.table');
const confirmButton = document.querySelector('#reservation-app-confirm');

let selectedTable = null;

function generateCalendar(year, month) {
    try {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();
        const currentDay = today.getDate();

        let calendarHTML = `
            <div class="calendar-header">${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}</div>
            <div class="calendar-grid">
                <div class="calendar-day">Sun</div>
                <div class="calendar-day">Mon</div>
                <div class="calendar-day">Tue</div>
                <div class="calendar-day">Wed</div>
                <div class="calendar-day">Thu</div>
                <div class="calendar-day">Fri</div>
                <div class="calendar-day">Sat</div>
        `;

        for (let i = 0; i < firstDay; i++) {
            calendarHTML += '<div class="calendar-date disabled"></div>';
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isDisabled = year < currentYear || (year === currentYear && month < currentMonth) || (year === currentYear && month === currentMonth && day < currentDay);
            calendarHTML += `<div class="calendar-date${isDisabled ? ' disabled' : ''}">${day}</div>`;
        }

        calendarHTML += '</div>';
        if (calendarPopup) {
            calendarPopup.innerHTML = calendarHTML;
            document.querySelectorAll('.calendar-date:not(.disabled)').forEach(date => {
                date.addEventListener('click', () => {
                    dateInput.value = `${year}-${String(month + 1).padStart(2, '0')}-${String(date.textContent).padStart(2, '0')}`;
                    calendarPopup.classList.remove('show');
                });
            });
        }
    } catch (error) {
        console.error('Calendar generation error:', error);
    }
}

if (dateInput && calendarPopup) {
    dateInput.addEventListener('click', () => {
        const today = new Date();
        generateCalendar(today.getFullYear(), today.getMonth());
        calendarPopup.classList.toggle('show');
    });
} else {
    console.error('Date input or calendar popup not found');
}

tables.forEach(table => {
    table.addEventListener('click', () => {
        try {
            if (table.dataset.status !== 'available') return;
            tables.forEach(t => t.classList.remove('selected'));
            table.classList.add('selected');
            selectedTable = table.dataset.tableId;
            if (confirmButton) confirmButton.disabled = false;
        } catch (error) {
            console.error('Table selection error:', error);
        }
    });
});

if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        try {
            e.preventDefault();
            if (dateInput.value && timeSelect.value && guestsInput.value) {
                reservationApp.querySelector('.reservation-section').style.display = 'none';
                tableSelectionSection.style.display = 'block';
                window.scrollTo({ top: tableSelectionSection.offsetTop, behavior: 'smooth' });
            }
        } catch (error) {
            console.error('Reservation form submission error:', error);
        }
    });
} else {
    console.error('Reservation form not found');
}

if (confirmButton) {
    confirmButton.addEventListener('click', () => {
        try {
            if (selectedTable) {
                alert(`Table ${selectedTable} booked for ${dateInput.value} at ${timeSelect.value} for ${guestsInput.value} guests!`);
                reservationForm.reset();
                tables.forEach(t => t.classList.remove('selected'));
                confirmButton.disabled = true;
                reservationApp.querySelector('.reservation-section').style.display = 'block';
                tableSelectionSection.style.display = 'none';
                selectedTable = null;
            }
        } catch (error) {
            console.error('Confirm button error:', error);
        }
    });
} else {
    console.error('Confirm button not found');
}

// Add Sparkle Animation Keyframes
try {
    const styleSheet = document.createElement('style');
    styleSheet.innerHTML = `
        @keyframes sparkle {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(3); opacity: 0; }
        }
    `;
    document.head.appendChild(styleSheet);
} catch (error) {
    console.error('Sparkle animation keyframes error:', error);
}