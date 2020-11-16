import { getRandomItemFromArray, Item, Level, Options } from './utils';
import { ItemList } from './utils';

export interface CompanionOptions extends Options {
    ignoreMaxCodex?: boolean;
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
        this.items.forEach(companion => companion.level.setMaxLevel());
    }

    get isAllUnlockedMaxLevel() {
        return this.unlocked.every(companion => companion.isMaxLevel);
    }

    get isAllMaxLevel() {
        return this.items.every(companion => companion.isMaxLevel);
    }
}

export class Companion extends Item {
    level: Level = new Level(1, Companion.minLevel, Companion.maxLevel);
    isMaxCodex: boolean = false;
    constructor(public name: string, public giver: string) {
        super();
    }

    static minLevel: number = 1;
    static maxLevel: number = 5;

    get isMaxLevel(): boolean {
        return this.level.isMaxLevel();
    }

    toStorableData() {
        const itemData = super.toStorableData();
        return {
            ...itemData,
            level: this.level.value,
            isMaxCodex: this.isMaxCodex,
        }
    }
}