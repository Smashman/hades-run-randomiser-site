import { Item, ItemList, Options } from "./utils";
import { getRandomItemFromArray } from "./utils";

export class WeaponAspect extends Item {
    constructor(public name: string, public level: number = 1, public isHidden: boolean = false, public isUnlocked: boolean = false){
        super();
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
        this.aspects.forEach(aspect => aspect.level = WeaponAspect.maxLevel);
    }

    getRandomAspect(): WeaponAspect {
        return getRandomItemFromArray(this.unlockedAspects);
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