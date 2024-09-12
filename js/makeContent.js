(() => {
    const db = firebase.firestore();
    let mainContainer, listContainer;
    let flag = 0; // container 선택을 위한 flag 변수 (mainPage일 경우 flag = 1, grid-view일 경우 flag = 0)

    // page 구분, container 선택을 위한 if문
    if (document.title === 'Untitled-gridView') {
        mainContainer = document.querySelector('.grid-container');
    } else if (document.title === 'Untitled') {
        mainContainer = document.querySelector('.coverflow-container');
        listContainer = document.querySelector('.list-container');
        flag = 1;
    }

    /* db.collection('post').orderBy('date', 'desc').get().then((snapshot) => { ... }) 
    == 'post' 컬렉션의 문서들을 'date' 필드를 기준으로 내림차순으로 정렬하여 가져온 후, 해당 snapShot을 받아와서 처리하는 비동기 작업을 수행 */
    db.collection('post').orderBy('date', 'desc').get().then((snapShot) => {
        let cnt = 1; // content2 요소 count용 변수
        snapShot.forEach(doc => {
            // content 요소 생성
            const content = document.createElement('div');
            content.classList.add('content');
            content.innerHTML = `<a href="post.html?id=${doc.id}">${doc.data().title} 
                <br>by eelkom</a><p><br>HTML canvas<br>20X20(px)<br><br>${doc.data().summary}</p>`;
            if (flag === 1) { // mainPage일 경우
                if (cnt < 10) {
                    cnt = cnt.toString().padStart(2, '0');
                }
                // content2 요소 생성
                const content2 = document.createElement('div');
                content2.classList.add('content2');
                content2.innerHTML = `<a href="post.html?id=${doc.id}">${cnt}. ${doc.data().title}</a> &nbsp;&nbsp; by eelkom`;

                mainContainer.appendChild(content);
                listContainer.appendChild(content2);
            } else { // mainPage일 경우
                mainContainer.appendChild(content);
            }
            cnt++;
        });
        if (flag === 1) { // myPage일 경우 // coverflow 효과 생성
            initCoverFlow(mainContainer); // container = document.querySelector('.coverflow-container');
        }
    });

    function initCoverFlow(c) {
        const windowWidth = window.innerWidth;
        let captionSize;

        if (windowWidth < 1024) {
            captionSize = 200;
        } else {
            captionSize = 230;
        }

        const captions = []; // album art 담을 ary

        // html내 data-set 값 가져오기
        let spacing = parseInt(c.dataset.spacing); // spacing == 30
        let width = c.dataset.width; // width == 950
        let index = 0;
        c.dataset.index = index;

        c.childNodes.forEach((node) => {
            if (node.tagName) { // tagName 속성을 사용하여 c.childNodes 내 HTML tag만 추출
                captions.push(node); // // node(==content 요소) push
            }
        });
        c.style.position = "relative"; // album art 담을 부모 컨테이너(coverflow-container)의 속성을 relative로 설정

        for (let i = 0; i < captions.length; i++) {
            captions[i].style.position = "absolute"; // 부모 컨테이너(coverflow-container)에 추가 될 자식요소들의 속성을 absolute로 설정
            captions[i].style.width = captionSize + "px";
            captions[i].style.height = captionSize + "px";
            captions[i].style.bottom = "60px"; // 요소의 bottom 시작 위치 설정(position과 함께 사용)

            captions[i].style.boxShadow = "0px 30px 20px rgba(0, 0, 0, 0.3)";
            /*  transform: 요소의 변형(이동, 회전, 크기 조정 등)에 대한 전환 효과를 설정합니다.
                margin-left: 요소의 왼쪽 여백에 대한 전환 효과를 설정합니다.
                filter: 요소에 적용되는 필터(예: 그레이스케일, 투명도 조정 등)에 대한 전환 효과를 설정합니다. */
            captions[i].style.transition = "transform 0.9s ease, margin-left 0.6s linear, filter 0.4s linear";
        }
        c.style.overflowX = "scroll";
        setTransform3D(c, 0, 600, 0); // 부모 컨테이너(coverflow-container)에 원근감 효과 적용

        // placeholding은 가상의 요소로, 이미지 커버플로우(carousel)의 너비를 조절하기 위해 사용
        const placeholding = document.createElement("div");
        placeholding.style.width = (width * 2) + "px";
        placeholding.style.height = "1px"; // 실제 컨텐츠를 갖지 않기에 최소한의 높이로 설정
        c.appendChild(placeholding);

        c.style.width = width + "px"; // container width 설정
        c.style.height = (captionSize + 120) + "px"; // coverflow container height 설정
        
        c.addEventListener('scroll', () => { 
            coverflowScroll(captionSize, spacing, c, captions);
        }, { passive: true });

        for (let i = 0; i < captions.length; i++) {
            captions[i].addEventListener('click', () => { // click event
                displayIndex(captionSize, spacing, c.scrollLeft, captions, i, parseInt(c.style.width));
            });
        }
        // 초기 화면 display
        displayIndex(captionSize, spacing, c.scrollLeft, captions, +c.dataset.index, parseInt(c.style.width));
        // +c.dataset.index == '+' 연산자를 사용하여 문자열을 숫자로 변환
    }

    function coverflowScroll(captionSize, spacing, c, captions) {
        let width = parseInt(c.style.width);
        let p = 1.0 * c.scrollLeft / width; // c.scrollLeft는 스크롤의 왼쪽 끝으로부터 스크롤된 픽셀 수를 나타냅니다. 스크롤이 오른쪽으로 이동하면 c.scrollLeft의 값은 점점 증가하게 됩니다. (t실수형 반환임을 명확히 하기 위해 1.0 곱)
        let index = Math.min(Math.floor(p * captions.length), captions.length - 1); // index 구하는 식
        /* 예를 들어, p가 0.6이고 imgs.length가 10인 경우:
        p * imgs.length는 0.6 * 10 = 6이 됩니다.
        Math.floor(6)은 6입니다. 따라서 이 경우에는 현재 보여지는 이미지의 인덱스는 6이 됩니다. */
        // captions.length - 1과 비교하는 이유는 index 값이 배열의 인덱스 범위를 벗어나지 않도록 보장하기 위함
        c.dataset.index = index;
        let left = c.scrollLeft;
        displayIndex(captionSize, spacing, left, captions, index, width);
    }

    function displayIndex(captionSize, spacing, left, captions, index, width) {
         let mLeft = (width - captionSize) * 0.5 - spacing * (index + 1) - captionSize * 0.5; // 현재 보여지는 이미지의 왼쪽 마진 값을 계산하는 식
        /* (width - captionSize) * 0.5: 커버플로우 컨테이너의 너비에서 이미지의 너비를 뺀 후, 절반인 값입니다. 이렇게 하면 이미지를 가운데 정렬할 수 있습니다.
        spacing * (index + 1): 이미지 간격에 현재 이미지의 인덱스를 곱한 값입니다. 이렇게 하면 현재 이미지의 왼쪽에 있는 이미지들과의 간격을 설정할 수 있습니다.
        captionSize * 0.5: 이미지의 절반 크기입니다. 이렇게 하면 이미지의 중심점을 기준으로 마진을 설정할 수 있습니다. */
        for (let i = 0; i <= index; i++) {
            captions[i].style.left = (left + i * spacing + spacing) + "px"; // spacing을 한번 더 더하는 이유는?
            captions[i].style.marginLeft = mLeft + "px";
            captions[i].style["-webkit-filter"] = "brightness(0.65)";
            captions[i].style.zIndex = i + 1;
            setTransform3D(captions[i], ((index - i) * 10 + 45), 300, (-(index - i) * 30 - 20)); // 식 이해 x
        }
        captions[index].style["-webkit-filter"] = "none";
        captions[index].style.marginLeft = (mLeft + captionSize * 0.5) + "px";
        captions[index].style.zIndex = captions.length; // INDEX의 이미지가 가장 우선 표기 되도록 설정

        setTransform3D(captions[index], 0, 0, 5); // 해당 index의 elem 원근감, 회전 0으로 세팅

        for (let i = index + 1; i < captions.length; i++) {
            captions[i].style.left = (left + i * spacing + spacing) + "px";
            captions[i].style.marginLeft = (mLeft + captionSize) + "px";
            captions[i].style["-webkit-filter"] = "brightness(0.65)";
            captions[i].style.zIndex = captions.length - i;
            setTransform3D(captions[i], ((index - i) * 10 - 45), 300, ((index - i) * 30 - 20));
        }
        /* 계산식 (index - i) * 10 + 45은 다음과 같이 해석될 수 있습니다:
        (index - i) * 10: 인덱스 간의 차이에 10을 곱한 값입니다. 이를 통해 인덱스 간의 차이가 증가할수록 회전 각도도 증가합니다. 10을 곱하는 이유는 회전 각도의 증가 폭을 조정하기 위함입니다.
        + 45: 45를 더한 값입니다. 이를 통해 이미지들이 초기 회전 각도로부터 약간 회전한 상태에서 시작합니다. 이 값은 회전 각도를 조정하여 보다 시각적인 효과를 제공합니다.
        따라서, (index - i) * 10 + 45 계산식은 이미지의 인덱스 간 차이에 따라 다양한 회전 각도를 생성하여 커버플로우 효과를 구현하는 데 사용됩니다. */
    }

    function setTransform3D(elem, degree, perspective, z) {
        degree = Math.max(Math.min(degree, 90), -90);
        z -= 5;
        elem.style.perspective = perspective + "px";
        elem.style.transform = "rotateY(" + degree + "deg) translate3D(0, 0, " + z + "px)";
    }

    window.onload = () => {
        // 모든 content에 click event 부여
        const contents = document.querySelectorAll('.content');
        contents.forEach(content => {
            content.addEventListener('click', () => {
                const postId = content.querySelector('a').href.split('?id=')[1];
                console.log(postId);
                window.location.href = `post.html?id=${postId}`;
            });
        });
    };
})();
