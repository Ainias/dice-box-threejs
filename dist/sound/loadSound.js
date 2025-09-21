export function loadSound(src) {
    return new Promise((resolve, reject) => {
        let audio = new Audio();
        audio.oncanplaythrough = () => resolve(audio);
        audio.crossOrigin = "anonymous";
        audio.src = src;
        audio.onerror = (error) => reject(error);
    }).then(audio => {
        const audioCtx = new AudioContext();
        const source = audioCtx.createMediaElementSource(audio);
        const gainNode = audioCtx.createGain();
        gainNode.gain.value = 1;
        source.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        return {
            sound: audio,
            gainNode
        };
    }).catch((e) => {
        console.error("Unable to load audio");
        return undefined;
    });
}
//# sourceMappingURL=loadSound.js.map