import { Item, ItemList, Options, getRandomItemFromArray, Level, StorableItemListData, StorableItemData } from './utils';

export interface WeaponOptions extends Options {
    randomAspect?: boolean;
}

export type StorableWeaponsData = StorableItemListData<StorableWeaponData>;

export class Weapons extends ItemList<Weapon> {
    unlockAll() {
        super.unlockAll();
        this.items.forEach(weapon => weapon.unlockAllAspects());
    }

    maxLevelAll() {
        this.items.forEach(weapon => weapon.maxLevelAllAspects());
    }
}

interface StorableWeaponData extends StorableItemData {
    aspects: StorableWeaponAspectData[];
}

export class Weapon extends Item {
    aspects: WeaponAspect[] = [];
    canBeLocked: boolean = true;

    constructor(public name: string, public title: string, public shortName: string, public isUnlocked: boolean = false){
        super();
        this.canBeLocked = !isUnlocked;
    }

    get unlockedAspects() {
        return this.aspects.filter(aspect => aspect.isUnlocked);
    }

    lock() {
        if (this.canBeLocked) {
            super.lock();
        }
    }

    addAspect(aspect: WeaponAspect) {
        this.aspects = [...this.aspects, aspect];
        return this;
    }

    addAspects(aspects: WeaponAspect[]) {
        aspects.forEach(aspect => this.addAspect(aspect));
        return this;
    }

    unlockAllAspects() {
        this.aspects.forEach(aspect => aspect.unlock());
    }

    maxLevelAllAspects() {
        this.aspects.forEach(aspect => aspect.level.setMaxLevel());
    }

    getRandomAspect(): WeaponAspect {
        return getRandomItemFromArray(this.unlockedAspects) ?? null;
    }

    toStorableData(): StorableWeaponData {
        const itemData = super.toStorableData();
        return {
            ...itemData,
            aspects: this.aspects.map(aspect => aspect.toStorableData()),
        }
    }

    // fromStoredData(storedData: StorableItemListData<StorableItemData>) {
    //     if (storedData) {
    //         storedData.items.map((data, index) => {
    //             this.items[index].fromStoredData(data);
    //         });
    //     }
    // }

    fromStoredData(storedData: StorableWeaponData) {
        super.fromStoredData(storedData);
        if (storedData) {
            storedData.aspects.map((data, index) => {
                this.aspects[index].fromStoredData(data);
            })
        }
    }
}

interface StorableWeaponAspectData extends StorableItemData {
    level: number;
}

export class WeaponAspect extends Item {
    level: Level;
    canBeLocked: boolean = true;

    constructor(public name: string, public icon: string, public isHidden: boolean = false, public isUnlocked: boolean = false){
        super();
        const onLevelChange = this.onLevelChange.bind(this);
        this.level = new Level(0, WeaponAspect.minLevel, WeaponAspect.maxLevel, onLevelChange);
        this.canBeLocked = !isUnlocked;
    }

    static minLevel = 0;
    static maxLevel = 5;

    lock() {
        if (this.canBeLocked) {
            super.lock();
        }
    }

    onLevelChange(level: number) {
        this.isUnlocked = this.canBeLocked ? level > WeaponAspect.minLevel : true;
    }

    toStorableData(): StorableWeaponAspectData {
        const itemData = super.toStorableData();
        return {
            ...itemData,
            level: this.level.value,
        }
    }

    fromStoredData(storableData: StorableWeaponAspectData) {
        super.fromStoredData(storableData);
        this.level.value = storableData.level;
    }
}