import { loadPostById } from "../firebase/postService.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const postContainer = document.querySelector(".post-container");

async function loadPosting() {
  const post = await loadPostById(postId);
  const content = document.createElement("div");
  content.classList.add("posting");

  content.innerHTML =
    "<h1>" +
    `${post.title}` +
    "</h1>" +
    "<br>" +
    `<img src="${post.image}" alt="${post.title}">` +
    "<p>" +
    `${post.content}` +
    "</p>";

  postContainer.appendChild(content);
  // TODO: for editing
}

loadPosting();
