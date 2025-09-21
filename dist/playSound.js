export function playSound(sound, volume = 1) {
    sound.volume = 1;
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaElementSource(sound);
    console.log("LOG-d gain is", volume);
    const gainNode = audioCtx.createGain();
    gainNode.gain.value = volume;
    source.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    return sound.play().catch(() => { });
}
//# sourceMappingURL=playSound.js.map