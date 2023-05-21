# Untitled (my Blog)

## Description
- Untitled is personal blog

## Inspiration & Reference
- [Caption] : Inspired by the captions next to the artworks, I created a personal blog that can explain my daily life and expressed one post in the form of a captions. ex) HTML canvas 20X20(px)

- [The Life of Pablo] : Using the art of Kanye West's 7th album as a reference, the background color of the captions was set to coral and the subtitle "The Life of eelkom" was set

- [Coverflow] : I applied iTunes's coverflow function, which disappeared in 2012, to use the caption as an album art.

## Development
   <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">  <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">  <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white">

## Screen Shot
<img src="https://github.com/eelkom/Untitled/assets/103271836/3f8fc408-6979-4b48-bed2-94fbac6c3d7d.png" />
<img src="https://github.com/eelkom/Untitled/assets/103271836/f783d096-520d-479a-bb3e-dbab7168a0ac.gif" />


## Firebase

### Authentication
- Sign In & Out / Sign Up

### Firestore Database (Cloud Firestore)
- Rules (Only certain users can write and modify posts)
  ```javascript
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        match /myCollection/{documentId} {
          allow create: if request.auth != null && request.auth.uid == '특정 사용자 UID';
        }
      }
    }
  ```
### Storage
- Rules (Only certain users can create and modify photos)
  ```javascript
    rules_version = '2';
    service firebase.storage {
      match /b/{bucket}/o {
        match /{allPaths=**} {
          allow read: if true;
          allow write: if request.auth != null && request.auth.uid == "특정 사용자 UID";
        }
      }
    }
  ```
## Git commit type

> [Feat] : 새로운 기능 추가  
> [Fix] : 버그 수정  
> [Docs] : 문서 수정  
> [Test] : 테스트 코드 추가  
> [Refactor] : 코드 리팩토링  
> [Style] : 코드 의미에 영향을 주지 않는 변경사항  
> [Chore] : 빌드 부분 혹은 패키지 매니저 수정사항  

## 추후 수정할 부분

- about 페이지 작성
- js class 모듈화

