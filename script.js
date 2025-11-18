// ===== PART 3: JAVASCRIPT ENHANCEMENTS =====

// Gallery images data
const galleryImages = [
    {
        title: 'Community Festival Celebration',
        description: 'Annual community festival brought together hundreds of residents for food, music, and games in Central Park. The event featured local performers, food vendors, and activities for all ages.',
        color: '#2c3e50'
    },
    {
        title: 'New Riverside Park Opening',
        description: 'Mayor Johnson cuts the ribbon at the grand opening of the new Riverside Park featuring state-of-the-art playgrounds, walking trails, and picnic areas for families to enjoy.',
        color: '#ff6b35'
    },
    {
        title: 'Grand City Food Festival',
        description: 'Local vendors and food trucks gathered for the annual food festival, showcasing the best of local cuisine. The event attracted over 5,000 visitors throughout the weekend.',
        color: '#27ae60'
    },
    {
        title: 'Science Competition Winners',
        description: 'Grand Valley High School students celebrate their first-place win in the regional science competition with their innovative solar-powered water purification system project.',
        color: '#3498db'
    }
];

let currentImageIndex = 0;

// Initialize all JavaScript functionality when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Daily Grand website initialized');
    
    // PART 3: Initialize form validation for contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            validateContactForm(event);
        });
    }
    
    // PART 3: Initialize form validation for advertise form
    const advertiseForm = document.getElementById('advertiseForm');
    if (advertiseForm) {
        advertiseForm.addEventListener('submit', function(event) {
            validateAdvertiseForm(event);
        });
    }
    
    // PART 3: Initialize lightbox functionality
    initializeLightbox();
    
    // PART 3: Initialize news filtering if available
    initializeNewsFiltering();
    
    // PART 3: Initialize character counters
    initializeCharacterCounters();
});

// PART 3: Initialize lightbox functionality
function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        console.log('Lightbox element not found - skipping initialization');
        return;
    }
    
    // Close lightbox when clicking outside content
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        const lightbox = document.getElementById('lightbox');
        if (lightbox && lightbox.style.display === 'block') {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
    
    console.log('Lightbox functionality initialized');
}

// PART 3: Initialize news filtering
function initializeNewsFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const category = this.getAttribute('data-category') || 'all';
                filterNews(category, this);
            });
        });
        console.log('News filtering initialized');
    }
}

// PART 3: Initialize character counters
function initializeCharacterCounters() {
    const messageFields = document.querySelectorAll('textarea[data-max-length]');
    messageFields.forEach(field => {
        field.addEventListener('input', function() {
            const maxLength = this.getAttribute('data-max-length') || 1000;
            const currentLength = this.value.length;
            const counter = this.parentNode.querySelector('.char-count');
            
            if (counter) {
                counter.textContent = `${currentLength}/${maxLength}`;
                
                // Update color based on length
                if (currentLength > maxLength * 0.9) {
                    counter.className = 'char-count error';
                } else if (currentLength > maxLength * 0.75) {
                    counter.className = 'char-count warning';
                } else {
                    counter.className = 'char-count';
                }
            }
        });
    });
}

// PART 3: News filtering functionality
function filterNews(category, buttonElement) {
    console.log('Filtering news by category:', category);
    
    // Remove active class from all filter buttons
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
    
    // Get all news cards
    const newsCards = document.querySelectorAll('.news-card');
    
    // Show/hide news cards based on selected category
    newsCards.forEach(card => {
        if (category === 'all') {
            // Show all cards if 'all' is selected
            card.style.display = 'block';
            card.classList.remove('hidden');
        } else {
            // Show only cards with matching data-category attribute
            if (card.getAttribute('data-category') === category) {
                card.style.display = 'block';
                card.classList.remove('hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('hidden');
            }
        }
    });
    
    // Add smooth animation
    newsCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            if (card.style.display !== 'none') {
                card.style.opacity = '1';
            }
        }, 50);
    });
}

