import { loadPosts } from "../firebase/postService.js";
import drawCoverflow from "./drawCoverflow.js";

async function loadCoverflow() {
  const coverflowContainer = document.querySelector(".coverflow-container");
  const listContainer = document.querySelector(".list-container");

  const captions = await loadPosts();

  if (captions.length > 0) {
    let cnt = 1;

    captions.forEach((doc) => {
      const caption = document.createElement("div");
      caption.classList.add("content");
      caption.innerHTML = `<a href="posting.html?id=${doc.id}">${doc.title} 
                <br>by eelkom</a><p><br>HTML canvas<br>20X20(px)<br><br>${doc.summary}</p>`;

      const content = document.createElement("div");
      content.classList.add("content2");
      content.innerHTML = `<a href="posting.html?id=${doc.id}">${
        cnt < 10 ? cnt.toString().padStart(2, "0") : cnt
      }. ${doc.title}</a> &nbsp;&nbsp; by eelkom`;

      coverflowContainer.appendChild(caption);
      listContainer.appendChild(content);
      cnt++;
    });

    const captionElems = coverflowContainer.querySelectorAll(".content");
    drawCoverflow(coverflowContainer, captionElems);
  }
}

loadCoverflow();
