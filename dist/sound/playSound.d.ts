export declare function playSound({ sound, gainNode }: {
    sound: HTMLAudioElement;
    gainNode: GainNode;
}, volume?: number): Promise<void>;
