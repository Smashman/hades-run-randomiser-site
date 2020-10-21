import { getRandomItemFromArray, Options, ItemList, Item } from "./utils";

export type KeepsakeConfiguration = [Keepsake] | [Keepsake, Keepsake, Keepsake, Keepsake];

export class Keepsake extends Item {
    level: number = 1;
    constructor(public name: string, public giver: string, public isHidden: boolean = false) {
        super();
    }

    static maxLevel = 3;

    get isMaxLevel(): boolean {
        return this.level === Keepsake.maxLevel;
    }
}

export class Keepsakes extends ItemList<Keepsake> {
    getRandomKeepsakes(keepsakeOptions?: KeepsakeOptions): KeepsakeConfiguration {
        const keepsakes = (keepsakeOptions?.ignoreMaxLevel && !this.isAllMaxLevel) ? [...this.unlocked.filter(keepsake => !keepsake.isMaxLevel)] : [...this.unlocked];

        if (keepsakes.length === 0) {
            return null;
        }

        let keepsakesChosen: Keepsake[] = [getRandomItemFromArray(keepsakes)];

        if (keepsakeOptions?.changeBetweenBiomes) {
            for (let i = 1; i <= 3; i++) {
                keepsakesChosen = [...keepsakesChosen, getRandomItemFromArray(keepsakes.filter(keepsake => !keepsakesChosen.includes(keepsake))) ?? null];
            }
        }

        return keepsakesChosen as KeepsakeConfiguration;
    }

    maxLevelAll() {
        this.items.forEach(keepsake => keepsake.level = Keepsake.maxLevel);
    }

    get isAllMaxLevel() {
        return this.items.every(keepsake => keepsake.isMaxLevel);
    }
}

export interface KeepsakeOptions extends Options {
    ignoreMaxLevel?: boolean;
    changeBetweenBiomes?: boolean;
}