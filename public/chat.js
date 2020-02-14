const socket = io.connect("http://localhost:4000");

const message = document.querySelector("#message");
const author = document.querySelector("#author");
const btn = document.querySelector("#send");
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");
const form = document.querySelector("form");

//  EMITTERS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  socket.emit("submit", {
    message: message.value,
    author: author.value
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("type", {author: author.value, message: message.value});
});

const renderMessage = (data) => {
  output.innerHTML += `<p><strong>${data.author}</strong> ${data.message}</p>`;
};

// LISTENERS

socket.on("previousMessage", (data) => {
  data.messages.map((v) => {
    renderMessage(v);
  });
});

socket.on("submit", (data) => {
  feedback.innerHTML = "";
  renderMessage(data);
});

const clearOnInactivity = _.debounce(() => (feedback.innerHTML = ""), 2000);

socket.on("type", (data) => {
  feedback.innerHTML = `<p><em>${data.author} is typing a message...</em></p>`;
  clearOnInactivity();
});
