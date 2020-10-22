import { Pact, PactCondition, PactConditionConfiguration, PactConfiguration, HeatRange } from '../src/pact';
import * as utils from '../src/utils';

describe('PactCondition class', () => {
    it('should create expected PactCondition class instance', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);

        expect(pactCondition).toMatchSnapshot();
        expect(pactCondition.initialRank).toBe(0);
        expect(pactCondition.rankCount).toBe(5);
        expect(pactCondition.totalHeat).toBe(8);
        expect(pactCondition.initialHeat).toBe(0);
    });

    it('should create expected PactCondition class instance with rankLimit', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3], 4);

        expect(pactCondition).toMatchSnapshot();
        expect(pactCondition.initialRank).toBe(0);
        expect(pactCondition.rankCount).toBe(4);
        expect(pactCondition.totalHeat).toBe(5);
        expect(pactCondition.initialHeat).toBe(0);
    });

    it('should return expected initialHeat when initialRank is defined', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        pactCondition.initialRank = 2;

        expect(pactCondition.initialRank).toBe(2);
        expect(pactCondition.initialHeat).toBe(2);
    });

    it('should set initialRank to highest possible rank if number is higher than number of ranks', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        pactCondition.initialRank = 50;

        expect(pactCondition.initialRank).toBe(5);
        expect(pactCondition.initialHeat).toBe(8);
    });
});

describe('PactConditionConfiguration class', () => {
    it('should create expected PactConditionConfiguration class instance', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition);

        expect(pactConditionConfiguration).toMatchSnapshot();
        expect(pactConditionConfiguration.rank).toBe(0);
        expect(pactConditionConfiguration.heat).toBe(0);
    });

    it('should create expected PactConditionConfiguration class instance with rank parameter', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition, 3);

        expect(pactConditionConfiguration).toMatchSnapshot();
        expect(pactConditionConfiguration.rank).toBe(3);
        expect(pactConditionConfiguration.heat).toBe(3);
    });

    it('should create expected PactConditionConfiguration class instance when pact condition has an initialRank', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        pactCondition.initialRank = 4;
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition);

        expect(pactConditionConfiguration).toMatchSnapshot();
        expect(pactConditionConfiguration.rank).toBe(4);
        expect(pactConditionConfiguration.heat).toBe(5);
    });

    it('should create expected PactConditionConfiguration class instance when pact condition has an initialRank and rank parameter is set', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        pactCondition.initialRank = 4;
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition, 2);

        expect(pactConditionConfiguration).toMatchSnapshot();
        expect(pactConditionConfiguration.rank).toBe(2);
        expect(pactConditionConfiguration.heat).toBe(2);
    });

    it('should set rank', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition);

        pactConditionConfiguration.rank = 2;

        expect(pactConditionConfiguration.rank).toBe(2);
        expect(pactConditionConfiguration.heat).toBe(2);
    });

    it('should set rank to maxiumum value when setting to number higher than maximum', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition);

        pactConditionConfiguration.rank = 12;

        expect(pactConditionConfiguration.rank).toBe(5);
    });

    it('should increase heat and rank when rankUp is called', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition);

        const rankUp1 = pactConditionConfiguration.rankUp();

        expect(rankUp1).toBe(1);
        expect(pactConditionConfiguration.rank).toBe(1);
        expect(pactConditionConfiguration.heat).toBe(1);

        const rankUp2 = pactConditionConfiguration.rankUp();

        expect(rankUp2).toBe(1);
        expect(pactConditionConfiguration.rank).toBe(2);
        expect(pactConditionConfiguration.heat).toBe(2);

        const rankUp3 = pactConditionConfiguration.rankUp();

        expect(rankUp3).toBe(1);
        expect(pactConditionConfiguration.rank).toBe(3);
        expect(pactConditionConfiguration.heat).toBe(3);

        const rankUp4 = pactConditionConfiguration.rankUp();

        expect(rankUp4).toBe(2);
        expect(pactConditionConfiguration.rank).toBe(4);
        expect(pactConditionConfiguration.heat).toBe(5);

        const rankUp5 = pactConditionConfiguration.rankUp();

        expect(rankUp5).toBe(3);
        expect(pactConditionConfiguration.rank).toBe(5);
        expect(pactConditionConfiguration.heat).toBe(8);
    });

    it('should return null and not increment rank at maxiumum rank', () => {
        const pactCondition = new PactCondition('Extra Angry', [1, 1, 1, 2, 3]);
        const pactConditionConfiguration = new PactConditionConfiguration(pactCondition);

        pactConditionConfiguration.rankUp();
        pactConditionConfiguration.rankUp();
        pactConditionConfiguration.rankUp();
        pactConditionConfiguration.rankUp();
        pactConditionConfiguration.rankUp();

        expect(pactConditionConfiguration.rank).toBe(5);
        expect(pactConditionConfiguration.heat).toBe(8);

        const rankUp6 = pactConditionConfiguration.rankUp();

        expect(rankUp6).toBe(null);
        expect(pactConditionConfiguration.rank).toBe(5);
        expect(pactConditionConfiguration.heat).toBe(8);
    });
});

