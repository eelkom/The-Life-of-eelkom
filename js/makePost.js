(() => {
    const db = firebase.firestore();
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // for posting
    const postContainer = document.querySelector('.post-container');
    let currentTitle, currentContent, currentImage;
    
    db.collection('post').doc(postId).get().then((res) => {
        const content = document.createElement('div');
        content.classList.add('posting');

        currentTitle = res.data().title;
        currentContent = res.data().content;
        currentImage = res.data().image;

        content.innerHTML = '<h1>' + `${currentTitle}` + '</h1>'
            + '<br>'
            + `<img src="${currentImage}" alt="${currentTitle}">`
            + '<p>' + `${currentContent}` + '</p>';

        postContainer.appendChild(content);
    });

    // for editing
    const updateButton = document.createElement('button');
    updateButton.textContent = '수정';
    updateButton.addEventListener('click', () => {
        // 수정할 내용 입력
        const newTitle = prompt('새로운 제목을 입력하세요:', currentTitle);
        const newContent = prompt('새로운 내용을 입력하세요:', currentContent);

        // Firestore 문서 업데이트
        db.collection('post').doc(postId).update({
            title: newTitle,
            content: newContent
        })
            .then(() => {
                console.log('글이 수정되었습니다.');
                // 수정된 내용을 화면에 반영
                content.innerHTML = '<h1>' + newTitle + '</h1>'
                    + '<br>'
                    + `<img src="${res.data().image}" alt="${newTitle}">`
                    + '<p>' + newContent + '</p>';
            })
            .catch((error) => {
                console.log('글 수정에 실패했습니다.', error);
                alert('제한된 접근입니다');
            });
    });
    postContainer.appendChild(updateButton);
})();
// urlParams는 쿼리스트링에서 id 값을 추출하기 위한 객체입니다. const postId = urlParams.get('id')를 통해 id 값을 가져온 후, db.collection('post').doc(postId).get()으로 해당 postId의 문서를 가져옵니다. 그리고 이전 파일에서 템플릿 리터럴을 이용하여 생성했던 HTML 코드를 res.data()를 이용해 수정합니다. 마지막으로, .content-container에 해당 HTML 코드를 추가합니다.






