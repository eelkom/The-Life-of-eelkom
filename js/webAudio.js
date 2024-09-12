(() => {
    let audioContextInitialized = false; // 오디오 컨텍스트 초기화 상태
    let activeTouches = new Set(); // 활성화된 터치 이벤트 추적
    let audioContext; // 오디오 컨텍스트를 전역적으로 선언
    let currentlyPlaying = null; // 현재 재생 중인 오디오 추적
    let sustainTime = 3000; // 서스테인 시간 (밀리초 단위로 설정, 예: 2000ms = 2초)
    let sustainTimer = null; // 서스테인 타이머 ID를 저장

    function initAudioContext() {
        if (audioContextInitialized) return; // 이미 초기화되었으면 종료
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextInitialized = true; // 초기화 상태 설정

        // 피아노 키 요소 선택
        const keys = Array.from(document.querySelectorAll('.key'));
        const keyMapping = ['q', 'w', 'a', 's', 'd', 'z', 'x', 'c']; // 예시 키보드 매핑

        // 피아노 키 이벤트 핸들링
        keys.forEach((key, index) => {
            key.addEventListener('mousedown', handleKeyEvent);
            key.addEventListener('mouseup', handleKeyEvent);
            key.addEventListener('mouseleave', handleKeyEvent);
            key.addEventListener('touchstart', handleTouchEvent, { passive: false }); // 터치 시작 이벤트 추가
            key.addEventListener('touchend', handleTouchEvent, { passive: false });   // 터치 끝 이벤트 추가

            // 키보드와 피아노 매핑을 위한 데이터 속성 추가
            key.setAttribute('data-key', keyMapping[index]);
        });

        window.addEventListener('keydown', handleKeyEvent);
        window.addEventListener('keyup', handleKeyEvent);
    }

    function handleTouchEvent(event) {
        event.preventDefault(); // 터치 이벤트의 기본 동작을 방지
        const touch = event.changedTouches[0]; // 첫 번째 터치 추출
        const key = event.target.dataset.note;
        const sound = document.getElementById(key);

        if (event.type === 'touchstart') {
            if (!activeTouches.has(touch.identifier)) {
                activeTouches.add(touch.identifier);
                stopCurrentSound(); // 현재 재생 중인 소리 중지
                playNoteByKey(sound);
                event.target.classList.add('active');
            }
        } else if (event.type === 'touchend') {
            activeTouches.delete(touch.identifier);
            event.target.classList.remove('active');
            sustainTimer = setTimeout(() => {
                releaseNoteByKey(sound);
            }, sustainTime);
        }
    }

    function handleKeyEvent(event) {
        const isKeyboardEvent = event.type === 'keydown' || event.type === 'keyup';
        const key = isKeyboardEvent ? event.key.toLowerCase() : this.dataset.note;
        const pianoKey = isKeyboardEvent ? document.querySelector(`[data-key="${key}"]`) : document.querySelector(`[data-note="${key}"]`);
        if (!pianoKey) return;

        const soundId = pianoKey.dataset.note;
        const sound = document.getElementById(soundId);
        if (!sound) return;

        const isPlaying = event.type === 'keydown' || event.type === 'mousedown';

        if (isPlaying) {
            stopCurrentSound(); // 현재 재생 중인 소리 중지
            playNoteByKey(sound);
        } else {
            setTimeout(() => {
                releaseNoteByKey(sound);
            }, sustainTime);
        }

        pianoKey.classList.toggle('active', isPlaying);
    }

    function playNoteByKey(audioElement) {
        if (currentlyPlaying) {
            releaseNoteByKey(currentlyPlaying); // 현재 재생 중인 오디오 중지
        }
        currentlyPlaying = audioElement; // 새 오디오 설정
        audioElement.currentTime = 0.13; // 오디오를 처음부터 시작
        audioElement.play();
    }

    function releaseNoteByKey(audioElement) {
        if (audioElement) {
            audioElement.pause(); // 오디오 재생 중지
            audioElement.currentTime = 0.13; // 다음 재생을 위해 시작 위치로 초기화
        }
    }

    function stopCurrentSound() {
        if (currentlyPlaying) {
            releaseNoteByKey(currentlyPlaying);
            currentlyPlaying = null;
        }

        if (sustainTimer) {
            clearTimeout(sustainTimer); // 서스테인 타이머를 무효화하여 예정된 작업을 취소
            sustainTimer = null;
        }
    }

    // 사용자 제스처에 의해 오디오 컨텍스트를 초기화
    document.addEventListener('click', initAudioContext);
    document.addEventListener('touchstart', initAudioContext, { passive: true }); // 터치 이벤트 추가
})();
