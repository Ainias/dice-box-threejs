
export function playSound({sound, gainNode}:{ sound: HTMLAudioElement, gainNode: GainNode }, volume = 1){
    sound.volume = 1;
    gainNode.gain.value = volume;
    return sound.play().catch(() => {});
}
