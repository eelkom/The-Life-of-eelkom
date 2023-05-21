# Untitled

### Untitled is personal blog

- 수정할 부분
> 1. content 위치 통일 o  
> 2. login 한 사람만 글 작성 가능하게 o
> 3. sign out 버튼 활성화 o
> 4. 글 수정 기능 x
> 5, about 작성 x
> 6. 인터렉티브 요소 추가 o


- screen Shot

![스크린샷 2023-05-15 114020](https://github.com/eelkom/Untitled/assets/103271836/950424ec-a5eb-415d-8127-da00d78e50a0)
![Untitled video - Made with Clipchamp](https://github.com/eelkom/Untitled/assets/103271836/e7624c7f-4b3a-450f-9dcb-e5bb94546db6)



- commit type

> [Feat] : 새로운 기능 추가  
> [Fix] : 버그 수정  
> [Docs] : 문서 수정  
> [Test] : 테스트 코드 추가  
> [Refactor] : 코드 리팩토링  
> [Style] : 코드 의미에 영향을 주지 않는 변경사항  
> [Chore] : 빌드 부분 혹은 패키지 매니저 수정사항  

### Firebase
- 특정 사용자만 글 작성 가능
```javascript
  rules_version = '2';
  service cloud.firestore {
    match /databases/{database}/documents {
      match /yourCollection/{documentId} {
        allow create: if request.auth != null && request.auth.uid == '특정 사용자 UID';
        // 다른 규칙 및 액세스 권한 정의
      }
    }
  }
```
