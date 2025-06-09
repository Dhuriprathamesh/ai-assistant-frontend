// Get DOM elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Add event listener for Enter key
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Function to send message
async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    // Add user message to chat
    addMessage(message, 'user');
    userInput.value = '';

    try {
        // Send message to backend
        const response = await fetch(`${apiUrl}/api/process_command`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ command: message })
        });

        const data = await response.json();
        
        if (data.error) {
            addMessage('Error: ' + data.error, 'assistant');
        } else {
            addMessage(data.response, 'assistant');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Connection error. Please try again.', 'assistant');
    }
}

// Function to add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Add welcome message
addMessage('Hello! I\'m your AI assistant. How can I help you today?', 'assistant'); 