describe('Pact class', () => {
    it('should create expected Pact class instance', () => {
        const pact = new Pact();

        expect(pact).toMatchSnapshot();
        expect(pact.maxHeat).toBe(0);
        expect(pact.initialHeat).toBe(0);
    });

    it('should add PactCondition to Pact', () => {
        const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3]));

        expect(pact).toMatchSnapshot();
        expect(pact.maxHeat).toBe(8);
        expect(pact.initialHeat).toBe(0);
    });

    it('should disable enforce limit on all conditions with unlockAll', () => {
        const pactCondition1 = new PactCondition('Extra Angry', [1, 1, 1, 2, 3], 4);
        const pactCondition2 = new PactCondition('Bigger Slam', [2, 2], 1);
        const pact = new Pact().addCondition(pactCondition1).addCondition(pactCondition2);

        expect(pactCondition1.enforceLimit).toBe(true);
        expect(pactCondition2.enforceLimit).toBe(true);
        expect(pact.maxHeat).toBe(7);

        pact.unlockAll();

        expect(pactCondition1.enforceLimit).toBe(false);
        expect(pactCondition2.enforceLimit).toBe(false);
        expect(pact.maxHeat).toBe(12);
    });

    it('should call PactConfiguration.generateFromHeatRange when calling getRandomWithRange', () => {
        const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3])).addCondition(new PactCondition('Bigger Slam', [2, 2]));
        const heatRange: HeatRange = {
            min: 1,
            max: 3,
        };

        const pactConfig = new PactConfiguration(pact, heatRange);
        const generateFromHeatRangeSpy = jest.spyOn(PactConfiguration, 'generateFromHeatRange').mockReturnValue(pactConfig);

        pact.getRandomWithRange(heatRange);

        expect(generateFromHeatRangeSpy).toBeCalledWith(pact, heatRange);

        generateFromHeatRangeSpy.mockRestore();
    });
});

describe('PactConfiguration class', () => {
    it('should create expected PactConfiguration class instance', () => {
        const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3])).addCondition(new PactCondition('Bigger Slam', [2, 2]));
        const pactConfig = new PactConfiguration(pact);

        expect(pactConfig).toMatchSnapshot();
    });

    it('should create expected PactConfiguration class instance with heatRange', () => {
        const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3])).addCondition(new PactCondition('Bigger Slam', [2, 2]));
        const heatRange: HeatRange = {
            min: 1,
            max: 3,
        };
        const pactConfig = new PactConfiguration(pact, heatRange);

        expect(pactConfig).toMatchSnapshot();
    });

    it('should create expected PactConfiguration class instance with ranks', () => {
        const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3])).addCondition(new PactCondition('Bigger Slam', [2, 2]));
        const ranks: number[] = [1, 1];
        const pactConfig = new PactConfiguration(pact, null, ranks);

        expect(pactConfig).toMatchSnapshot();
    });

    describe('generateFromHeatRange', () => {
        let randomMock: jest.SpyInstance;
        let index: number;
        let getRandomItemFromArrayMock: jest.SpyInstance;
        const randomIndexArray = [1, 0, 2, 0];

        beforeEach(() => {
            randomMock = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

            index = 0;
            getRandomItemFromArrayMock = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(array => {
                if (index >= randomIndexArray.length) {
                    index = 0;
                }
                return array[randomIndexArray[index++]];
            });
        });

        afterEach(() => {
            getRandomItemFromArrayMock.mockRestore();
            randomMock.mockRestore();
        });

        it('should return expected PactConfiguration class instance', () => {
            const pact = new Pact()
                .addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3]))
                .addCondition(new PactCondition('Bigger Slam', [2, 2]))
                .addCondition(new PactCondition('Harder Skin', [5]));
            const randomPactConfiguration = pact.getRandomWithRange();

            const expectedHeatRange: HeatRange = {
                min: 0,
                max: 17,
            };

            expect(randomPactConfiguration).toMatchSnapshot();
            expect(randomPactConfiguration.heatRange).toStrictEqual(expectedHeatRange);
            expect(randomPactConfiguration.heatTarget).toBe(9);
            expect(randomPactConfiguration.heatTotal).toBe(9);

            expect(randomMock).toHaveBeenCalledTimes(1);
            expect(getRandomItemFromArrayMock).toHaveBeenCalledTimes(4);
        });

        it('should return expected PactConfiguration class instance with heatRange', () => {
            const pact = new Pact()
                .addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3]))
                .addCondition(new PactCondition('Bigger Slam', [2, 2]))
                .addCondition(new PactCondition('Harder Skin', [5]));
            const heatRange: HeatRange = {
                min: 1,
                max: 3,
            };
            const randomPactConfiguration = pact.getRandomWithRange(heatRange);

            expect(randomPactConfiguration).toMatchSnapshot();
            expect(randomPactConfiguration.heatRange).toStrictEqual(heatRange);
            expect(randomPactConfiguration.heatTarget).toBe(2);
            expect(randomPactConfiguration.heatTotal).toBe(2);

            expect(randomMock).toHaveBeenCalledTimes(1);
            expect(getRandomItemFromArrayMock).toHaveBeenCalledTimes(1);
        });
    });
});