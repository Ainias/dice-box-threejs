export declare function loadSound(src: string): Promise<{
    sound: HTMLAudioElement;
    gainNode: GainNode;
} | undefined>;
