// Get references to the message form and the element to display saved messages.
const messageForm = document.getElementById('messageForm');
const savedMessages = document.getElementById('savedMessages');

// Event listener to render messages when the page loads.
document.addEventListener('DOMContentLoaded', function () {
    renderMessages();
});

// Event listener to handle message form submission.
messageForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get the title and body of the message from the form.
    const title = messageForm.title.value;
    const body = messageForm.body.value;

    // Create a new Message object and store it in local storage.
    let message = new Message(title, body);
    storeMessage(message);

    // Render the updated list of messages.
    renderMessages();
});

/**
 * Stores a message in local storage.
 * @param {Message} message - The message object to be stored.
 */
function storeMessage(message) {
    localStorage.setItem(`message.${message.getName()}`, message.getBody());
}

// Function to render the list of saved messages.
function renderMessages() {
    savedMessages.innerHTML = '';

    // Iterate through local storage keys and extract messages.
    for (let key in localStorage) {
        if (key.startsWith('message.')) {
            const title = key.split('.')[1];
            const body = localStorage.getItem(key);

            // Create HTML elements to display the message and a delete button.
            savedMessages.innerHTML += `
                <div class="message">
                    <div class="messageTitle">Title: ${title}</div>
                    <div class="messageBody">${body}</div>
                    <button onclick="deleteMessage('${title}'); renderMessages()">Delete</button>
                </div>
            `;
        }
    }
}

// Function to delete a message from local storage.
/**
 * Deletes a message from local storage.
 * @param {string} title - The title of the message to be deleted.
 */
function deleteMessage(title) {
    localStorage.removeItem(`message.${title}`);
}

// Class definition for a Message with title and body properties.
class Message {
    _title = null;
    _body = null;

    /**
     * Create a new Message object.
     * @param {string} title - The title of the message.
     * @param {string} body - The body of the message.
     */
    constructor(title, body) {
        this._title = title;
        this._body = body;
    }

    /**
     * Get the title of the message.
     * @returns {string} The title of the message.
     */
    getName() { return this._title; }

    /**
     * Get the body of the message.
     * @returns {string} The body of the message.
     */
    getBody() { return this._body; }
}
