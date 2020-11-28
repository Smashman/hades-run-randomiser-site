import { Item, ItemList, Options, getRandomItemFromArray, Level, StorableItemListData, StorableItemData, Resource } from './utils';

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

    get resourceTotal() {
        return this.items.reduce((total, weapon) => total + weapon.resourceTotal, 0);
    }

    get resourceSpent() {
        return this.items.reduce((total, weapon) => total + weapon.resourceSpent, 0);
    }

    get resourceRequired() {
        return this.resourceTotal - this.resourceSpent;
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

    get resourceTotal() {
        return this.aspects.reduce((total, aspect) => total + aspect.resource.total, 0);
    }

    get resourceSpent() {
        return this.aspects.reduce((total, aspect) => total + aspect.resource.spent, 0);
    }

    get resourceRequired() {
        return this.resourceTotal - this.resourceSpent;
    }

    toStorableData(): StorableWeaponData {
        const itemData = super.toStorableData();
        return {
            ...itemData,
            aspects: this.aspects.map(aspect => aspect.toStorableData()),
        }
    }

    fromStoredData(storedData: StorableWeaponData) {
        super.fromStoredData(storedData);
        storedData.aspects.map((data, index) => {
            this.aspects[index].fromStoredData(data);
        });
    }
}

interface StorableWeaponAspectData extends StorableItemData {
    level: number;
}

export class WeaponAspect extends Item {
    level: Level;
    resource: Resource;
    maxLevel: number;
    canBeLocked: boolean = true;

    constructor(public name: string, public icon: string, private readonly levelCosts: number[], public isHidden: boolean = false, public isUnlocked: boolean = false){
        super();
        const onLevelChange = this.onLevelChange.bind(this);
        this.maxLevel = levelCosts.length;
        this.level = new Level(0, WeaponAspect.minLevel, this.maxLevel, onLevelChange);
        this.resource = new Resource(levelCosts, this.level, 'blood');
        this.canBeLocked = !isUnlocked;
    }

    static minLevel = 0;

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