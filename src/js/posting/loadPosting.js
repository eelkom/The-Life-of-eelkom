import { loadPostById } from "../firebase/services/getPostService.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const postContainer = document.querySelector(".post-container");

// async function loadPosting() {
//   const post = await loadPostById(postId);
//   const content = document.createElement("div");
//   content.classList.add("posting");

//   content.innerHTML =
//     "<h1>" +
//     `${post.title}` +
//     "</h1>" +
//     "<br>" +
//     `<div class="image-container"><img src="${post.image}" alt="${post.title}"><div>` +
//     "<p>" +
//     `${post.content}` +
//     "</p>";

//   postContainer.appendChild(content);
//   // TODO: for editing
// }

async function loadPosting() {
  const post = await loadPostById(postId);
  const content = document.createElement("div");
  content.classList.add("posting");

  // 제목 추가
  const titleEl = document.createElement("h1");
  titleEl.textContent = post.title;

  // 이미지 컨테이너 및 이미지 엘리먼트 생성
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  const image = document.createElement("img");
  image.src = post.image;
  image.alt = post.title;
  image.classList.add("loading"); // 초기엔 blur

  // 이미지 로드 완료 후 blur 제거
  image.addEventListener("load", () => {
    image.classList.add("loaded");
  });

  imageContainer.appendChild(image);

  // 콘텐츠 추가
  const textContent = document.createElement("p");
  textContent.textContent = post.content;

  // 모두 조립
  content.appendChild(titleEl);
  content.appendChild(document.createElement("br"));
  content.appendChild(imageContainer);
  content.appendChild(textContent);

  postContainer.appendChild(content);
}

loadPosting();
