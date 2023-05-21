# Untitled (my Blog)

## Description
- Untitled is personal blog

## Inspiration & Reference
- Caption: 미술품 옆 작품설명(caption)을 보고 영감을 받아 내 일상을 설명할 수 있는 개인용 blog를 만들고 하나의 post를 caption의 형태로 표현했다. ex) HTML canvas 20X20(px)

- The Life of Pablo: 칸예 웨스트의 노래를 듣던 중 정규 7집의 앨범 아트에 눈길이 갔다. 이를 Reference 삼아 caption의 배경 색을 coral 색으로 설정하고 The Life of eelkom 이라는 부제를 가져왔다

- Coverflow: 칸예의 앨범을 Reference 삼을 후 caption을 앨범아트처럼 활용하고 싶어 2012년에 사라졌던 아이튠즈의 커버 플로우 기능을 적용시켰다.

## Screen Shot
<img src="https://github.com/eelkom/Untitled/assets/103271836/ac301b20-415f-488b-8356-249812142c64.png" width="800" height="auto"/>
<!-- <img src="https://github.com/eelkom/Untitled/assets/103271836/014bd2f1-4445-45ad-8084-c587414bda4f.png" width="900" height="auto"/> -->
<img src="https://github.com/eelkom/Untitled/assets/103271836/20f89c38-a895-4c20-9003-fef26e433f33.png" width="800" height="auto"/>
<img src="https://github.com/eelkom/Untitled/assets/103271836/de97bf54-5a4e-4ff1-be59-7f0814dd0047.gif" width="800" height="auto"/>


## Git commit type

> [Feat] : 새로운 기능 추가  
> [Fix] : 버그 수정  
> [Docs] : 문서 수정  
> [Test] : 테스트 코드 추가  
> [Refactor] : 코드 리팩토링  
> [Style] : 코드 의미에 영향을 주지 않는 변경사항  
> [Chore] : 빌드 부분 혹은 패키지 매니저 수정사항  

## 수정할 부분
> 1. content 위치 통일 o  
> 2. login 한 사람만 글 작성 가능하게 o
> 3. sign out 버튼 활성화 o
> 4. 글 수정 기능 x
> 5, about 작성 x
> 6. 인터렉티브 요소 추가 o


## Firebase
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
