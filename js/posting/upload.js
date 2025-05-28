import { savePost } from "../firebase/services/savePostService.js";
import { uploadImage } from "../firebase/services/uploadImageService.js";

const button = document.querySelector("#uploadButton");
const titleInput = document.querySelector("#title");
const contentInput = document.querySelector("#content");
const summaryInput = document.querySelector("#summary");
const imageInput = document.querySelector("#image");

button.addEventListener("click", async () => {
  try {
    const image = imageInput.files[0];
    if (!image) throw new Error("이미지를 선택하세요");

    const imageUrl = await uploadImage(image);
    await savePost({
      title: titleInput.value,
      content: contentInput.value.replace(/\n/g, "<br>"),
      summary: summaryInput.value,
      date: new Date(),
      image: imageUrl,
    });

    window.location.href = "index.html";
  } catch (error) {
    console.error("업로드 실패:", error);
    alert("제한된 접근입니다");
  }
});
