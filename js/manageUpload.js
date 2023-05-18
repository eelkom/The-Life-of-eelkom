(() => {
    const db = firebase.firestore(); // database에서 데이터 가져오기
    const storage = firebase.storage();

    const button = document.querySelector('#uploadButton');
    const title = document.querySelector('#title');
    const content = document.querySelector('#content');
    const file = document.querySelector('#image');

    button.addEventListener('click', () => {
        // storage에 파일 저장
        const file = document.querySelector('#image').files[0];

        const storageRef = storage.ref(); // 저장 경로 정하기
        const path = storageRef.child('images/' + file.name);
        const upload = path.put(file);

        upload.on('state_changed',
            // 변화시 동작하는 함수 
            null,
            //에러시 동작하는 함수
            (error) => {
                console.error('실패사유는', error);
            },
            // 성공시 동작하는 함수
            () => {
                upload.snapshot.ref.getDownloadURL().then((url) => {
                    // console.log('업로드된 경로는', url);

                    const obj = {
                        title: title.value,
                        content: content.value.replace(/\n/g, "<br>"),
                        summary: summary.value,
                        date: new Date(),
                        image: url,
                    }
                    db.collection('post').add(obj).then(done).catch(fail);
                });
            }
        );
        const done = (res) => {
            console.log(res);
            window.location.href = 'index.html';
        }
        const fail = (err) => {
            alert("로그인 해주세요");
            console.log(err);
        }
    });
})();



