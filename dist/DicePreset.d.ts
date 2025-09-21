export class DicePreset {
    constructor(name: any);
    shape: any;
    type: any;
    setValues(min?: number, max?: number, step?: number): void;
    values: any[] | undefined;
    setValueMap(map: any): void;
    registerFaces(faces: any, type?: string): void;
    labels: any[][][] | undefined;
    setLabels(labels: any): void;
    setBumpMaps(normals: any): void;
    loadTextures(textures: any, callback: any, type: any): void;
    range(start: any, stop: any, step?: number): any[];
}