// PART 3: Team member bio display functionality
function showBio(member) {
    console.log('Showing bio for:', member);
    
    // Object containing team member biographies
    const bios = {
        sarah: {
            name: "Sarah Johnson",
            position: "Editor-in-Chief",
            bio: "Sarah has been leading our newsroom since 2018 with 15 years of journalism experience. She holds a Master's degree in Journalism and is passionate about community-driven storytelling.",
            email: "sarah@dailygrand.com"
        },
        mike: {
            name: "Mike Chen", 
            position: "Senior Reporter",
            bio: "Mike covers local government and community affairs with 8 years of experience. He's won three regional awards for investigative reporting and is a Grand Valley native.",
            email: "mike@dailygrand.com"
        },
        lisa: {
            name: "Lisa Rodriguez",
            position: "Community Editor", 
            bio: "Lisa focuses on human interest stories and events. She previously worked in community outreach and organizes our annual 'Neighborhood Heroes' series.",
            email: "lisa@dailygrand.com"
        }
    };
    
    const memberData = bios[member];
    if (!memberData) {
        console.error('Member not found:', member);
        return;
    }
    
    // Create and show modal with bio information
    showBioModal(memberData);
}

// PART 3: Show bio in modal
function showBioModal(memberData) {
    // Create modal element if it doesn't exist
    let modal = document.getElementById('bioModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'bioModal';
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-btn">&times;</span>
                <div class="bio-content">
                    <h3 id="bio-name"></h3>
                    <p id="bio-position" class="position"></p>
                    <p id="bio-text" class="bio-text"></p>
                    <p class="contact-email">Contact: <span id="bio-email"></span></p>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Add close functionality
        modal.querySelector('.close-btn').addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close when clicking outside
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Populate modal with data
    document.getElementById('bio-name').textContent = memberData.name;
    document.getElementById('bio-position').textContent = memberData.position;
    document.getElementById('bio-text').textContent = memberData.bio;
    document.getElementById('bio-email').textContent = memberData.email;
    
    // Show modal
    modal.style.display = 'block';
}

// PART 3: Advertising inquiry form display
function showInquiryForm(packageType) {
    console.log('Showing inquiry form for package:', packageType);
    
    // Set the package type in hidden form field
    const packageField = document.getElementById('packageType');
    if (packageField) {
        packageField.value = packageType;
    }
    
    // Show the inquiry form
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.style.display = 'block';
        
        // Scroll to the form for better user experience
        window.scrollTo({
            top: inquiryForm.offsetTop - 20,
            behavior: 'smooth'
        });
    } else {
        console.error('Inquiry form element not found');
    }
}

// PART 3: Hide advertising inquiry form
function hideInquiryForm() {
    console.log('Hiding inquiry form');
    const inquiryForm = document.getElementById('inquiryForm');
    if (inquiryForm) {
        inquiryForm.style.display = 'none';
    }
}

// PART 3: Contact form validation function
function validateContactForm(event) {
    console.log('Validating contact form');
    
    // Prevent form from submitting normally
    event.preventDefault();
    
    // Get form elements
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const subject = document.getElementById('subject');
    
    // Basic validation checks
    let isValid = true;
    let errorMessage = '';
    
    // Validate name field
    if (!name || name.value.trim().length < 2) {
        errorMessage = 'Please enter your full name (minimum 2 characters)';
        isValid = false;
    }
    // Validate email format using regex
    else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    // Validate message length
    else if (!message || message.value.trim().length < 10) {
        errorMessage = 'Please enter a message with at least 10 characters';
        isValid = false;
    }
    
    // If all validations pass, process the form
    if (isValid) {
        processContactForm();
    } else {
        showValidationError(errorMessage);
    }
    
    return false;
}

// PART 3: Advertising form validation function
function validateAdvertiseForm(event) {
    console.log('Validating advertise form');
    event.preventDefault();
    
    // Get form elements
    const businessName = document.getElementById('businessName');
    const contactPerson = document.getElementById('contactPerson');
    const email = document.getElementById('adEmail');
    const phone = document.getElementById('adPhone');
    
    let isValid = true;
    let errorMessage = '';
    
    // Validate business name
    if (!businessName || businessName.value.trim().length < 2) {
        errorMessage = 'Please enter your business name';
        isValid = false;
    }
    // Validate contact person
    else if (!contactPerson || contactPerson.value.trim().length < 2) {
        errorMessage = 'Please enter contact person name';
        isValid = false;
    }
    // Validate email
    else if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        errorMessage = 'Please enter a valid email address';
        isValid = false;
    }
    // Validate phone number (basic check)
    else if (!phone || phone.value.replace(/\D/g, '').length < 10) {
        errorMessage = 'Please enter a valid phone number';
        isValid = false;
    }
    
    if (isValid) {
        processAdvertiseForm();
    } else {
        showValidationError(errorMessage);
    }
    
    return false;
}

