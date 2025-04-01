// DOM Elements
const profileForm = document.getElementById('profile-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addressInput = document.getElementById('address');
const ageInput = document.getElementById('age');
const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const phoneError = document.getElementById('phone-error');
const addressError = document.getElementById('address-error');
const ageError = document.getElementById('age-error');
const resetButton = document.getElementById('reset-profile');
const emptyProfileMessage = document.getElementById('empty-profile-message');
const profileContent = document.getElementById('profile-content');
const playerIdElement = document.getElementById('player-id');
const profileNameElement = document.getElementById('profile-name');
const profileEmailElement = document.getElementById('profile-email');
const profilePhoneElement = document.getElementById('profile-phone');
const profileAddressElement = document.getElementById('profile-address');
const profileAgeElement = document.getElementById('profile-age');

// LocalStorage key
const PROFILE_STORAGE_KEY = 'playerProfile';

// Event Listeners
document.addEventListener('DOMContentLoaded', loadProfile);
profileForm.addEventListener('submit', handleFormSubmit);
resetButton.addEventListener('click', resetProfile);

// Functions
/**
 * Generate a unique player ID
 * @returns {string} - A unique alphanumeric ID
 */
function generatePlayerId() {
    // Create a timestamp component
    const timestamp = Date.now().toString(36);
    
    // Create a random component
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Combine with a prefix 'PLAYER'
    return `PLAYER-${timestamp}-${randomPart}`;
}

/**
 * Validate the form inputs
 * @returns {boolean} - True if all inputs are valid, false otherwise
 */
function validateForm() {
    let isValid = true;
    
    // Validate name
    if (!nameInput.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    } else if (nameInput.value.trim().length < 2) {
        nameError.textContent = 'Name must be at least 2 characters';
        isValid = false;
    } else {
        nameError.textContent = '';
    }
    
    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    } else {
        emailError.textContent = '';
    }
    
    // Validate phone
    if (!phoneInput.value.trim()) {
        phoneError.textContent = 'Phone number is required';
        isValid = false;
    } else if (phoneInput.value.trim().length < 10) {
        phoneError.textContent = 'Please enter a valid phone number';
        isValid = false;
    } else {
        phoneError.textContent = '';
    }
    
    // Validate address
    if (!addressInput.value.trim()) {
        addressError.textContent = 'Address is required';
        isValid = false;
    } else {
        addressError.textContent = '';
    }
    
    // Validate age
    const age = parseInt(ageInput.value);
    if (!ageInput.value) {
        ageError.textContent = 'Age is required';
        isValid = false;
    } else if (isNaN(age) || age < 1 || age > 120) {
        ageError.textContent = 'Age must be between 1 and 120';
        isValid = false;
    } else {
        ageError.textContent = '';
    }
    
    return isValid;
}

/**
 * Handle form submission
 * @param {Event} event - Form submit event
 */
function handleFormSubmit(event) {
    event.preventDefault();
    
    if (!validateForm()) {
        return;
    }
    
    // Show loading state
    const submitButton = profileForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Creating Profile...';
    submitButton.disabled = true;
    
    try {
        // Get form values
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const address = addressInput.value.trim();
        const age = parseInt(ageInput.value);
        
        // Generate player ID
        const playerId = generatePlayerId();
        
        // Create profile data object
        const profileData = {
            name,
            email,
            phone,
            address,
            age,
            playerId
        };
        
        // Save to local storage
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profileData));
        
        // Update the profile display
        displayProfile(profileData);
        
        // Reset the form
        profileForm.reset();
        
        // Show success message
        showFeedbackMessage('Profile created successfully!', 'success');
    } catch (error) {
        console.error('Error creating profile:', error);
        showFeedbackMessage('Failed to create profile. Please try again.', 'error');
    } finally {
        // Reset button state
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
    }
}

/**
 * Display a feedback message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message (success or error)
 */
function showFeedbackMessage(message, type = 'success') {
    const feedbackMessage = document.createElement('div');
    feedbackMessage.textContent = message;
    feedbackMessage.className = 'feedback-message';
    
    if (type === 'success') {
        feedbackMessage.style.backgroundColor = 'var(--success)';
    } else {
        feedbackMessage.style.backgroundColor = 'var(--error)';
    }
    
    feedbackMessage.style.color = 'white';
    feedbackMessage.style.padding = '10px';
    feedbackMessage.style.textAlign = 'center';
    feedbackMessage.style.borderRadius = 'var(--border-radius)';
    feedbackMessage.style.marginTop = '10px';
    
    const container = document.querySelector('.container');
    container.insertBefore(feedbackMessage, container.firstChild);
    
    // Remove feedback after a delay
    setTimeout(() => {
        container.removeChild(feedbackMessage);
    }, 3000);
}

/**
 * Display the profile data in the profile card
 * @param {Object} profileData - The profile data object
 */
function displayProfile(profileData) {
    if (!profileData) {
        emptyProfileMessage.style.display = 'flex';
        profileContent.style.display = 'none';
        resetButton.style.display = 'none';
        return;
    }
    
    // Hide empty state, show profile content
    emptyProfileMessage.style.display = 'none';
    profileContent.style.display = 'block';
    resetButton.style.display = 'block';
    
    // Set profile values
    playerIdElement.textContent = profileData.playerId;
    profileNameElement.textContent = profileData.name;
    profileEmailElement.textContent = profileData.email;
    profilePhoneElement.textContent = profileData.phone;
    profileAddressElement.textContent = profileData.address;
    profileAgeElement.textContent = profileData.age;
    
    // Refresh Feather icons if available
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
}

/**
 * Load profile data from local storage
 */
function loadProfile() {
    try {
        // Get profile from local storage
        const profileData = localStorage.getItem(PROFILE_STORAGE_KEY);
        
        if (profileData) {
            // Parse the stored JSON string
            const profile = JSON.parse(profileData);
            displayProfile(profile);
        } else {
            // No profile found
            displayProfile(null);
        }
    } catch (error) {
        console.error('Error loading profile from local storage:', error);
        displayProfile(null);
    }
}

/**
 * Reset profile by removing it from local storage
 */
function resetProfile() {
    if (confirm('Are you sure you want to reset your profile?')) {
        try {
            // Check if we have a profile
            const profileData = localStorage.getItem(PROFILE_STORAGE_KEY);
            
            if (!profileData) {
                throw new Error('No profile found to delete');
            }
            
            // Clear from local storage
            localStorage.removeItem(PROFILE_STORAGE_KEY);
            
            // Update the display
            displayProfile(null);
            
            // Show success message
            showFeedbackMessage('Profile has been reset successfully', 'success');
        } catch (error) {
            console.error('Error resetting profile:', error);
            showFeedbackMessage('Failed to reset profile. Please try again.', 'error');
        }
    }
}

// Add input event listeners for real-time validation
nameInput.addEventListener('input', function() {
    if (nameInput.value.trim().length > 0) {
        nameError.textContent = '';
    }
});

emailInput.addEventListener('input', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() && emailPattern.test(emailInput.value.trim())) {
        emailError.textContent = '';
    }
});

phoneInput.addEventListener('input', function() {
    if (phoneInput.value.trim().length >= 10) {
        phoneError.textContent = '';
    }
});

addressInput.addEventListener('input', function() {
    if (addressInput.value.trim().length > 0) {
        addressError.textContent = '';
    }
});

ageInput.addEventListener('input', function() {
    const age = parseInt(ageInput.value);
    if (ageInput.value && !isNaN(age) && age >= 1 && age <= 120) {
        ageError.textContent = '';
    }
});