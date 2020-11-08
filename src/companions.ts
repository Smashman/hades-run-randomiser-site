import { getRandomItemFromArray, Item, Options } from './utils';
import { ItemList } from './utils';

export class Companion extends Item {
    level: number = 1;
    isMaxCodex: boolean = false;
    constructor(public name: string, public giver: string) {
        super();
    }

    static maxLevel: number = 5;

    get isMaxLevel(): boolean {
        return this.level === Companion.maxLevel;
    }
}

export class Companions extends ItemList<Companion> {
    getRandomCompanion(companionOptions?: CompanionOptions): Companion | null {
        const companions = (companionOptions?.ignoreMaxCodex && !this.isAllUnlockedMaxLevel) ? [...this.unlocked.filter(companion => !companion.isMaxCodex)] : [...this.unlocked];
        return getRandomItemFromArray(companions) ?? null;
    }

    maxCodexAll() {
        this.items.forEach(companion => companion.isMaxCodex = true);
    }

    get isAllMaxCodex() {
        return this.items.every(companion => companion.isMaxCodex);
    }

    maxLevelAll() {
        this.items.forEach(companion => companion.level = Companion.maxLevel);
    }

    get isAllUnlockedMaxLevel() {
        return this.unlocked.every(companion => companion.isMaxLevel);
    }

    get isAllMaxLevel() {
        return this.items.every(companion => companion.isMaxLevel);
    }
}

export interface CompanionOptions extends Options {
    ignoreMaxCodex?: boolean;
}