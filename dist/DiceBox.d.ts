export class DiceBox {
    constructor(element_container: any, options?: {});
    initialized: boolean;
    container: any;
    dimensions: THREE.Vector2;
    adaptive_timestep: boolean;
    last_time: number;
    running: boolean;
    rolling: boolean;
    raycaster: THREE.Raycaster;
    mouse: THREE.Vector2;
    hoveredDice: any;
    display: {
        currentWidth: null;
        currentHeight: null;
        containerWidth: null;
        containerHeight: null;
        aspect: null;
        scale: null;
    };
    cameraHeight: {
        max: null;
        close: null;
        medium: null;
        far: null;
    };
    scene: THREE.Scene;
    world: CANNON.World;
    dice_body_material: CANNON.Material;
    sounds_table: {};
    sounds_dice: any[];
    lastSoundType: string;
    lastSoundStep: number;
    lastSound: number;
    box_body: {};
    bodies: any[];
    meshes: any[];
    diceList: any[];
    notationVectors: any;
    dieIndex: number;
    soundDelay: number;
    animstate: string;
    selector: {
        animate: boolean;
        rotate: boolean;
        intersected: null;
        dice: never[];
    };
    DiceColors: DiceColors;
    DiceFactory: DiceFactory;
    surface: any;
    enableShadows(): void;
    shadows: boolean | undefined;
    disableShadows(): void;
    initialize(): Promise<void>;
    renderer: THREE.WebGLRenderer | undefined;
    makeWorldBox(): void;
    loadTheme(themeConfig: any): Promise<void>;
    colorData: any;
    loadSounds(): Promise<void>;
    updateConfig(options?: {}): Promise<void>;
    theme_customColorset: any;
    /**
     *
     * @param dimensions {undefined|THREE.Vector2} if undefined, use container size
     */
    setDimensions(dimensions?: undefined | THREE.Vector2): void;
    camera: THREE.PerspectiveCamera | undefined;
    light: THREE.SpotLight | undefined;
    light_amb: THREE.HemisphereLight | undefined;
    desk: THREE.Mesh<THREE.PlaneGeometry, THREE.ShadowMaterial, THREE.Object3DEventMap> | undefined;
    resizeWorld(): void;
    vectorRand({ x, y }: {
        x: any;
        y: any;
    }): {
        x: number;
        y: number;
    };
    getNotationVectors(notation: any, vector: any, boost: any, dist: any): DiceNotation;
    swapDiceFace(dicemesh: any, result: any): void;
    swapDiceFace_D4(dicemesh: any, result: any): void;
    spawnDice(vectordata: any, reset?: boolean): void;
    eventCollide({ body, target }: {
        body: any;
        target: any;
    }): void;
    checkForRethrow(dicemesh: any): boolean;
    throwFinished(): boolean;
    simulateThrow(): void;
    iteration: number | undefined;
    animateThrow(threadid: any, callback: any): void;
    animateAfterThrow(threadid: any): void;
    startClickThrow(notation: any): DiceNotation;
    clearDice(): void;
    getDiceResults(id: any): any;
    roll(notationSting: any): Promise<any>;
    reroll(diceIdArray: any): Promise<any>;
    add(notationSting: any): Promise<any>;
    steps: number | undefined;
    remove(diceIdArray: any): Promise<any>;
    rollDice(callback: any): void;
    onMouseMove(event: any): void;
    onMouseClick(event: any): void;
    getScreenPosition(position: any): {
        x: number;
        y: number;
    } | undefined;
}
import * as THREE from "three";
import * as CANNON from "cannon-es";
import { DiceColors } from "./DiceColors.js";
import { DiceFactory } from "./DiceFactory.js";
import { DiceNotation } from "./DiceNotation.js";
