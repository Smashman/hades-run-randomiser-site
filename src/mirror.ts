import { getRandomItemFromArray, Item, Options } from "./utils";

export class MirrorTalent {
    rankCount: number;
    colour: "red" | "green";
    totalCost: number;

    constructor(public name: string, public rankCosts: number[]) {
        this.rankCount = rankCosts.length;
        this.totalCost = rankCosts.reduce((totalCost, cost) => totalCost + cost);
    }
}

class MirrorTalentSet {
    constructor(public talents: [MirrorTalent, MirrorTalent]) {}

    getRandom(): MirrorTalent {
        return getRandomItemFromArray(this.talents);
    }
}

class MirrorGroup extends Item{
    constructor(public sets: [MirrorTalentSet, MirrorTalentSet], public isUnlocked: boolean = false) {
        super();
    }

    getRandom() {
        return <[MirrorTalent, MirrorTalent]>this.sets.map(set => set.getRandom());
    }
}

export class Mirror {
    groups: MirrorGroup[] = [];

    addGroup(sets: [[MirrorTalent, MirrorTalent], [MirrorTalent, MirrorTalent]], isUnlocked: boolean = false) {
        const mirrorTalentSets = <[MirrorTalentSet, MirrorTalentSet]>sets.map(set => {
            set[0].colour = "red";
            set[1].colour = "green";
            return new MirrorTalentSet(set);
        })
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
        return new MirrorConfiguration(this.unlockedGroups.map(group => group.getRandom()).reduce((acc, val) => acc.concat(val), []));
    }
}

export class MirrorConfiguration {
    totalDarkness: number;
    constructor(public talents: MirrorTalent[]){
        this.totalDarkness = talents.reduce((totalCost, talent) => totalCost + talent.totalCost, 0);
    };
}

export interface MirrorOptions extends Options {

};