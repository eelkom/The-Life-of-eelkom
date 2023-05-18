# Untitled
Untitled is personal blog
<br>
![스크린샷 2023-05-15 114020](https://github.com/eelkom/Untitled/assets/103271836/950424ec-a5eb-415d-8127-da00d78e50a0)
![스크린샷 2023-05-16 011208](https://github.com/eelkom/Untitled/assets/103271836/335e354d-3153-4595-8539-829b97a47bb8)
![스크린샷 2023-05-16 011149](https://github.com/eelkom/Untitled/assets/103271836/b00a39bc-de32-41f5-8795-da9f9d28e49e)


- commit type

feature : 새로운 기능 추가

fix : 버그 수정

docs : 문서 수정

test : 테스트 코드 추가

refactor : 코드 리팩토링

style : 코드 의미에 영향을 주지 않는 변경사항

chore : 빌드 부분 혹은 패키지 매니저 수정사항

특정 사용자만 글 작성 가능
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /yourCollection/{documentId} {
      allow create: if request.auth != null && request.auth.uid == '특정 사용자 UID';
      // 다른 규칙 및 액세스 권한 정의
    }
  }
}
