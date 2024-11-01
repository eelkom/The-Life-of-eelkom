(() => {
    const keys = ['upE', 'E', 'upDs', 'Ds', 'upCs', 'Cs', 'A', 'Gs'];
    const keyMap = ['q', 'w', 'a', 's', 'd', 'z', 'x', 'c'];
    const audioElements = {};
    const START_TIME = 0.13;

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

    init();
})();
