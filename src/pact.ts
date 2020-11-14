import { getRandomItemFromArray, Options } from './utils';

export interface HeatRange {
    min?: number;
    max?: number;
}

export interface PactOptions extends Options {
    heatRange?: HeatRange
}

export class Pact {
    conditions: PactCondition[] = [];

    addCondition(pactCondition: PactCondition) {
        this.conditions = [...this.conditions, pactCondition];
        return this;
    }

    getRandomWithRange(heatRange?: HeatRange) {
        return PactConfiguration.generateFromHeatRange(this, heatRange);
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

export class PactConfiguration {
    conditionConfigurations: PactConditionConfiguration[];
    heatTotal: number = 0;
    heatTarget: number = 0;
    heatRange: HeatRange;

    constructor(pact: Pact, heatRange?: HeatRange, ranks?: number[]) {
        this.conditionConfigurations = pact.conditions.map((condition, index) => new PactConditionConfiguration(condition, (ranks && ranks[index]) || null));
        this.heatRange = {
            min: heatRange?.min || pact.initialHeat,
            max: heatRange?.max || pact.maxHeat,
        };
    }

    static generateFromHeatRange(pact: Pact, heatRange?: HeatRange) {
        const pactConfiguration = new PactConfiguration(pact, heatRange);

        const configHeatRange = pactConfiguration.heatRange;


        const target = Math.floor(Math.random() * (configHeatRange.max - configHeatRange.min + 1) + configHeatRange.min);

        let current = pact.initialHeat;

        let remainingConditions = [...pactConfiguration.conditionConfigurations.filter((conditionConfig) => conditionConfig.rank !== conditionConfig.condition.rankCount)];


        while (current < target) {
            const randomCondition = getRandomItemFromArray(remainingConditions);
            current += randomCondition.rankUp();

            if (randomCondition.rank === randomCondition.condition.rankCount) {
                remainingConditions = [...remainingConditions.filter(condition => randomCondition !== condition)];
            }
        }

        pactConfiguration.heatTotal = current;
        pactConfiguration.heatTarget = target;

        return pactConfiguration;
    }
}

export class PactConditionConfiguration {
    private _rank: number = 0;

    constructor(public condition: PactCondition, rank?: number) {
        this.rank = rank || condition.initialRank;
    }

    get heat(): number {
        return this.condition.rankCosts.slice(0, this.rank).reduce((total, value) => total + value, 0);
    }

    get rank(): number {
        return this._rank;
    }

    set rank(rank: number) {
        this._rank = rank > this.condition.rankCount ? this.condition.rankCount : rank;
    }

    rankUp(): number {
        if (this.rank < this.condition.rankCount) {
            this.rank++;
            return this.condition.rankCosts[this.rank-1];
        }
        else {
            return null;
        }
    }
}