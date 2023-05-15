(()=>{
    let yOffset = 0; // window.pageYOffset 값 담을 변수
    function checkNav() {
        if (yOffset > 0) {
            document.body.classList.add('nav-sticky');
        }else {
            document.body.classList.remove('nav-sticky');
        }
        
    }
    window.addEventListener('scroll', ()=>{
        yOffset = window.pageYOffset;
        checkNav();
    });
})();