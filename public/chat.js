const socket = io.connect("http://localhost:4000");

const message = document.querySelector("#message");
const author = document.querySelector("#author");
const btn = document.querySelector("#send");
const output = document.querySelector("#output");
const feedback = document.querySelector("#feedback");

//  EMITTERS
btn.addEventListener("click", () => {
  socket.emit("submit", {
    message: message.value,
    author: author.value
  });
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("type", {author: author.value, message: message.value});
});

// LISTENERS
socket.on("submit", (data) => {
  feedback.innerHTML = "";
  output.innerHTML += `<p><strong>${data.author}</strong> ${data.message}</p>`;
});

const stop = _.debounce(() => (feedback.innerHTML = ""), 2000);

socket.on("type", (data) => {
  feedback.innerHTML = `<p><em>${data.author} is typing a message...</em></p>`;
  lazyType();
});
