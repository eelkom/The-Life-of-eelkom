import { loadPosts } from "../firebase/postService.js";

async function loadGridView() {
  const gridContainer = document.querySelector(".grid-container");
  const captions = await loadPosts();

  if (captions.length > 0) {
    captions.forEach((doc) => {
      const caption = document.createElement("div");
      caption.classList.add("content");
      caption.innerHTML = `<a href="posting.html?id=${doc.id}">${doc.title} 
                <br>by eelkom</a><p><br>HTML canvas<br>20X20(px)<br><br>${doc.summary}</p>`;

      gridContainer.appendChild(caption);
    });
  }
}
loadGridView();
