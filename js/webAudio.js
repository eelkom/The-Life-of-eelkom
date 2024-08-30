(() => {
    let audioContextInitialized = false; // 오디오 컨텍스트 초기화 상태

    function initAudioContext() {
        if (audioContextInitialized) return; // 이미 초기화되었으면 종료

        // 1. 오디오 컨텍스트 생성
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextInitialized = true; // 초기화 상태 설정

        // 피아노 키 요소 선택
        const keys = Array.from(document.querySelectorAll('.key'));

        // 피아노 키 이벤트 핸들링
        keys.forEach((key, index) => {
            key.addEventListener('mousedown', handleKeyEvent);
            key.addEventListener('mouseup', handleKeyEvent);
            key.addEventListener('mouseleave', handleKeyEvent);
            key.addEventListener('touchstart', handleKeyEvent);
            key.addEventListener('touchend', handleKeyEvent);
            key.addEventListener('touchmove', handleKeyEvent); // 터치 이동 이벤트 추가

            // 키보드와 피아노 매핑을 위한 데이터 속성 추가
            const keyMapping = getKeyMapping(index);
            key.setAttribute('data-key', keyMapping);
        });

        window.addEventListener('keydown', handleKeyEvent);
        window.addEventListener('keyup', handleKeyEvent);

        function getKeyMapping(index) {
            const keyMapping = ['q', 'w', 'a', 's', 'd', 'z', 'x', 'c']; // 예시 키보드 매핑
            return keyMapping[index];
        }

        function handleKeyEvent(event) {
            const isKeyboardEvent = event.type === 'keydown' || event.type === 'keyup';
            const key = isKeyboardEvent ? event.key.toLowerCase() : this.dataset.note;
            const pianoKey = isKeyboardEvent ? document.querySelector(`[data-key="${key}"]`) : document.querySelector(`[data-note="${key}"]`);
            const soundId = pianoKey ? pianoKey.dataset.note : null;
            const sound = document.getElementById(soundId);

            if (sound) {
                const isPlaying = event.type === 'keydown' || event.type === 'mousedown' || event.type === 'touchstart';

                if (isPlaying) {
                    playNoteByKey(sound);
                }
                else {
                    const stopDelay = 2800; // 소리를 정지할 시간 (밀리초 단위, 예: 2000ms = 2초)
                    setTimeout(() => {
                        releaseNoteByKey(audioElement);
                    }, stopDelay);
                    // releaseNoteByKey(sound);
                }

                if (pianoKey) {
                    pianoKey.classList.toggle('active', isPlaying);
                }
            }
        }

        function playNoteByKey(audioElement) {
            audioElement.currentTime = 0.13; // 오디오를 처음부터 시작s
            audioElement.play();
        }

        function releaseNoteByKey(audioElement) {
            audioElement.pause(); // 오디오 재생 중지
            audioElement.currentTime = 0.13; // 다음 재생을 위해 시작 위치로 초기화
        }
    }

    // 사용자 제스처에 의해 오디오 컨텍스트를 초기화
    document.addEventListener('click', initAudioContext);
    document.addEventListener('touchstart', initAudioContext); // 터치 이벤트 추가
})();
