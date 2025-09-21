export class DiceColors {
    constructor(options?: {});
    colorsets: any[];
    assetPath: any;
    ImageLoader(data: any): Promise<any>;
    loadImage(src: any): Promise<any>;
    getColorSet(options: any): Promise<any>;
    makeColorSet(options?: {}): Promise<any>;
    getTexture(texturename: any): any;
}
