import { getRandomItemFromArray, Options } from "./utils";

export class PactCondition {
    enforceLimit: boolean = false;
    private _initialRank: number = 0;
    constructor(public name: string, public readonly rankCosts: number[], public rankLimit?: number) {
        this.enforceLimit = !!rankLimit;
    }

    get initialRank(): number {
        return this._initialRank;
    }

    set initialRank(rank: number) {
        this._initialRank = rank > this.rankCount ? this.rankCount : rank;
    }

    get rankCount(): number {
        return this.rankLimit && this.enforceLimit ? this.rankLimit : this.rankCosts.length;
    }

    get totalHeat(): number {
        return (this.rankLimit && this.enforceLimit ? this.rankCosts.slice(0, this.rankLimit) : this.rankCosts).reduce((totalHeat, cost) => totalHeat + cost);
    }

    get initialHeat(): number {
        return this.rankCosts.slice(0, this.initialRank).reduce((total, value) => total + value, 0);
    }
}

export class Pact {
    conditions: PactCondition[] = [];

    addCondition(pactCondition: PactCondition) {
        this.conditions = [...this.conditions, pactCondition];
        return this;
    }

    getRange(heatRange: HeatRange) {
        heatRange = {
            min: heatRange?.min || this.initialHeat,
            max: heatRange?.max || this.maxHeat,
        };

        return new PactConfiguration(this, heatRange);
    }

    unlockAll() {
        this.conditions.forEach(condition => condition.enforceLimit = false);
    }

    get maxHeat(): number {
        return this.conditions.reduce((maxTotal, condition) => maxTotal + condition.totalHeat, 0);
    }

    get initialHeat(): number {
        return this.conditions.reduce((total, condition) => total + condition.initialHeat, 0);
    }
}

class PactConditionConfiguration {
    rank: number = 0;

    constructor(public condition: PactCondition) {
        this.rank = condition.initialRank;
    }

    get heat(): number {
        return this.condition.rankCosts.slice(0, this.rank).reduce((total, value) => total + value, 0);
    }

    rankUp() {
        this.rank++;
        return this.condition.rankCosts[this.rank-1];
    }
}

export class PactConfiguration {
    conditionConfigurations: PactConditionConfiguration[];
    heatTotal: number;
    heatTarget: number;

    constructor(pact: Pact, public heatRange: HeatRange) {
        this.conditionConfigurations = pact.conditions.map(condition => new PactConditionConfiguration(condition));

        const target = Math.floor(Math.random() * (heatRange.max - heatRange.min + 1) + heatRange.min);

        let current = pact.initialHeat;

        let remainingConditions = [...this.conditionConfigurations.filter((conditionConfig) => conditionConfig.rank !== conditionConfig.condition.rankCount)];

        while (current < target) {
            const randomCondition = getRandomItemFromArray(remainingConditions);
            current += randomCondition.rankUp();

            if (randomCondition.rank === randomCondition.condition.rankCount) {
                remainingConditions = [...remainingConditions.filter(condition => randomCondition !== condition)];
            }
        }

        this.heatTotal = current;
        this.heatTarget = target;
    }
}

interface HeatRange {
    min?: number;
    max?: number;
}

export interface PactOptions extends Options {
    heatRange?: HeatRange
}