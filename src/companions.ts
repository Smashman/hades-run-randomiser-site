import { getRandomItemFromArray, Item, Level, Options, Resource } from './utils';
import { ItemList } from './utils';

export interface CompanionOptions extends Options {
    ignoreMaxCodex?: boolean;
}

export const defaultCompanionOptions: CompanionOptions = {
    enabled: true,
    ignoreMaxCodex: true,
};

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

    get resourceTotal() {
        return this.items.reduce((total, companion) => total + companion.resource.total, 0);
    }

    get resourceSpent() {
        return this.items.reduce((total, companion) => total + companion.resource.spent, 0);
    }

    get resourceRequired() {
        return this.resourceTotal - this.resourceSpent;
    }
}

export class Companion extends Item {
    level = new Level(1, Companion.minLevel, Companion.maxLevel);
    resource: Resource;
    isMaxCodex: boolean = false;

    constructor(public name: string, public giver: string) {
        super();
        this.resource = new Resource(Companion.levelCosts, this.level, 'ambrosia');
    }

    static levelCosts = [0, 1, 2, 3, 4];
    static minLevel = 1;
    static maxLevel = Companion.levelCosts.length;

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