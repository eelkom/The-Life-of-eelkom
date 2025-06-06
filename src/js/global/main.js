function checkNav(yOffset) {
  if (yOffset > 0) {
    document.body.classList.add("nav-sticky");
  } else {
    document.body.classList.remove("nav-sticky");
  }
}

function init() {
  window.addEventListener("scroll", () => {
    let yOffset = window.pageYOffset;
    checkNav(yOffset);
  });
}

init();
