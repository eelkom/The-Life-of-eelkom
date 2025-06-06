(() => {
    // for runaway
    const soundsYe = ['upE', 'E', 'upDs', 'Ds', 'upCs', 'Cs', 'A', 'Gs'];
    const soundMapYe = ['7', '8', '4', '5', '6', '1', '2', '3'];
    const START_TIME_Ye = 0.13;

    // for Harder, Better, Faster, Stronger
    const soundsDaft = ['Work_it', 'Make_it', 'Do_it', 'Makes_us', 'Harder', 'Better', 'Faster', 'Stronger', 'More_than', 'Hour', 'Our', 'Never', 'Ever', 'After', 'Work_is', 'Over', 'All', 'Drum', '', '',];
    const soundMapDaft = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f', 't', 'y', 'u', 'i', 'g', 'h', 'j', 'k', 'z', 'x', 'undefined'];
    const START_TIME_Daft = 0;

    let audioElems = {};
    const current = ['Ye', 'Daft'];
    let flag = 0;
    const parentC = document.querySelector(".soundboard-container");


    function init() {

        audioElems = {}; // 초기화

        if (current[flag] === 'Ye') {
            c = createKey(soundsYe, soundMapYe);
        } else {
            c = createKey(soundsDaft, soundMapDaft);
        }

        window.addEventListener('keydown', (e) => {
            if (audioElems[e.key]) {
                playAudio(audioElems[e.key], (flag === 0 ? START_TIME_Ye : START_TIME_Daft));
            }
        });
        return c;
    }

    function createKey(sounds, soundMap) {
        // const parentC = document.querySelector(".soundboard-container");
        // const c = document.querySelector(".soundboard");
        let c = document.createElement('div');
        c.classList.add('soundboard');
        parentC.appendChild(c);

        let key = document.createElement('div');
        key.innerHTML = '<h1>Launch<br>Pad</h1>';
        key.style.fontWeight = '700';
        c.appendChild(key);

        for (let i = 0; i < sounds.length; i++) {
            // content
            let key = document.createElement('div');
            key.classList.add('key');
            key.textContent = `${sounds[i]} (${soundMap[i]})`;
            c.appendChild(key);

            //Create audioElem
            let audioElem = new Audio(`audio${current[flag]}/${sounds[i]}.wav`);
            audioElem.type = 'audio/wav';
            audioElems[soundMap[i]] = audioElem;

            // content style
            key.style.perspective = '600px';
            key.style.transformStyle = 'preserve-3d';
            key.style.transition = 'transform 0.7s ease';

            // content EventListner
            key.addEventListener('click', () => {
                // let startTime = `START_TIME_${current[flag]}`;
                playAudio(audioElem, (flag === 0 ? START_TIME_Ye : START_TIME_Daft));
            });

            key.addEventListener('mouseover', () => {
                key.style.transform = 'rotateY(30deg)';
            });
            key.addEventListener('mouseout', () => {
                key.style.transform = 'rotateY(0deg)';
            });
        }
        return c
    }

    function playAudio(audio, START_TIME) {
        audio.pause();
        audio.currentTime = START_TIME;
        audio.play();
    }

    const button = document.querySelector("button");
    console.log(button);
    button.addEventListener('click', () => {
        flag = (flag === 1) ? 0 : 1;

        // const c = document.querySelector(".soundboard");
        // parentC.removeChild();
        parentC.replaceChildren();
        init();
    });

    init();
})();
