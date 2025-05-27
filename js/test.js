(() => {
    const db = firebase.firestore();
    let mainContainer, listContainer;
    let flag = 0; // container 선택을 위한 flag 변수 (mainPage일 경우 flag = 1, grid-view일 경우 flag = 0)

    const posts = [
        { id: '1', title: '[13구] 24m2 스튜디오', content: '내용1', summary: '월세: 800유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 23일' },
        { id: '2', title: '[7구] 19m2 스튜디오', content: '내용2', summary: '900유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 01월 2일' },
        { id: '3', title: '[18구] 20m2 스튜디오', content: '내용3', summary: '850유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 30일' },
        { id: '4', title: '[11구] 22m2 스튜디오', content: '내용4', summary: '1050유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 27일' },
        { id: '5', title: '[14구] 21m2 스튜디오', content: '내용5', summary: '780유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 15일' },
        { id: '6', title: '[16구] 15m2 스튜디오', content: '내용6', summary: '680유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 23일' },
        { id: '7', title: '[15구] 18m2 플랫', content: '내용5', summary: '890유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 29일<br>공용주방, 공용 샤워실' },
        { id: '8', title: '[5구] 24m2 스튜디오', content: '내용6', summary: '950유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 02월 03일' },
        { id: '9', title: '[13구] 24m2 스튜디오', content: '내용1', summary: '800유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 01월 21일' },
        { id: '10', title: '[7구] 19m2 플랫', content: '내용2', summary: '710유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 13일<br>공용주방, 공용 샤워실' },
        { id: '11', title: '[18구] 20m2 스튜디오', content: '내용3', summary: '850유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 02월 01일' },
        { id: '12', title: '[11구] 22m2 플랫', content: '내용4', summary: '620유로<br>보증금: 월세 2개월 분<br>주택보조금: 가능<br>입주 가능일: 12월 31일<br>공용주방, 공용 샤워실' },

    ];

    // page 구분, container 선택을 위한 if문
    if (document.title === 'Untitled-gridView') {
        mainContainer = document.querySelector('.grid-container');
    } else if (document.title === 'Untitled') {
        mainContainer = document.querySelector('.coverflow-container');
        listContainer = document.querySelector('.list-container');
        flag = 1;
    }
    let cnt = 1;

    /* db.collection('post').orderBy('date', 'desc').get().then((snapshot) => { ... }) 
    == 'post' 컬렉션의 문서들을 'date' 필드를 기준으로 내림차순으로 정렬하여 가져온 후, 해당 snapShot을 받아와서 처리하는 비동기 작업을 수행 */
    // db.collection('post').orderBy('date', 'desc').get().then((snapShot) => {
    //     let cnt = 1; // content2 요소 count용 변수
    //     snapShot.forEach(doc => {
    //         // content 요소 생성
    //         const content = document.createElement('div');
    //         content.classList.add('content');
    //         content.innerHTML = `<a href="post.html?id=${doc.id}">${doc.data().title} 
    //             <br><br>${doc.data().summary}</p>`;
    //         if (flag === 1) { // mainPage일 경우
    //             if (cnt < 10) {
    //                 cnt = cnt.toString().padStart(2, '0');
    //             }
    //             // content2 요소 생성
    //             const content2 = document.createElement('div');
    //             content2.classList.add('content2');
    //             content2.innerHTML = `<a href="post.html?id=${doc.id}">${cnt}. ${doc.data().title}</a> &nbsp;&nbsp; by eelkom`;

    //             mainContainer.appendChild(content);
    //             listContainer.appendChild(content2);
    //         } else {
    //             mainContainer.appendChild(content);
    //         }
    //         cnt++;
    //     });
    //     if (flag === 1) { // coverflow 효과 생성
    //         initCoverFlow(mainContainer); // container = document.querySelector('.coverflow-container');
    //     }
    // });

    for (let i = 0; i < posts.length; i++) {
        const content = document.createElement('div');
        content.classList.add('content');
        content.innerHTML = `<a href="post.html?id=${posts[i].id}">${posts[i].title} 
                <br><br>${posts[i].summary}</p>`;
        if (flag === 1) { // mainPage일 경우
            if (cnt < 10) {
                cnt = cnt.toString().padStart(2, '0');
            }
            // content2 요소 생성
            const content2 = document.createElement('div');
            content2.classList.add('content2');
            content2.innerHTML = `<a href="post.html?id=${posts[i].id}">${cnt}. ${posts[i].title}</a> `;

            mainContainer.appendChild(content);
            listContainer.appendChild(content2);
        } else {
            mainContainer.appendChild(content);
        }
        cnt++;
    }
    initCoverFlow(mainContainer);
    // if (flag === 1) { // coverflow 효과 생성
    //      // container = document.querySelector('.coverflow-container');
    // }

    function initCoverFlow(c) {
        // Coverflow setting value
        const spacing = 30; // Spacing between captions
        const width = 1000; // Width of coverflow container 
        const index = 0; // To show from captions[0]
        const captions = []; // Array for captions
        const windowWidth = window.innerWidth;
        let captionSize = 0;

        if (windowWidth < 1024) {
            captionSize = 200;
        } else {
            captionSize = 230;
        }

        // coverflow-container style 속성 적용
        c.style.position = "relative";
        c.style.overflowX = "auto";
        c.style.width = width + "px";
        c.style.height = (captionSize + 120) + "px";
        setTransform3D(c, 0, 600, 0);

        Array.from(c.children).forEach((node) => {
            captions.push(node); // node(==content 요소) push
        });

        for (let i = 0; i < captions.length; i++) {
            captions[i].style.position = "absolute"; // 요소를 가장 가까운 포지셔닝된 조상 요소를 기준으로 위치시킵니다.
            captions[i].style.width = captionSize + "px";
            captions[i].style.height = captionSize + "px";
            captions[i].style.bottom = "60px"; // 요소의 bottom 시작 위치 설정(position과 함께 사용)
            captions[i].style.boxShadow = "0px 30px 20px rgba(0, 0, 0, 0.3)";
            captions[i].style.transition = "transform 0.9s ease, margin-left 0.6s linear, filter 0.4s ease";
        }

        const placeholding = document.createElement("div");
        placeholding.style.width = (width * 2) + "px";
        placeholding.style.height = "1px";
        c.appendChild(placeholding);

        c.addEventListener('scroll', () => {
            coverflowScroll(captionSize, spacing, c, captions, width);
        }, { passive: true });

        for (let i = 0; i < captions.length; i++) {
            captions[i].addEventListener('click', () => {
                displayIndex(captionSize, spacing, c.scrollLeft, captions, i, width);
            });
        }
        // 초기 화면 display
        displayIndex(captionSize, spacing, c.scrollLeft, captions, index, width);
    }

    function coverflowScroll(captionSize, spacing, c, captions, width) {
        let sLeft = c.scrollLeft;
        let p = 1.0 * sLeft / width;
        let index = Math.min(Math.floor(p * captions.length), captions.length - 1);
        displayIndex(captionSize, spacing, sLeft, captions, index, width);
    }

    function displayIndex(captionSize, spacing, sLeft, captions, index, width) {
        let mLeft = ((width - captionSize) * 0.5) - (spacing * index);

        for (let i = 0; i < index; i++) {
            captions[i].style.left = (sLeft + i * spacing) + "px";
            captions[i].style.marginLeft = (mLeft - captionSize * 0.5) + "px";
            captions[i].style["-webkit-filter"] = "brightness(0.65)";
            captions[i].style.zIndex = i + 1;
            setTransform3D(captions[i], ((index - i) * 10 + 45), 300, (-(index - i) * 30 - 18));
        }

        captions[index].style.left = (sLeft + index * spacing) + "px";
        captions[index].style["-webkit-filter"] = "none";
        captions[index].style.marginLeft = mLeft + "px";
        captions[index].style.zIndex = captions.length;
        setTransform3D(captions[index], 0, 0, 5);

        for (let i = index + 1; i < captions.length; i++) {
            captions[i].style.left = (sLeft + i * spacing) + "px";
            captions[i].style.marginLeft = (mLeft + captionSize * 0.5) + "px";
            captions[i].style["-webkit-filter"] = "brightness(0.65)";
            captions[i].style.zIndex = captions.length - i;
            setTransform3D(captions[i], ((index - i) * 10 - 45), 300, ((index - i) * 30 - 18));
        }
    }

    function setTransform3D(elem, degree, perspective, z) {
        degree = Math.max(Math.min(degree, 90), -90);
        elem.style.perspective = perspective + "px";
        elem.style.transform = "rotateY(" + degree + "deg) translate3D(0, 0, " + (z - 5) + "px)";
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