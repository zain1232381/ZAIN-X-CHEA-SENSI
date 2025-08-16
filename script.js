// DOM Elements
const deviceSearch = document.getElementById('deviceSearch');
const deviceGrid = document.getElementById('deviceGrid');
const deviceModal = document.getElementById('deviceModal');
const modalDeviceName = document.getElementById('modalDeviceName');
const modalSensitivity = document.getElementById('modalSensitivity');
const paymentModal = document.getElementById('paymentModal');
const buyButtons = document.querySelectorAll('.buy-btn');
const closeButtons = document.querySelectorAll('.close');

// Device sensitivity data
const deviceData = {
    'POCO X3': {
        general: 94,
        redDot: 90,
        scope2x: 88,
        scope4x: 85,
        sniperScope: 75,
        freeLook: 80,
        dpi: 480,
        gyro: 850,
        tips: 'Perfect for aggressive gameplay. Adjust gyro sensitivity based on your device orientation.'
    },
    'Samsung A12': {
        general: 96,
        redDot: 92,
        scope2x: 90,
        scope4x: 88,
        sniperScope: 78,
        freeLook: 82,
        dpi: 520,
        gyro: 900,
        tips: 'Optimized for budget devices. Start with these settings and fine-tune as needed.'
    },
    'Redmi Note 10': {
        general: 94,
        redDot: 90,
        scope2x: 88,
        scope4x: 85,
        sniperScope: 75,
        freeLook: 80,
        dpi: 480,
        gyro: 850,
        tips: 'Great balance for both close and long-range combat. Test in training mode first.'
    },
    'Realme 8': {
        general: 95,
        redDot: 92,
        scope2x: 90,
        scope4x: 87,
        sniperScope: 78,
        freeLook: 82,
        dpi: 500,
        gyro: 880,
        tips: 'Smooth tracking settings. Increase gyro for better recoil control.'
    },
    'iPhone 12': {
        general: 93,
        redDot: 89,
        scope2x: 87,
        scope4x: 84,
        sniperScope: 73,
        freeLook: 78,
        dpi: 'N/A (iOS fixed touch)',
        gyro: 850,
        tips: 'iOS optimized settings. Use 3D Touch for better control.'
    },
    'iPhone 12 Pro': {
        general: 94,
        redDot: 90,
        scope2x: 88,
        scope4x: 85,
        sniperScope: 74,
        freeLook: 80,
        dpi: 'N/A',
        gyro: 860,
        tips: 'Pro-level iPhone settings with enhanced sensitivity control.'
    },
    'iPhone 14': {
        general: 95,
        redDot: 91,
        scope2x: 89,
        scope4x: 86,
        sniperScope: 75,
        freeLook: 81,
        dpi: 'N/A',
        gyro: 870,
        tips: 'Latest iPhone settings. Adjust based on your grip style.'
    },
    'iPhone 15': {
        general: 96,
        redDot: 92,
        scope2x: 90,
        scope4x: 87,
        sniperScope: 76,
        freeLook: 82,
        dpi: 'N/A',
        gyro: 880,
        tips: 'Pro-level settings for iPhone 15. Test extensively before ranked matches.'
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeModals();
    initializeBuyButtons();
    addHoverEffects();
});

// Search functionality
function initializeSearch() {
    deviceSearch.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const cards = deviceGrid.querySelectorAll('.device-card');
        
        cards.forEach(card => {
            const deviceName = card.dataset.device.toLowerCase();
            if (deviceName.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Modal functionality
function initializeModals() {
    // Device cards click
    document.querySelectorAll('.device-card').forEach(card => {
        card.addEventListener('click', function() {
            const deviceName = this.dataset.device;
            openDeviceModal(deviceName);
        });
    });

    // Close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            deviceModal.style.display = 'none';
            paymentModal.style.display = 'none';
            // Reset body scroll on mobile
            document.body.style.overflow = '';
        });
    });

    // Click outside modal
    window.addEventListener('click', function(e) {
        if (e.target === deviceModal) {
            deviceModal.style.display = 'none';
            document.body.style.overflow = '';
        }
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
}

// Buy buttons
function initializeBuyButtons() {
    buyButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.dataset.plan;
            openPaymentModal(plan);
        });
    });
}

// Device modal functions
function openDeviceModal(deviceName) {
    const data = deviceData[deviceName];
    if (!data) return;

    modalDeviceName.textContent = deviceName;
    modalSensitivity.innerHTML = `
        <div class="sensitivity-card">
            <h4>Camera Sensitivity</h4>
            <p><strong>${data.camera}</strong></p>
            
            <h4>ADS Sensitivity</h4>
            <p><strong>${data.ads}</strong></p>
            
            <h4>Gyroscope</h4>
            <p><strong>${data.gyro} DPI</strong></p>
            
            <h4>DPI Settings</h4>
            <p><strong>${data.dpi}</strong></p>
            
            <h4>Pro Tips</h4>
            <p>${data.tips}</p>
        </div>
    `;
    
    deviceModal.style.display = 'block';
}

