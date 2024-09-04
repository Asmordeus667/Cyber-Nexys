document.getElementById('message-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const messageInput = document.getElementById('message-input');
  const fileInput = document.getElementById('file-input');
  const messages = document.getElementById('messages');

  const messageText = messageInput.value;
  const file = fileInput.files[0];

  const formData = new FormData();
  if (messageText) {
    formData.append('text', messageText);
  }
  if (file) {
    formData.append('file', file);
  }

  fetch('http://localhost:5000/messages', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    const messageDiv = document.createElement('div');

    if (messageText) {
      const textNode = document.createElement('p');
      textNode.textContent = messageText;
      messageDiv.appendChild(textNode);
    }

    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '100%';
          messageDiv.appendChild(img);
        } else if (file.type.startsWith('audio/')) {
          const audio = document.createElement('audio');
          audio.src = e.target.result;
          audio.controls = true;
          messageDiv.appendChild(audio);
        }
      };
      reader.readAsDataURL(file);
    }

    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;

    messageInput.value = '';
    fileInput.value = '';
  });
});
