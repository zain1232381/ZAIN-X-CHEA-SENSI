// Reviews System for ZAIN X CHEAT
// Legitimate customer review system with submission form and display

// DOM Elements
const reviewForm = document.getElementById('reviewForm');
const reviewsContainer = document.getElementById('reviewsContainer');
const totalReviewsElement = document.getElementById('totalReviews');
const averageRatingElement = document.getElementById('averageRating');
const satisfactionRateElement = document.getElementById('satisfactionRate');
const filterDeviceSelect = document.getElementById('filterDevice');

// Sample reviews data (would be populated from backend in production)
let reviews = [
    {
        id: 1,
        customerName: "Ahmed Khan",
        email: "ahmed@example.com",
        device: "POCO X3",
        rating: 5,
        reviewText: "Excellent sensitivity settings! The aimbot head settings work perfectly. Highly recommend!",
        date: "2024-01-15"
    },
    {
        id: 2,
        customerName: "Sarah Ahmed",
        email: "sarah@example.com",
        device: "iPhone 12",
        rating: 4,
        reviewText: "Great settings for iPhone 12. The sniper scope settings are spot on. Would love more iPhone-specific tips.",
        date: "2024-01-10"
    },
    {
        id: 3,
        customerName: "Mohammad Ali",
        email: "mohammad@example.com",
        device: "Samsung A12",
        rating: 5,
        reviewText: "Perfect settings for budget devices. The sensitivity works great for both close and long-range combat.",
        date: "2024-01-08"
    }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeReviewSystem();
    loadReviews();
    setupEventListeners();
});

// Initialize review system
function initializeReviewSystem() {
    if (reviewForm) {
        setupReviewForm();
    }
    if (filterDeviceSelect) {
        setupFilter();
    }
}

// Setup review form
function setupReviewForm() {
    reviewForm.addEventListener('submit', handleReviewSubmit);
    
    // Setup star rating input
    const stars = document.querySelectorAll('.star-rating-input .fa-star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            const rating = index + 1;
            document.getElementById('ratingValue').value = rating;
            updateStarDisplay(rating);
        });
    });
}

// Handle review submission
function handleReviewSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(reviewForm);
    const review = {
        id: Date.now(),
        customerName: formData.get('customerName'),
        email: formData.get('customerEmail'),
        device: formData.get('deviceUsed'),
        rating: parseInt(formData.get('ratingValue')),
        reviewText: formData.get('reviewText'),
        date: new Date().toISOString().split('T')[0]
    };
    
    // Add new review
    reviews.unshift(review);
    
    // Reset form
    reviewForm.reset();
    updateStarDisplay(0);
    
    // Reload reviews
    loadReviews();
    
    // Show success message
    showNotification('Thank you for your review! It has been submitted successfully.');
}

// Load and display reviews
function loadReviews() {
    const container = reviewsContainer;
    if (!container) return;
    
    const filteredReviews = getFilteredReviews();
    
    container.innerHTML = '';
    
    if (filteredReviews.length === 0) {
        container.innerHTML = '<p class="no-reviews">No reviews found for this device.</p>';
        return;
    }
    
    filteredReviews.forEach(review => {
        const reviewCard = createReviewCard(review);
        container.appendChild(reviewCard);
    });
    
    updateStats();
}

// Create review card
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card';
    card.innerHTML = `
        <div class="review-header">
            <h4>${review.customerName}</h4>
            <div class="review-rating">
                ${generateStars(review.rating)}
            </div>
        </div>
        <div class="review-device">
            <span class="device-badge">${review.device}</span>
            <span class="review-date">${review.date}</span>
        </div>
        <div class="review-text">
            <p>${review.reviewText}</p>
        </div>
    `;
    return card;
}

// Generate star display
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star filled"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Update star display
function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-rating-input .fa-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

// Get filtered reviews
function getFilteredReviews() {
    const filterValue = filterDeviceSelect ? filterDeviceSelect.value : 'all';
    
    if (filterValue === 'all') {
        return reviews;
    }
    
    return reviews.filter(review => review.device === filterValue);
}