// Payment modal functions
function openPaymentModal(plan) {
    const planDetails = {
        basic: { price: '$15/month', pkr: '2500 PKR' },
        premium: { price: '$25/month', pkr: '3500 PKR' },
        brutal: { price: '$45/month', pkr: '6500 PKR' }
    };
    
    const details = planDetails[plan];
    
    // Check if it's a mobile device
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Adjust modal content for mobile
    const modalContent = paymentModal.querySelector('.modal-content');
    
    paymentModal.querySelector('.modal-content').innerHTML = `
        <span class="close">&times;</span>
        <h2>Complete Your ${plan.charAt(0).toUpperCase() + plan.slice(1)} Panel Purchase</h2>
        
        <div class="payment-methods">
            <div class="payment-option">
                <div class="payment-icon-text" style="font-size: 2rem; color: #00ff41; margin-bottom: 1rem;">💰</div>
                <h3>EasyPaisa</h3>
                <p><strong>Number:</strong> 03275885920</p>
                <p><strong>Name:</strong> Zaheeda Bibi</p>
            </div>
            
            <div class="payment-option">
                <div class="payment-icon-text" style="font-size: 2rem; color: #f0b90b; margin-bottom: 1rem;">₿</div>
                <h3>Binance</h3>
                <p><strong>ID:</strong> 711422429</p>
                <p><strong>Name:</strong> Husnain</p>
            </div>
        </div>
        
        <div class="payment-instructions">
            <h3>After Payment:</h3>
            <p>Send payment proof with:</p>
            <ul>
                <li>Payment screenshot</li>
                <li>Payment method & ID</li>
                <li>Your Discord or YouTube name</li>
            </ul>
            
            <a href="https://wa.me/923229416054" target="_blank" class="whatsapp-btn">
                <i class="fab fa-whatsapp"></i>
                Send Proof on WhatsApp
            </a>
            
            <div class="upload-section">
                <p>Or upload proof here:</p>
                <input type="file" id="paymentProof" accept="image/*">
                <button onclick="uploadProof()">Upload Screenshot</button>
            </div>
        </div>
    `;
    
    // Re-initialize close button for new modal content
    paymentModal.querySelector('.close').addEventListener('click', function() {
        paymentModal.style.display = 'none';
        // Reset body scroll on mobile
        document.body.style.overflow = '';
    });
    
    // Prevent background scroll on mobile when modal is open
    if (isMobile) {
        document.body.style.overflow = 'hidden';
    }
    
    paymentModal.style.display = 'block';
    
    // Ensure modal is properly positioned on mobile
    if (isMobile) {
        setTimeout(() => {
            const modalContent = paymentModal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.scrollTop = 0;
            }
        }, 100);
    }
}

// Copy sensitivity function
function copySensitivity() {
    const deviceName = modalDeviceName.textContent;
    const data = deviceData[deviceName];
    
    const textToCopy = `
Device: ${deviceName}
Camera: ${data.camera}
ADS: ${data.ads}
Gyro: ${data.gyro} DPI
DPI: ${data.dpi}
    `;
    
    navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('Sensitivity settings copied to clipboard!');
    });
}

// Upload proof function
function uploadProof() {
    const fileInput = document.getElementById('paymentProof');
    if (fileInput.files.length > 0) {
        showNotification('Screenshot uploaded successfully! We will contact you shortly.');
        // Here you would typically send the file to your server
    } else {
        showNotification('Please select a screenshot to upload.');
    }
}

// Notification system
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

// Add hover effects
function addHoverEffects() {
    // Add particle effect on hover
    document.querySelectorAll('.device-card, .pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    .notification {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Initialize tooltips
function initializeTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const text = this.dataset.tooltip;
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = text;
            tooltipEl.style.cssText = `
                position: absolute;
                background: var(--bg-secondary);
                color: var(--text-primary);
                padding: 0.5rem;
                border-radius: 5px;
                font-size: 0.8rem;
                z-index: 1000;
                pointer-events: none;
            `;
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.left = rect.left + 'px';
            tooltipEl.style.top = (rect.top - 30) + 'px';
        });
        
        tooltip.addEventListener('mouseleave', function() {
            document.querySelectorAll('.tooltip').forEach(t => t.remove());
        });
    });
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
deviceSearch.addEventListener('input', debounce(function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const cards = deviceGrid.querySelectorAll('.device-card');
    
    cards.forEach(card => {
        const deviceName = card.dataset.device.toLowerCase();
        card.style.display = deviceName.includes(searchTerm) ? 'block' : 'none';
    });
}, 300));

// Add loading states
function showLoading(element) {
    element.innerHTML = '<div class="loading"></div>';
}

function hideLoading(element, content) {
    element.innerHTML = content;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        deviceModal.style.display = 'none';
        paymentModal.style.display = 'none';
    }
});

// Initialize everything
console.log('ZAIN X CHEAT - STORE initialized successfully!');
