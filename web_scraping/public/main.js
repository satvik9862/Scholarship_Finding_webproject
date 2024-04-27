const socket = io()

const clientsTotal = document.getElementById('client-total')
const messageContainer = document.getElementById('message-container')
// const nameInput = document.getElementById('name-input')
const messageForm = document.getElementById('message-form')
const messageInput = document.getElementById('message-input')
const nameInput="satvik";
const messageTone = new Audio('/message-tone.mp3')

messageForm.addEventListener('submit', (e) => {
  e.preventDefault()
  sendMessage()
})

socket.on('clients-total', (data) => {
  clientsTotal.innerText = `Total Clients: ${data}`
})

socket.on('previous-messages', (messages) => {
  messages.forEach((message) => {
    addMessageToUI(message)
    console.log(message.name); // Add each previous message to the UI
  });
});

function sendMessage() {
  if (messageInput.value === '') return
  const data = {
    name: nameInput,
    message: messageInput.value,
    dateTime: new Date(),
  }
  socket.emit('message', data)
  addMessageToUI(data)
  messageInput.value = ''
}

socket.on('chat-message', (data) => {
  messageTone.play()
  addMessageToUI(data)
})

function addMessageToUI(data) {
  const isOwnMessage = data.name === nameInput;
  const alignmentClass = isOwnMessage ? 'message-right' : 'message-left';

  const element = `
    <li class="${alignmentClass}">
      <p class="message">
        ${data.message}
        <span>${data.name} ● ${moment(data.dateTime).fromNow()}</span>
      </p>
    </li>
  `;

  messageContainer.innerHTML += element;
  scrollToBottom();
}

socket.on('name-set', () => {
  socket.emit('request-previous-messages');
});

document.getElementById('username-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = nameInput;
  socket.emit('set-name', name);
});

messageInput.addEventListener('focus', () => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput} is typing a message`,
  })
});

messageInput.addEventListener('keypress', () => {
  socket.emit('feedback', {
    feedback: `✍️ ${nameInput} is typing a message`,
  })
});

messageInput.addEventListener('blur', () => {
  socket.emit('feedback', {
    feedback: '',
  })
});

socket.on('feedback', (data) => {
  clearFeedback();
  const element = `
    <li class="message-feedback">
      <p class="feedback" id="feedback">${data.feedback}</p>
    </li>
  `;
  messageContainer.innerHTML += element;
});

function clearFeedback() {
  document.querySelectorAll('li.message-feedback').forEach((element) => {
    element.parentNode.removeChild(element)
  })
}

function scrollToBottom() {
  messageContainer.scrollTo(0, messageContainer.scrollHeight)
}
