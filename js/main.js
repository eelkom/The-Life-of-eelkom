(() => {
    let yOffset = 0; // window.pageYOffset 값 담을 변수
    // let container = document.querySelector('.coverflow-container');

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        checkNav();     
    });
    window.addEventListener('resize', adjustCoverflowWidth);

    function checkNav() {
        if (yOffset > 0) {
            document.body.classList.add('nav-sticky');
        } else {
            document.body.classList.remove('nav-sticky');
        }
    }

    function setFooter() {
        // set footer
        const fullHeight = document.body.scrollHeight; // <body> 요소의 전체 높이를 반환
        // const offsetHeight = document.body.offsetHeight; // <body> 요소의 보여지는 영역의 높이를 반환
        const innerHeight = window.innerHeight;
        // console.log(innerHeight, fullHeight);
        const footer = document.querySelector('.footer');
        if (innerHeight >= fullHeight) {
            footer.style.position = "fixed";
            footer.style.bottom = "0";
        }
    }
    
    function adjustCoverflowWidth() {
        const mypageContainer = document.querySelector('.mypage-container');
        const coverflowContainer = document.querySelector('.coverflow-container');
        
        // mypage-container의 너비를 coverflow-container에 적용
        const newWidth = mypageContainer.clientWidth;
        coverflowContainer.style.width = `${newWidth}px`;
        // initCoverFlow(container);
    }

    window.onload = () => {
        setFooter();
        adjustCoverflowWidth();
    };
})();