import polygon from './sub.js';

(() => {
    const db = firebase.firestore();

    const canvasContainer = document.querySelector('.canvas-container');
    const captionsContainer = document.querySelector('.captions-container');
    const captions = [];
    let sides = 0;
    
    /* db.collection('post').orderBy('date', 'desc').get().then((snapshot) => { ... }) 
    == 'post' 컬렉션의 문서들을 'date' 필드를 기준으로 내림차순으로 정렬하여 가져온 후, 해당 snapShot을 받아와서 처리하는 비동기 작업을 수행 */
    db.collection('post').orderBy('date', 'desc').get().then((snapShot) => {
        snapShot.forEach(doc => {
            // content 요소 생성
            const content = document.createElement('div');
            content.classList.add('content');
            content.innerHTML = `<a href="post.html?id=${doc.id}">${doc.data().title} 
                </p>`;

            captionsContainer.appendChild(content);  
            // captions.push(content);
        });
        Array.from(captionsContainer.children).forEach((node) => {
            captions.push(node); // node(==content 요소) push
        });
        sides = captions.length;
    });

    


    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvasContainer.appendChild(canvas);

    const state = { // 상태를 저장할 객체
        isDown: false,
        moveX: 0,
        offsetX: 0
    };
    let poly; // polygon 객체를 저장할 변수 // 추후 공부(클로저 때문)
    let pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;
    // let sides = captions.length;

    
    

    // for (let i = 0; i < sides; i++) {
    //     const button = document.createElement('div');
    //     button.classList.add('content');
    //     // button.textContent = `Button ${i + 1}`;
    //     button.textContent = `HTML canvas ${i}`;
    //     captionsContainer.appendChild(button);
    //     buttons.push(button);
    // }
    // console.log(buttons);
    let stageWidth = document.body.clientWidth;
    let stageHeight = document.body.clientHeight;

    function init() {
        window.addEventListener('resize', () => {
            stageWidth = document.body.clientWidth;
            stageHeight = document.body.clientHeight;
            resize();
        });
        resize(); // 첫 화면 그리기

        // let isDown = false; // 값이 EventListener 안에서만 update
        // let moveX = 0;
        // let offsetX = 0;

        document.addEventListener('pointerdown', (e) => { onDown(e); });
        document.addEventListener('pointermove', (e) => { onMove(e); });
        document.addEventListener('pointerup', () => { onUp(); });

        window.requestAnimationFrame(() => { animate(); });
    }

    function resize() {
        canvas.width = stageWidth * pixelRatio;
        canvas.height = stageHeight * pixelRatio;
        context.scale(pixelRatio, pixelRatio);
        console.log(sides);
        poly = polygon(stageWidth / 2, stageHeight / 2, stageHeight / 3, 15); // (x, y, radius, sides)
    }

    function animate() {
        window.requestAnimationFrame(() => { animate(); });
        // context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        // context.clearRect(0, 0, stageWidth, stageHeight);
        // console.log('animate');
        state.moveX *= 0.92;
        poly.animate(context, state.moveX, captions);
    }
    // clientX: 뷰포트 기준의 절대 좌표.
    // offsetX: 특정 DOM 요소 내부의 상대 좌표.
    // 일반적으로 **canvas**와 같은 요소 내부에서 마우스의 위치를 추적할 때 더 유용합니다.
    function onDown(e) {
        // console.log('onDown');
        state.isDown = true;
        state.moveX = 0;
        state.offsetX = e.offsetX; // 클릭한 x 좌표
    }

    function onMove(e) {

        if (state.isDown) {

            state.moveX = e.offsetX - state.offsetX;
            state.offsetX = e.offsetX;
            context.clearRect(0, 0, stageWidth, stageHeight);
        }
    }

    function onUp() {
        // console.log(' onUp');
        state.isDown = false;
    }

    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
})();

