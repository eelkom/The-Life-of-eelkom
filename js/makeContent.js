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
    // set footer 
    if (document.body.clientHeight > window.innerHeight) {
        const footer = document.querySelector('.footer');
        footer.style.position = "absolute";
        footer.style.bottom = "0";
    }

    db.collection('post').orderBy('date', 'desc').get().then((snapShot) => {
        // let cnt = 1;
        snapShot.forEach(doc => {
            const content = document.createElement('div');
            content.classList.add('content');
            // content.classList.add("content", `content${cnt}`);
            content.innerHTML = `<a href="post.html?id=${doc.id}">${doc.data().title} <br>by eelkom</a><p><br>HTML canvas<br>20X20(px)<br><br>${doc.data().summary}</p>`;
            if (flag === 1) {
                const content2 = document.createElement('div');
                content2.classList.add('content2');
                // content2.innerHTML = `<a href="post.html?id=${doc.id}">${doc.data().title}</a>&nbsp;&nbsp;${doc.data().summary}`;
                content2.innerHTML = `<a href="post.html?id=${doc.id}">- ${doc.data().title}</a>&nbsp;&nbsp;by eelkom`;
                container.appendChild(content);
                container2.appendChild(content2);
                // container2.p.style.fontSize = "70px";
            } else {
                container.appendChild(content);
            }
            // albumArtstemp.push(content);
            // cnt++;
        });
        if (flag === 1) {
            const coverflowContainer = document.getElementsByClassName('coverflow-container');
            for (let i = 0; i < coverflowContainer.length; i++)
                initCoverFlow(coverflowContainer[i]);
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

    function setTransform3D(elem, degree, perspective, z) {
        degree = Math.max(Math.min(degree, 90), -90);
        z -= 5;
        elem.style.perspective = perspective + "px";
        elem.style.transform = "rotateY(" + degree + "deg) translate3D(0, 0, " + z + "px)";
    }

    function displayIndex(imgSize, spacing, left, imgs, index, flat, width, titleBox) {
        let mLeft = (width - imgSize) * .5 - spacing * (index + 1) - imgSize * .5;
        for (let i = 0; i <= index; i++) {
            imgs[i].style.left = (left + i * spacing + spacing) + "px";
            imgs[i].style.marginLeft = mLeft + "px";
            imgs[i].style["-webkit-filter"] = "brightness(0.65)";
            imgs[i].style.zIndex = i + 1;
            setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 + 45), 300, flat ? -(index - i) * 10 : (-(index - i) * 30 - 20));
        }
        imgs[index].style["-webkit-filter"] = "none";
        imgs[index].style.marginLeft = (mLeft + imgSize * .5) + "px";
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
    }

    function coverflowScroll(imgSize, spacing, c, imgs, flat, titleBox) {
        let width = parseInt(c.style.width);
        let p = 1. * c.scrollLeft / width;
        let index = Math.min(Math.floor(p * imgs.length), imgs.length - 1);
        let left = c.scrollLeft;
        c.dataset.index = index;
        displayIndex(imgSize, spacing, left, imgs, index, flat, width, titleBox);
    }
    
    function initCoverFlow(c) {
        let imgSize = parseInt(c.dataset.size) || 64,
            spacing = parseInt(c.dataset.spacing) || 10,
            shadow = (c.dataset.shadow == "true") || false,
            imgShadow = !((c.dataset.imgshadow == "false") || false),
            bgColor = c.dataset.bgcolor || "transparent",
            flat = (c.dataset.flat == "true") || false,
            width = c.dataset.width,
            index = c.dataset.index,
            imgHeight = 0,
            imgs = [],
            placeholding;

        for (let i = 0; i < c.childNodes.length; i++) {
            if (c.childNodes[i].tagName)
                imgs.push(c.childNodes[i]);
        }
        for (let i = 0; i < imgs.length; i++) {
            imgs[i].style.position = "absolute";
            imgs[i].style.width = imgSize + "px";
            imgs[i].style.height = imgSize + "px";
            imgs[i].style.bottom = "60px";
            if (!shadow && imgShadow) {
                // horizontal, vertical position, blur radius
                imgs[i].style.boxShadow = "0px 20px 30px rgba(0, 0, 0, 0.3)";
            }
            imgs[i].style.transition = "transform 0.8s ease, margin-left 0.6s ease, filter 0.6s ease";
            imgHeight = Math.max(imgHeight, imgs[i].getBoundingClientRect().height) + 6;
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
        //     c.appendChild(titleBox);
        // }
        setTransform3D(c, 0, 600, 0);
        placeholding = document.createElement("div");
        placeholding.style.width = (width ? width * 2 : (imgSize + (imgs.length + 1) * spacing) * 2) + "px";
        placeholding.style.height = "1px";
        c.appendChild(placeholding);

        if (width)
            c.style.width = width + "px";
        else
            c.style.width = (width ? width : (imgSize + (imgs.length + 1) * spacing)) + "px";
        if (shadow) {
            c.style.height = (imgHeight * 2 + 80) + "px";
            c.style.perspectiveOrigin = "50% 25%";
            for (let i = 0; i < imgs.length; i++) {
                imgs[i].style.bottom = (20 + imgHeight) + "px";
                imgs[i].style["-webkit-box-reflect"] = "below 0 -webkit-gradient(linear, 30% 20%, 30% 100%, from(transparent), color-stop(0.3, transparent), to(rgba(0, 0, 0, 0.8)))";
            }
        } else {
            c.style.height = (imgHeight + 80) + "px";
        }

        c.style.position = "relative";
        c.dataset.index = index ? parseInt(index) : 0;
        c.onscroll = function () {
            coverflowScroll(imgSize, spacing, c, imgs, flat, titleBox);
        };
        for (let i = 0; i < imgs.length; i++)
            imgs[i].onclick = function () {
                displayIndex(imgSize, spacing, c.scrollLeft, imgs, imgs.indexOf(this), flat, parseInt(c.style.width), titleBox);
            }
        displayIndex(imgSize, spacing, c.scrollLeft, imgs, +c.dataset.index, flat, parseInt(c.style.width), titleBox);
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