// PART 3: Process contact form submission
function processContactForm() {
    console.log('Processing contact form submission');
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject');
    const subjectText = subject ? subject.options[subject.selectedIndex].text : 'General Inquiry';
    
    // Create success message
    const successMessage = `
        <div class="success-message">
            <h3>✅ Message Sent Successfully!</h3>
            <p>Thank you, <strong>${name}</strong>! Your message has been received.</p>
            <p>We will respond to <strong>${email}</strong> within 48 hours.</p>
            <p><em>Subject: ${subjectText}</em></p>
        </div>
    `;
    
    // Display success message
    const formResponse = document.getElementById('formResponse');
    if (formResponse) {
        formResponse.innerHTML = successMessage;
        
        // Reset the form
        document.getElementById('contactForm').reset();
        
        // Scroll to success message
        formResponse.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
        
        // Add animation
        formResponse.style.opacity = '0';
        formResponse.style.transform = 'translateY(20px)';
        formResponse.style.transition = 'all 0.5s ease';
        
        setTimeout(() => {
            formResponse.style.opacity = '1';
            formResponse.style.transform = 'translateY(0)';
        }, 100);
    }
}

// PART 3: Process advertising form submission
function processAdvertiseForm() {
    console.log('Processing advertise form submission');
    
    const businessName = document.getElementById('businessName').value;
    const packageType = document.getElementById('packageType');
    const packageValue = packageType ? packageType.value : 'unknown';
    
    const packageNames = {
        'banner': 'Banner Advertising',
        'sponsored': 'Sponsored Content',
        'newsletter': 'Newsletter Sponsorship',
        'unknown': 'Advertising Package'
    };
    
    const successMessage = `
        <div class="success-message">
            <h3>✅ Inquiry Submitted!</h3>
            <p>Thank you, <strong>${businessName}</strong>!</p>
            <p>Your inquiry about <strong>${packageNames[packageValue]}</strong> has been received.</p>
            <p>Our advertising team will contact you within 24 hours.</p>
        </div>
    `;
    
    // Display success message
    const formResponse = document.getElementById('formResponse') || document.getElementById('inquiryForm');
    if (formResponse) {
        formResponse.innerHTML = successMessage;
        
        // Hide the form and reset it
        hideInquiryForm();
        const advertiseForm = document.getElementById('advertiseForm');
        if (advertiseForm) {
            advertiseForm.reset();
        }
        
        // Scroll to success message
        formResponse.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    } else {
        // Fallback to alert
        alert('Inquiry submitted successfully! Our team will contact you soon.');
        hideInquiryForm();
        const advertiseForm = document.getElementById('advertiseForm');
        if (advertiseForm) {
            advertiseForm.reset();
        }
    }
}

// PART 3: Helper function to show validation errors
function showValidationError(message) {
    console.log('Validation error:', message);
    
    // Try to show error in a nice modal/notification
    let errorDiv = document.getElementById('errorNotification');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'errorNotification';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            max-width: 300px;
        `;
        document.body.appendChild(errorDiv);
    }
    
    errorDiv.innerHTML = `<strong>Error:</strong> ${message}`;
    errorDiv.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}

// PART 3: Lightbox Gallery Functions
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const imageCounter = document.getElementById('image-counter');
    
    if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxDescription || !imageCounter) {
        console.error('Lightbox elements not found');
        return;
    }
    
    currentImageIndex = index;
    const image = galleryImages[index];
    
    // Set lightbox content
    lightboxImage.style.background = image.color;
    lightboxImage.innerHTML = `<span>${image.title}</span>`;
    lightboxTitle.textContent = image.title;
    lightboxDescription.textContent = image.description;
    imageCounter.textContent = `${index + 1} / ${galleryImages.length}`;
    
    // Show lightbox
    lightbox.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons
    updateNavigationButtons();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Loop around if at ends
    if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    } else if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    }
    
    openLightbox(currentImageIndex);
}

function updateNavigationButtons() {
    // This function can be expanded to disable buttons at ends if needed
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (prevBtn && nextBtn) {
        prevBtn.style.opacity = '1';
        nextBtn.style.opacity = '1';
    }
}

// PART 3: Additional utility functions
function initializeNewsTicker() {
    console.log('News ticker initialized');
    // This function could be enhanced to dynamically load news headlines
}

// PART 3: Smooth scroll to element
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// PART 3: Mobile menu toggle (if needed)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    if (navMenu) {
        navMenu.classList.toggle('active');
    }
}

// Export functions for global access (if using modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        filterNews,
        showBio,
        showInquiryForm,
        hideInquiryForm,
        validateContactForm,
        validateAdvertiseForm,
        openLightbox,
        closeLightbox,
        changeImage
    };
}