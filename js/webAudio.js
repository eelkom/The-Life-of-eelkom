(() => {
    /* 
     웹 오디오 API에서 발생하는 보안 정책 중 하나로, 사용자의 제스처에 의해 생성되거나 재개된 이후에만 AudioContext를 시작할 수 있도록 요구합니다. 
     보통 사용자 제스처는 사용자의 명시적인 동작(클릭, 터치 등)을 의미합니다. 
     이러한 보안 정책은 사용자 경험 및 개인 정보 보호를 위해 적용되고 있습니다.
     따라서, AudioContext를 시작하기 전에 사용자의 명시적인 동작을 요구해야 합니다. 
    */

    function initAudioContext() {
        document.removeEventListener('click', initAudioContext);
        document.removeEventListener('touchstart', initAudioContext);

        // 1. 오디오 컨텍스트 생성
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        // 피아노 키 요소 선택
        const keys = Array.from(document.querySelectorAll('.key'));

        // 피아노 키 이벤트 핸들링
        keys.forEach((key, index) => {
            key.addEventListener('mousedown', handleKeyEvent);
            key.addEventListener('mouseup', handleKeyEvent);
            key.addEventListener('mouseleave', handleKeyEvent);
            key.addEventListener('touchstart', handleKeyEvent); // 터치 시작 이벤트 추가
            key.addEventListener('touchend', handleKeyEvent);   // 터치 끝 이벤트 추가

            // 키보드와 피아노 매핑을 위한 데이터 속성 추가
            const keyMapping = getKeyMapping(index)
            key.setAttribute('data-key', keyMapping);
        });
        window.addEventListener('keydown', handleKeyEvent);
        window.addEventListener('keyup', handleKeyEvent);

        // 키보드와 피아노 매핑을 위한 헬퍼 함수
        function getKeyMapping(index) {
            const keyMapping = ['q', 'w', 'a', 's', 'd', 'z', 'x', 'c']; // 예시: a부터 j까지의 키를 매핑
            return keyMapping[index];
        }

        // 키보드 이벤트 및 마우스 이벤트 핸들러
        function handleKeyEvent(event) {
            const isKeyboardEvent = event.type === 'keydown' || event.type === 'keyup';
            const key = isKeyboardEvent ? event.key.toLowerCase() : this.dataset.note;
            const pianoKey = isKeyboardEvent ? document.querySelector(`[data-key="${key}"]`) : document.querySelector(`[data-note="${key}"]`);
            // const pianoKey = document.getElementById(note);

            if (pianoKey) {
                if (isKeyboardEvent) {
                    if (event.type === 'keydown') {
                        // playNoteByKey(pianoKey.dataset.note);
                        playNoteByKey(pianoKey);
                    } else {
                        // releaseNoteByKey(pianoKey.dataset.note);
                        releaseNoteByKey(pianoKey);
                    }
                } else {
                    if (event.type === 'mousedown') {
                        // playNoteByKey(this.dataset.note);
                        playNoteByKey(this);
                    } else {
                        // releaseNoteByKey(this.dataset.note);
                        releaseNoteByKey(this);
                    }
                }
                pianoKey.classList.toggle('active', event.type === 'keydown' || event.type === 'mousedown' || event.type === 'touchstart');
            }
        }

        // 키에 해당하는 음 재생
        function playNoteByKey(audioElement) {
            audioElement.currentTime = 0; // 재생 시작 위치를 0으로 설정
            audioElement.play();
        }

        function releaseNoteByKey(audioElement) {
            audioElement.pause(); // 오디오 재생 중지
            audioElement.currentTime = 0; // 다음 재생을 위해 시작 위치로 초기화
        }

        // 키에 해당하는 음 재생
        // function playNoteByKey(note) {
        //     const oscillator = audioContext.createOscillator();
        //     const gainNode = audioContext.createGain();

        //     oscillator.connect(gainNode);
        //     gainNode.connect(audioContext.destination);
        //     oscillator.frequency.value = getFrequency(note);
        //     oscillator.type = 'triangle';
        //     oscillator.start();

        //     gainNode.gain.setValueAtTime(1, audioContext.currentTime);

        //     // 끝 소리를 부드럽게 만들기 위해 볼륨을 서서히 줄입니다.
        //     const duration = 0.9; // 끝 소리를 재생할 시간 (초)
        //     const endTime = audioContext.currentTime + duration;
        //     const releaseTime = endTime - 0.1; // 끝 소리를 서서히 줄이기 시작할 시간 (0.1초 전)
        //     gainNode.gain.linearRampToValueAtTime(0, releaseTime);

        //     // 일정 시간 후에 오실레이터를 멈춥니다.
        //     oscillator.stop(endTime);
        // }
        // function releaseNoteByKey(note) {
        //     const activeKey = document.querySelector(`[data-note=${note}]`);
        //     if (activeKey) {
        //         activeKey.classList.remove('active');
        //     }
        // }

        // 음에 해당하는 주파수 가져오기
        // function getFrequency(note) {
        //     const frequencies = {
        //         upE: 329.63 * 2,
        //         E: 329.63,
        //         upDs: 311.13 * 2,
        //         Ds: 311.13,
        //         upCs: 277.18 * 2,
        //         Cs: 277.18,
        //         Gs : 415.30,
        //         A: 440.00,
        //     };
        //     return frequencies[note];
        // }
    }

    // 사용자 제스처에 의해 오디오 컨텍스트를 초기화
    document.addEventListener('click', initAudioContext);
    document.addEventListener('touchstart', initAudioContext); // 터치 이벤트 추가
})();