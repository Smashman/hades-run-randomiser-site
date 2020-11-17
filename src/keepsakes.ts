import { getRandomItemFromArray, Options, ItemList, Item, Level, StorableItemListData, StorableItemData } from './utils';

export interface KeepsakeOptions extends Options {
    ignoreMaxLevel?: boolean;
    changeBetweenBiomes?: boolean;
}

export interface StorableKeepsakesData extends StorableItemListData<StorableKeepsakeData> {

}

export class Keepsakes extends ItemList<Keepsake> {
    getRandomKeepsakes(keepsakeOptions?: KeepsakeOptions): KeepsakeConfiguration {
        const keepsakes = (keepsakeOptions?.ignoreMaxLevel && !this.isAllUnlockedMaxLevel) ? [...this.unlocked.filter(keepsake => !keepsake.isMaxLevel)] : [...this.unlocked];

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
        this.items.forEach(keepsake => keepsake.level.setMaxLevel());
    }

    get isAllUnlockedMaxLevel() {
        return this.unlocked.every(keepsake => keepsake.isMaxLevel);
    }

    get isAllMaxLevel() {
        return this.items.every(keepsake => keepsake.isMaxLevel);
    }

    fromStoredData(storedData: StorableKeepsakesData) {
        super.fromStoredData(storedData);
    }
}

interface StorableKeepsakeData extends StorableItemData {
    level: number;
}

export class Keepsake extends Item {
    level: Level = new Level(1, Keepsake.minLevel, Keepsake.maxLevel);
    constructor(public name: string, public giver: string, public icon: string, public isHidden: boolean = false) {
        super();
    }

    static minLevel = 1;
    static maxLevel = 3;

    get isMaxLevel(): boolean {
        return this.level.isMaxLevel();
    }

    toStorableData(): StorableKeepsakeData {
        const itemData = super.toStorableData();
        return {...itemData, level: this.level.value};
    }

    fromStoredData(storableData: StorableKeepsakeData) {
        super.fromStoredData(storableData);
        this.level.value = storableData.level;
    }
}

export type KeepsakeConfiguration = [Keepsake] | [Keepsake, Keepsake | null, Keepsake | null, Keepsake | null] | null;