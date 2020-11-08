import { Item, ItemList, Options, getRandomItemFromArray, Level } from './utils';

export class WeaponAspect extends Item {
    level: Level;
    constructor(public name: string, initialLevel: number = 1, public isHidden: boolean = false, public isUnlocked: boolean = false){
        super();
        this.level = new Level(initialLevel, initialLevel === 0 ? 0 : 1, WeaponAspect.maxLevel);
    }

    static maxLevel = 5;
}

export class Weapon extends Item {
    aspects: WeaponAspect[] = [];

    constructor(public name: string, public title: string, public isUnlocked: boolean = false){
        super();
    }

    get unlockedAspects() {
        return this.aspects.filter(aspect => aspect.isUnlocked);
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
}

export class Weapons extends ItemList<Weapon> {
    unlockAll() {
        super.unlockAll();
        this.items.forEach(weapon => weapon.unlockAllAspects());
    }

    maxLevelAll() {
        this.items.forEach(weapon => weapon.maxLevelAllAspects());
    }
}

export interface WeaponOptions extends Options {
    randomAspect?: boolean;
}