import { getRandomItemFromArray, Item, Options, StorableItemData } from './utils';

export interface MirrorOptions extends Options {
};

export const defaultMirrorOptions: MirrorOptions = {
    enabled: true,
};

export class Mirror {
    groups: MirrorGroup[] = [];

    addGroup(sets: [[MirrorTalent, MirrorTalent], [MirrorTalent, MirrorTalent]], isUnlocked: boolean = false) {
        const mirrorTalentSets = <[MirrorTalentSet, MirrorTalentSet]>sets.map(set => new MirrorTalentSet(set));
        this.groups = [...this.groups, new MirrorGroup(mirrorTalentSets, isUnlocked)];
        return this;
    }

    get unlockedGroups() {
        return this.groups.filter(group => group.isUnlocked);
    }

    unlockAll() {
        this.groups.forEach(group => group.unlock());
    }

    getRandom(): MirrorConfiguration {
        return new MirrorConfiguration(this.unlockedGroups.map(group => group.getRandom()).reduce((acc, val) => [...acc, ...val], <MirrorTalent[]>[]));
    }

    toStorableData() {
        return {
            groups: this.groups.map(group => group.toStorableData())
        }
    }
}

export class MirrorGroup extends Item{
    constructor(public sets: [MirrorTalentSet, MirrorTalentSet], public isUnlocked: boolean = false) {
        super();
    }

    getRandom() {
        return <[MirrorTalent, MirrorTalent]>this.sets.map(set => set.getRandom());
    }
}

export class MirrorTalentSet {
    constructor(public talents: [MirrorTalent, MirrorTalent]) {
        talents[0].colour = "red";
        talents[1].colour = "green";
    }

    getRandom(): MirrorTalent {
        return getRandomItemFromArray(this.talents);
    }
}

export class MirrorTalent {
    rankCount: number;
    colour: "red" | "green";
    totalCost: number;

    constructor(public name: string, public rankCosts: number[]) {
        this.rankCount = rankCosts.length;
        this.totalCost = rankCosts.reduce((totalCost, cost) => totalCost + cost);
    }
}

export class MirrorConfiguration {
    totalDarkness: number;
    constructor(public talents: MirrorTalent[]){
        this.totalDarkness = talents.reduce((totalCost, talent) => totalCost + talent.totalCost, 0);
    };
}