// Update statistics
function updateStats() {
    const filteredReviews = getFilteredReviews();
    
    totalReviewsElement.textContent = filteredReviews.length;
    
    if (filteredReviews.length > 0) {
        const totalRating = filteredReviews.reduce((sum, review) => sum + review.rating, 0);
        const avgRating = (totalRating / filteredReviews.length).toFixed(1);
        averageRatingElement.textContent = avgRating;
        
        const positiveReviews = filteredReviews.filter(review => review.rating >= 4);
        const satisfactionRate = ((positiveReviews.length / filteredReviews.length) * 100).toFixed(0);
        satisfactionRateElement.textContent = `${satisfactionRate}%`;
    }
}

// Setup filter
function setupFilter() {
    filterDeviceSelect.addEventListener('change', loadReviews);
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--neon-green);
        color: var(--bg-primary);
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// CSS styles for reviews
const style = document.createElement('style');
style.textContent = `
    .review-form-section {
        padding: 2rem;
        background: var(--bg-secondary);
        margin: 2rem 0;
        border-radius: 15px;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.1);
    }

    .review-form {
        max-width: 600px;
        margin: 0 auto;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        color: var(--text-primary);
        font-weight: 600;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.75rem;
        background: var(--bg-primary);
        border: 1px solid var(--neon-green);
        border-radius: 8px;
        color: var(--text-primary);
        font-family: 'Rajdhani', sans-serif;
    }

    .star-rating-input {
        display: flex;
        gap: 0.5rem;
        font-size: 1.5rem;
        cursor: pointer;
    }

    .star-rating-input .fa-star {
        color: #ccc;
        transition: color 0.3s ease;
    }

    .star-rating-input .fa-star.filled {
        color: #ffd700;
    }

    .submit-btn {
        background: var(--neon-green);
        color: var(--bg-primary);
        border: none;
        padding: 1rem 2rem;
        font-size: 1.1rem;
        font-weight: 600;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .submit-btn:hover {
        background: #00cc33;
        transform: translateY(-2px);
    }

    .reviews-section {
        padding: 2rem;
        background: var(--bg-secondary);
        margin: 2rem 0;
        border-radius: 15px;
    }

    .reviews-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .stat-card {
        background: var(--bg-primary);
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;
        box-shadow: 0 0 10px rgba(0, 255, 65, 0.1);
        min-width: 150px;
        margin: 0.5rem;
    }

    .stat-card h3 {
        color: var(--neon-green);
        font-size: 2rem;
        margin-bottom: 0.5rem;
    }

    .reviews-filter {
        margin-bottom: 2rem;
        text-align: center;
    }

    .reviews-filter select {
        padding: 0.5rem;
        background: var(--bg-primary);
        border: 1px solid var(--neon-green);
        border-radius: 5px;
        color: var(--text-primary);
    }

    .reviews-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
    }

    .review-card {
        background: var(--bg-primary);
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 255, 65, 0.1);
        transition: transform 0.3s ease;
    }

    .review-card:hover {
        transform: translateY(-5px);
    }

    .review-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }

    .review-header h4 {
        color: var(--text-primary);
        margin: 0;
    }

    .review-rating {
        color: #ffd700;
    }

    .review-device {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
        font-size: 0.9rem;
        color: var(--text-secondary);
    }

    .device-badge {
        background: var(--neon-green);
        color: var(--bg-primary);
        padding: 0.25rem 0.5rem;
        border-radius: 15px;
        font-size: 0.8rem;
    }

    .review-text {
        color: var(--text-primary);
        line-height: 1.6;
    }

    .no-reviews {
        text-align: center;
        color: var(--text-secondary);
        font-style: italic;
        padding: 2rem;
    }

    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;

document.head.appendChild(style);

// Initialize everything
console.log('Reviews system initialized successfully!');
