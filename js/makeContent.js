(() => {
    const db = firebase.firestore();
    let container, container2;
    let flag = 0;

    if (document.title === 'Untitled') {
        container = document.querySelector('.grid-container');
    } else if (document.title === 'Untitled-myPage') {
        container = document.querySelector('.coverflow-container');
        container2 = document.querySelector('.list-container');
        flag = 1;
    }

    db.collection('post').orderBy('date', 'desc').get().then((snapShot) => {
        let cnt = 1;
        snapShot.forEach(doc => {
            const content = document.createElement('div');
            content.classList.add('content');
            content.innerHTML = `<a href="post.html?id=${doc.id}">${doc.data().title} <br>by eelkom</a><p><br>HTML canvas<br>20X20(px)<br><br>${doc.data().summary}</p>`;
            if (flag === 1) {
                const content2 = document.createElement('div');
                content2.classList.add('content2');
                if (cnt < 10) {
                    cnt = cnt.toString().padStart(2, '0');
                }
                content2.innerHTML = `<a href="post.html?id=${doc.id}">${cnt}. ${doc.data().title}</a> &nbsp;&nbsp; by eelkom`;
                container.appendChild(content);
                container2.appendChild(content2);
            } else {
                container.appendChild(content);
            }
            cnt++;
        });
        if (flag === 1) {
            // const coverflowContainer = document.getElementsByClassName('coverflow-container');
            // initCoverFlow(coverflowContainer[0]);
            const coverflowContainer = document.querySelector('.coverflow-container');
            // console.log(coverflowContainer);
            initCoverFlow(coverflowContainer);
        }
    });

    let browserPrefix = "";
    if (navigator.userAgent.indexOf('Firefox') != -1) {
        browserPrefix = "-moz-";
    } else if (navigator.userAgent.indexOf('Chrome') != -1) {
        browserPrefix = "-webkit-";
    } else if (navigator.userAgent.indexOf('Safari') != -1) {
        browserPrefix = "-webkit-";
    }
 
    function initCoverFlow(c) {
        let imgSize = parseInt(c.dataset.size) || 64,
            spacing = parseInt(c.dataset.spacing) || 10,
            shadow = c.dataset.shadow === "true",
            imgShadow = c.dataset.imgshadow !== "false",
            bgColor = c.dataset.bgcolor || "transparent",
            flat = c.dataset.flat === "true",
            width = c.dataset.width,
            index = c.dataset.index,
            imgHeight = 0,
            imgs = [],
            placeholding;

        c.childNodes.forEach((node) => {
            if (node.tagName) { // tagName 속성을 사용하여 c.childNodes 내 HTML 태그만 추출
                imgs.push(node);
            }
        });
        c.style.position = "relative";
        
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.position = "absolute";
            imgs[i].style.width = imgSize + "px";
            imgs[i].style.height = imgSize + "px";
            imgs[i].style.bottom = "60px";
            if (!shadow && imgShadow) {
                // horizontal, vertical position, blur radius, rgba
                imgs[i].style.boxShadow = "0px 30px 18px rgba(0, 0, 0, 0.3)";
            }
            /*  transform: 요소의 변형(이동, 회전, 크기 조정 등)에 대한 전환 효과를 설정합니다.
                margin-left: 요소의 왼쪽 여백에 대한 전환 효과를 설정합니다.
                filter: 요소에 적용되는 필터(예: 그레이스케일, 투명도 조정 등)에 대한 전환 효과를 설정합니다. */
            imgs[i].style.transition = "transform 0.8s ease, margin-left 0.6s ease, filter 0.6s ease";
            imgHeight = Math.max(imgHeight, imgs[i].getBoundingClientRect().height) + 6;
            console.log(imgHeight);
        }
        
        c.style.overflowX = "scroll";
        // c.style.backgroundColor = bgColor;
        let titleBox = document.createElement("SPAN");
        // if (!shadow) {
        //     titleBox.className = "coverflow-title-box";
        //     titleBox.style.position = "absolute";
        //     titleBox.style.width = (imgSize - 20) + "px";
        //     titleBox.style.height = "20px";
        //     titleBox.style.lineHeight = "20px";
        //     titleBox.style.fontSize = "14px";
        //     titleBox.style.padding = "0 3px";
        //     titleBox.style.color = "#222";
        //     titleBox.style.background = "#ddd";
        //     titleBox.style.borderRadius = "10px";
        //     titleBox.style.fontWeight = "normal";
        //     titleBox.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
        //     titleBox.style.bottom = "28px";
        //     titleBox.style.textAlign = "center";
        //     titleBox.style.display = "block";
            // c.appendChild(titleBox);
        // }
        setTransform3D(c, 0, 600, 0);
        // placeholding은 가상의 요소로, 이미지 커버플로우(carousel)의 너비를 조절하기 위해 사용
        placeholding = document.createElement("div");
        placeholding.style.width = (width ? width * 2 : (imgSize + (imgs.length + 1) * spacing) * 2) + "px";
        placeholding.style.height = "1px";
        c.appendChild(placeholding);

        if (width) {
            c.style.width = width + "px";
        } else {
            c.style.width = (width ? width : (imgSize + (imgs.length + 1) * spacing)) + "px";
        }
// ing
        if (shadow) { // 물체의 그림자가 있을경우
            c.style.height = (imgHeight * 2 + 80) + "px";
            c.style.perspectiveOrigin = "50% 25%"; // 컨테이너에 대한 원근점(perspective origin)의 위치
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].style.bottom = (20 + imgHeight) + "px";
                imgs[i].style["-webkit-box-reflect"] = "below 0 -webkit-gradient(linear, 30% 20%, 30% 100%, from(transparent), color-stop(0.3, transparent), to(rgba(0, 0, 0, 0.8)))";
            }
        } else { // 일반적 커버플로우의 경우
            c.style.height = (imgHeight + 80) + "px";
            // console.log((imgHeight + 80) + "px");
        }
        // console.log(index, parseInt(index));
        c.dataset.index = index ? parseInt(index) : 0; // index == 0
        c.onscroll = function () {
            coverflowScroll(imgSize, spacing, c, imgs, flat, titleBox);
        };
        for (let i = 0; i < imgs.length; i++)
            imgs[i].onclick = function () {
                displayIndex(imgSize, spacing, c.scrollLeft, imgs, imgs.indexOf(this), flat, parseInt(c.style.width), titleBox);
            }
        displayIndex(imgSize, spacing, c.scrollLeft, imgs, +c.dataset.index, flat, parseInt(c.style.width), titleBox);
    }

    function coverflowScroll(imgSize, spacing, c, imgs, flat, titleBox) {
        let width = parseInt(c.style.width);
        let p = 1.0 * c.scrollLeft / width; // c.scrollLeft는 스크롤의 왼쪽 끝으로부터 스크롤된 픽셀 수를 나타냅니다. 스크롤이 오른쪽으로 이동하면 c.scrollLeft의 값은 점점 증가하게 됩니다. (t실수형 반환 위해 1.0 곱)
        let index = Math.min(Math.floor(p * imgs.length), imgs.length - 1);
        /* 예를 들어, p가 0.6이고 imgs.length가 10인 경우:
        p * imgs.length는 0.6 * 10 = 6이 됩니다.
        Math.floor(6)은 6입니다. 따라서 이 경우에는 현재 보여지는 이미지의 인덱스는 6이 됩니다. */
        let left = c.scrollLeft;
        c.dataset.index = index;
        console.log(width, p, index, left);
        displayIndex(imgSize, spacing, left, imgs, index, flat, width, titleBox);
    }

    function displayIndex(imgSize, spacing, left, imgs, index, flat, width, titleBox) {
        let mLeft = (width - imgSize) * 0.5 - spacing * (index + 1) - imgSize * 0.5; // 현재 보여지는 이미지의 왼쪽 마진 값을 계산하는 식
        /* (width - imgSize) * 0.5: 커버플로우 컨테이너의 너비에서 이미지의 너비를 뺀 후, 절반인 값입니다. 이렇게 하면 이미지를 가운데 정렬할 수 있습니다.
        spacing * (index + 1): 이미지 간격에 현재 이미지의 인덱스를 곱한 값입니다. 이렇게 하면 현재 이미지의 왼쪽에 있는 이미지들과의 간격을 설정할 수 있습니다.
        imgSize * 0.5: 이미지의 절반 크기입니다. 이렇게 하면 이미지의 중심점을 기준으로 마진을 설정할 수 있습니다. */
        for (let i = 0; i <= index; i++) {
            imgs[i].style.left = (left + i * spacing + spacing) + "px"; // spacing을 한번 더 더하는 이유는?
            imgs[i].style.marginLeft = mLeft + "px";
            imgs[i].style["-webkit-filter"] = "brightness(0.65)";
            imgs[i].style.zIndex = i + 1;
            setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 + 45), 300, flat ? -(index - i) * 10 : (-(index - i) * 30 - 20));
        }
        imgs[index].style["-webkit-filter"] = "none";
        imgs[index].style.marginLeft = (mLeft + imgSize * 0.5) + "px";
        imgs[index].style.zIndex = imgs.length;
        titleBox.style.visibility = "hidden";
        if (imgs[index].dataset.info) {
            titleBox.style.visibility = "visible";
            let info = imgs[index].dataset.info;
            titleBox.innerHTML = info;
            titleBox.style.left = (left + index * spacing + spacing + 10) + "px";
            titleBox.style.marginLeft = (mLeft + imgSize * .5) + "px";
        }
        
        setTransform3D(imgs[index], 0, 0, 5);
        for (let i = index + 1; i < imgs.length; i++) {
            imgs[i].style.left = (left + i * spacing + spacing) + "px";
            imgs[i].style.marginLeft = (mLeft + imgSize) + "px";
            imgs[i].style["-webkit-filter"] = "brightness(0.7)";
            imgs[i].style.zIndex = imgs.length - i;
            setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 - 45), 300, flat ? (index - i) * 10 : ((index - i) * 30 - 20));
        }
        /* 계산식 (index - i) * 10 + 45은 다음과 같이 해석될 수 있습니다:
        (index - i) * 10: 인덱스 간의 차이에 10을 곱한 값입니다. 이를 통해 인덱스 간의 차이가 증가할수록 회전 각도도 증가합니다. 10을 곱하는 이유는 회전 각도의 증가 폭을 조정하기 위함입니다.
        + 45: 45를 더한 값입니다. 이를 통해 이미지들이 초기 회전 각도로부터 약간 회전한 상태에서 시작합니다. 이 값은 회전 각도를 조정하여 보다 시각적인 효과를 제공합니다.
        따라서, (index - i) * 10 + 45 계산식은 이미지의 인덱스 간 차이에 따라 다양한 회전 각도를 생성하여 커버플로우 효과를 구현하는 데 사용됩니다. */
    }

    // setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 + 45), 300, flat ? -(index - i) * 10 : (-(index - i) * 30 - 20));
    // setTransform3D(c, 0, 600, 0);
    function setTransform3D(elem, degree, perspective, z) {
        degree = Math.max(Math.min(degree, 90), -90);
        z -= 5;
        elem.style.perspective = perspective + "px";
        elem.style.transform = "rotateY(" + degree + "deg) translate3D(0, 0, " + z + "px)";
    }

    window.onload = () => {
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
