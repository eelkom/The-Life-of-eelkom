# Untitled (my Blog)

## Description
- Untitled is personal blog

## link
- https://eelkom.github.io/Untitled/

## Inspiration & Reference
- [Caption] : Inspired by the captions next to artworks, I created a personal blog to showcase my life through captions.

- [The Life of Pablo] : "Inspired by Kanye West's 7th album, The Life of Pablo, I used the album art as a reference. The background color of the captions was set to coral, which is the main color of the album art, and I borrowed the album's title to create 'THE LIFE OF EELKOM'.  * "'eelkom' is a reverse version of the 'mok' and 'Lee' parts from my name, Changmok Lee."
  
- [Coverflow] : I brought back and applied iTunes' Cover Flow function, which was used in iPods and early versions of iOS but disappeared in 2012. I wanted to scroll and display my captions as album art using the Cover Flow function

- [Launchpad] : I created a small launchpad that can play the piano notes of 'Runaway.' Inspired by seeing Kanye West perform and use a launchpad to play his song 'Runaway,' I decided to build a compact launchpad specifically for playing the piano notes of the track.

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
