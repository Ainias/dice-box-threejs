export class DiceNotation {
    static mergeNotation(prevNotation: any, newNotation: any): any;
    constructor(notation: any);
    set: any[];
    setkeys: any[];
    setid: number;
    groups: any[];
    totalDice: number;
    op: string;
    constant: number | null;
    result: any[];
    error: boolean;
    boost: number;
    notation: string;
    vectors: any[];
    parseNotation(notation: any): void;
    stringify(full?: boolean): string;
    addSet(amount: any, type: any, groupID?: number, groupLevel?: number, funcname?: string, funcargs?: string, operator?: string): void;
}
