export default function drawCoverflow(c, captions) {
  // Coverflow setting value
  const spacing = 30; // Spacing between captions
  const width = 1000; // Width of coverflow container
  const index = 0; // To show from captions[0]
  const windowWidth = window.innerWidth;
  let captionSize = windowWidth < 1024 ? 200 : 230;

  // TODO: css 코드로 분리 예정
  c.style.position = "relative";
  c.style.overflowX = "auto";
  c.style.width = width + "px";
  c.style.height = captionSize + 120 + "px";
  setTransform3D(c, 0, 600, 0);

  // TODO: css 코드로 분리 예정
  for (let i = 0; i < captions.length; i++) {
    captions[i].style.position = "absolute"; // 요소를 가장 가까운 포지셔닝된 조상 요소를 기준으로 위치시킵니다.
    captions[i].style.width = captionSize + "px";
    captions[i].style.height = captionSize + "px";
    captions[i].style.bottom = "60px"; // 요소의 bottom 시작 위치 설정(position과 함께 사용)
    captions[i].style.boxShadow = "0px 30px 20px rgba(0, 0, 0, 0.3)";
    captions[i].style.transition =
      "transform 0.9s ease, margin-left 0.6s linear, filter 0.4s ease";
  }

  const placeholding = document.createElement("div");
  placeholding.style.width = width * 2 + "px";
  placeholding.style.height = "1px";
  c.appendChild(placeholding);

  c.addEventListener(
    "scroll",
    () => {
      coverflowScroll(captionSize, spacing, c, captions, width);
    },
    { passive: true }
  );

  for (let i = 0; i < captions.length; i++) {
    captions[i].addEventListener("click", () => {
      displayIndex(captionSize, spacing, c.scrollLeft, captions, i, width);
    });
  }
  // 초기 화면 display
  displayIndex(captionSize, spacing, c.scrollLeft, captions, index, width);
}

function coverflowScroll(captionSize, spacing, c, captions, width) {
  let sLeft = c.scrollLeft;
  let p = (1.0 * sLeft) / width;
  let index = Math.min(Math.floor(p * captions.length), captions.length - 1);
  displayIndex(captionSize, spacing, sLeft, captions, index, width);
}

function displayIndex(captionSize, spacing, sLeft, captions, index, width) {
  let mLeft = (width - captionSize) * 0.5 - spacing * index;

  for (let i = 0; i < index; i++) {
    captions[i].style.left = sLeft + i * spacing + "px";
    captions[i].style.marginLeft = mLeft - captionSize * 0.5 + "px";
    captions[i].style["-webkit-filter"] = "brightness(0.65)";
    captions[i].style.zIndex = i + 1;
    setTransform3D(
      captions[i],
      (index - i) * 10 + 45,
      300,
      -(index - i) * 30 - 18
    );
  }

  captions[index].style.left = sLeft + index * spacing + "px";
  captions[index].style["-webkit-filter"] = "none";
  captions[index].style.marginLeft = mLeft + "px";
  captions[index].style.zIndex = captions.length;
  setTransform3D(captions[index], 0, 0, 5);

  for (let i = index + 1; i < captions.length; i++) {
    captions[i].style.left = sLeft + i * spacing + "px";
    captions[i].style.marginLeft = mLeft + captionSize * 0.5 + "px";
    captions[i].style["-webkit-filter"] = "brightness(0.65)";
    captions[i].style.zIndex = captions.length - i;
    setTransform3D(
      captions[i],
      (index - i) * 10 - 45,
      300,
      (index - i) * 30 - 18
    );
  }
}

function setTransform3D(elem, degree, perspective, z) {
  degree = Math.max(Math.min(degree, 90), -90);
  elem.style.perspective = perspective + "px";
  elem.style.transform =
    "rotateY(" + degree + "deg) translate3D(0, 0, " + (z - 5) + "px)";
}
