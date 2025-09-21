export function playSound({ sound, gainNode }, volume = 1) {
    sound.volume = 1;
    gainNode.gain.value = volume;
    return sound.play().catch(() => { });
}
//# sourceMappingURL=playSound.js.map