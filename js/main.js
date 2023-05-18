(() => {
    let yOffset = 0; // window.pageYOffset 값 담을 변수

    function checkNav() {
        if (yOffset > 0) {
            document.body.classList.add('nav-sticky');
        } else {
            document.body.classList.remove('nav-sticky');
        }
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        checkNav();
    });

    window.onload = () => {
        // set footer 
        const fullHeight = document.body.scrollHeight; // <body> 요소의 전체 높이를 반환
        const offsetHeight = document.body.offsetHeight; // <body> 요소의 보여지는 영역의 높이를 반환
        const innerHeight = window.innerHeight;
        console.log(innerHeight, fullHeight);
        if (window.innerHeight >= fullHeight) {
            const footer = document.querySelector('.footer');
            footer.style.position = "fixed";
            footer.style.bottom = "0";
        }
    };
})();