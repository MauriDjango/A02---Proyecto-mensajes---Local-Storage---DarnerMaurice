const messageForm = document.getElementById('messageForm');
const savedMessages = document.getElementById('savedMessages');

document.addEventListener('DOMContentLoaded', function () {
    renderMessages();
});

messageForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = messageForm.title.value;
    const body = messageForm.body.value

    let message = new Message(title, body)

    storeMessage(message)
    renderMessages()
})

function storeMessage(message) {
    localStorage.setItem(`message.${message.getName()}`, message.getBody())
}

function renderMessages() {
    savedMessages.innerHTML = '';

    for (let key in localStorage) {
        if (key.startsWith('message.')) {
            const title = key.split('.')[1];
            const body = localStorage.getItem(key);

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

function deleteMessage(title) {
    localStorage.removeItem(`message.${title}`);
}

class Message {
    _title = null
    _body = null

    constructor(title, body) {
        this._title = title;
        this._body = body;
    }

    getName() { return this._title }
    getBody() { return this._body }
}
