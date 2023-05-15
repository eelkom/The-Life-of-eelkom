(() => {
    const db = firebase.firestore();

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    db.collection('post').doc(postId).get().then((res) => {
        const container = document.querySelector('.post-container');

        const content = document.createElement('div');
        content.classList.add('posting');
        
        content.innerHTML = '<h1>' + `${res.data().title}` + '</h1>'
            + '<br>'
            + `<img src="${res.data().image}" alt="${res.data().title}">`
            + '<p>' + `${res.data().content}` + '</p>';

        container.appendChild(content);
    });
})();
// urlParams는 쿼리스트링에서 id 값을 추출하기 위한 객체입니다. const postId = urlParams.get('id')를 통해 id 값을 가져온 후, db.collection('post').doc(postId).get()으로 해당 postId의 문서를 가져옵니다. 그리고 이전 파일에서 템플릿 리터럴을 이용하여 생성했던 HTML 코드를 res.data()를 이용해 수정합니다. 마지막으로, .content-container에 해당 HTML 코드를 추가합니다.






