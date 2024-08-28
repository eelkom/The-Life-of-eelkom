# Untitled (my Blog)

## Description
- Untitled is personal blog

## link
https://eelkom.github.io/Untitled/

## Inspiration & Reference
- [Caption] : Inspired by the captions next to the artworks, I created a personal blog that can explain my daily life and expressed one post in the form of a captions. ex) HTML canvas 20X20(px)

- [The Life of Pablo] : Using the art of Kanye West's 7th album as a reference, the background color of the captions was set to coral and the subtitle "The Life of eelkom" was set.

- [Coverflow] : I applied iTunes's coverflow function, which disappeared in 2012, to use the caption as an album art.

## Development
- JS
- HTML/CSS
- FIREBASE



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
