import {
    initializeApp
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyASt6wxBGqvOKZc8PrRWH5w4PcqDvQ_5Bs",
    authDomain: "portfolio-dc1db.firebaseapp.com",
    projectId: "portfolio-dc1db",
    storageBucket: "portfolio-dc1db.firebasestorage.app",
    messagingSenderId: "199780399490",
    appId: "1:199780399490:web:f5735f8d7cb17fa64b779b",
    measurementId: "G-XMHLJ638JT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    try {
        await addDoc(collection(db, 'messages'), {
            name,
            email,
            message,
            createdAt: serverTimestamp()
        });

        form.reset();
    } catch (err) {
        console.error('Error sending message:', err);
    }
});
/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: "top",
    distance: "60px",
    duration: 1700,
    delay: 400,
    reset: true,
});

// Update these selectors to match your actual class names
/*sr.reveal(`.header`, {
delay: 50,
    scale: 0.5,
    origin: "top",
    distance: "100px"
});*/
sr.reveal(`.header`, { // Uncommented and updated this block
    delay: 50,
    origin: "top",
    distance: "20px", // Reduced distance for a more subtle effect
    duration: 1000, // Adjusted duration for a quicker fade-in
    // scale: 1,      // Optional: set to 1 or remove if no scaling is desired
});
sr.reveal(`.hero-content`);
sr.reveal(`.hero-avatar`, {
    delay: 100
});
sr.reveal(`.hero-socials, .scroll-down`, {
    delay: 100,
    origin: "bottom"
});
sr.reveal(`.about-photo-container`, {
    delay: 100,
    origin: "left",
    scale: 0.9,
    distance: "30px"
});
sr.reveal(`.about-title, .about-description, .btn-filled`, {
    delay: 100,
    scale: 0.9,
    origin: "right",
    distance: "30px"
});
// Animate skill bars when experience-card is revealed
sr.reveal('.experience-card', {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px",
    afterReveal: function(el) {
        el.querySelectorAll('.skill-bar-fill').forEach(bar => {
            // Get the target width from the data-width attribute
            const targetWidth = bar.getAttribute('data-width');
            if (targetWidth) {
                animateBar(bar, parseInt(targetWidth, 10));
            }
        });
    }
});

// Pure JS animation function
function animateBar(bar, targetPercent) {
    bar.style.width = '0%';
    const duration = 1200; // ms
    const startTime = performance.now();

    function animate(time) {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentWidth = progress * targetPercent;
        bar.style.width = currentWidth + '%';
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            bar.style.width = targetPercent + '%'; // Ensure it ends exactly at target
        }
    }
    bar.style.width = '0%'; // Ensure it starts at 0
    requestAnimationFrame(animate);
}
sr.reveal(`.services-title, .service-card`, {
    delay: 100,
    scale: 0.9,
    origin: "top",
    distance: "30px"
});
sr.reveal(`.portfolio-card`, {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px"
});
sr.reveal(`.contact-info, .contact-title-container`, {
    delay: 100,
    scale: 0.9,
    origin: "left",
    distance: "30px"
});
sr.reveal(`.contact-form-container, .contact-title-container`, {
    delay: 100,
    scale: 0.9,
    origin: "right",
    distance: "30px"
});
sr.reveal(`.footer, .footer-container`, {
    delay: 100,
    scale: 0.9,
    origin: "bottom",
    distance: "30px"
});
sr.reveal(`.bottom-nav`, { // Added reveal for the bottom navigation
    delay: 200, // Slightly increased delay to ensure it appears after main content
    scale: 0.9,
    origin: "bottom",
    distance: "50px"
});


/*=============== THEME TOGGLE ===============*/
const themeButton = document.querySelector('.theme-toggle');
const body = document.body;
const themeIcon = themeButton.querySelector('i');

// Function to apply the saved theme or default to dark
const applyTheme = (theme) => {
    if (theme === 'light') {
        body.classList.add('light-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
};

// Check for saved theme in localStorage
let currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    applyTheme(currentTheme);
} else {
    // Default to dark mode if no theme is saved
    applyTheme('dark');
}

themeButton.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'dark');
    }
});

setTimeout(() => {
    document.body.classList.remove('loading');
}, 0);