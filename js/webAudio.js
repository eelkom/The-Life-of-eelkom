(() => {
    const keys = ['upE', 'E', 'upDs', 'Ds', 'upCs', 'Cs', 'A', 'Gs'];
    const keyMap = ['q', 'w', 'a', 's', 'd', 'z', 'x', 'c'];
    const audioElements = {};
    // const START_TIME = 0.13;
    const START_TIME = 0;

    const sounds = [
        'Work_it',
        'Make_it',
        'Do_it',
        'Makes_us',
        'Harder',
        'Better',
        'Faster',
        'Stronger',
        'More_than',
        'Hour',
        'Our',
        'Never',
        'Ever',
        'After',
        'Work_is',
        'Over',
        'All',
        'Drum',
        '',
    ];
    const soundMap = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 't', 'y', 'u', 'i', 'g', 'h', 'j', 'k', 'z', 'x', 'undefined'];
    const audioElements2 = {};
    const START_TIME2 = 0;

    function init() {
        const c = document.querySelector(".soundboard");

        for (let i = 0; i < keys.length; i++) {
            // content
            let key = document.createElement('div');
            key.classList.add('key');
            key.textContent = `${keys[i]} (${keyMap[i]})`;
            c.appendChild(key);

            //Create audioElem
            let audioElem = new Audio(`audio/${keys[i]}.mp3`);
            audioElem.type = 'audio/mp3';
            audioElements[keyMap[i]] = audioElem;

            // content style
            key.style.perspective = '600px';
            key.style.transformStyle = 'preserve-3d';
            key.style.transition = 'transform 0.7s ease';

            // content EventListner
            key.addEventListener('click', () => {
                playAudio(audioElem);
            });

            key.addEventListener('mouseover', () => {
                key.style.transform = 'rotateY(30deg)';
            });
            key.addEventListener('mouseout', () => {
                key.style.transform = 'rotateY(0deg)';
            });
        }

        window.addEventListener('keydown', (e) => {
            if (audioElements[e.key]) {
                playAudio(audioElements[e.key]);
            }
        });
    }

    function playAudio(audio) {
        audio.pause();
        audio.currentTime = START_TIME;
        audio.play();
    }

    function init2() {
        const c = document.querySelector(".soundboard2");

        for (let i = 0; i < sounds.length; i++) {
            // content
            let content = document.createElement('div');
            content.classList.add('content');
            content.textContent = `${sounds[i]} (${soundMap[i]})`;
            c.appendChild(content);

            //Create audioElem
            let audioElem = new Audio(`audio_daft/${sounds[i]}.wav`);
            audioElem.type = 'audio/wav';
            audioElements[soundMap[i]] = audioElem;

            // content style
            content.style.perspective = '600px';
            content.style.transformStyle = 'preserve-3d';
            content.style.transition = 'transform 0.7s ease';

            // content EventListner
            content.addEventListener('click', () => {
                playAudio(audioElem);
            });
            content.addEventListener('mouseover', () => {
                content.style.transform = 'rotateY(30deg)';
            });
            content.addEventListener('mouseout', () => {
                content.style.transform = 'rotateY(0deg)';
            });
        }

        window.addEventListener('keydown', (e) => {
            if (audioElements2[e.key]) {
                playAudio(audioElements2[e.key]);
            }
        });
    }

    init();
    init2();
})();
