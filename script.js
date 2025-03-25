// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle Navigation
burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Chatbot functionality
const chatIcon = document.getElementById('chatIcon');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendMessage = document.getElementById('sendMessage');

// Initialize chat state
let isChatOpen = false;

// Toggle chat box
chatIcon.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    chatBox.classList.toggle('active');
    if (isChatOpen) {
        chatIcon.querySelector('.notification-badge').style.display = 'none';
        userInput.focus();
    }
});

closeChat.addEventListener('click', () => {
    isChatOpen = false;
    chatBox.classList.remove('active');
});

// Send message
function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        try {
            // Add user message
            addMessage(message, 'user');
            userInput.value = '';

            // Simulate bot response
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse, 'bot');
            }, 1000);
        } catch (error) {
            console.error('Error sending message:', error);
            addMessage('Sorry, there was an error processing your message. Please try again.', 'bot');
        }
    }
}

// Add message to chat
function addMessage(text, sender) {
    try {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    } catch (error) {
        console.error('Error adding message:', error);
    }
}

// Get bot response
function getBotResponse(message) {
    const responses = {
        'hello': 'Hi! How can I help you today?',
        'hi': 'Hello! What can I do for you?',
        'services': 'We offer residential construction, commercial projects, and renovations. What interests you?',
        'contact': 'You can reach us at (555) 123-4567 or email us at info@grandconstruction.com',
        'quote': 'I can help you get a quote. Please fill out our contact form or call us directly.',
        'projects': 'We have completed various projects including modern homes, office complexes, and renovations. Would you like to see our portfolio?',
        'price': 'Our prices vary based on the project scope. Please contact us for a detailed quote.',
        'location': 'We are located at 123 Construction Ave, City, State 12345.',
        'hours': 'We are open Monday to Friday, 9 AM to 6 PM.',
        'default': 'I understand you\'re interested in our services. Would you like to know more about our projects or get a quote?'
    };

    message = message.toLowerCase();
    for (let key in responses) {
        if (message.includes(key)) {
            return responses[key];
        }
    }
    return responses.default;
}

// Event listeners
sendMessage.addEventListener('click', sendUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

// Prevent form submission on enter key
document.querySelector('.contact-form').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
    }
}); 