import { MirrorTalent, MirrorTalentSet, MirrorGroup, Mirror, MirrorConfiguration } from '../src/mirror';
import * as utils from '../src/utils';
import { getRandomItemFromArrayMock } from './helpers';

describe('MirrorTalent class', () => {
    it('should create expected MirrorTalent class instance', () => {
        const mirrorTalent = new MirrorTalent('Run Fast', [1, 2, 3]);

        expect(mirrorTalent).toMatchSnapshot();
        expect(mirrorTalent.colour).toBe(undefined);
    });
});

describe('MirrorTalentSet class', () => {
    it('should create expected MirrorTalentSet class instance', () => {
        const mirrorTalentSet = new MirrorTalentSet([new MirrorTalent('Run Fast', [1, 2, 3]), new MirrorTalent('Jump High', [3, 3, 3])]);

        expect(mirrorTalentSet).toMatchSnapshot();
    });

    it('should set first talent as red and second talent as green', () => {
        const mirrorTalent1 = new MirrorTalent('Run Fast', [1, 2, 3]);
        const mirrorTalent2 = new MirrorTalent('Jump High', [3, 3, 3]);
        new MirrorTalentSet([mirrorTalent1, mirrorTalent2]);

        expect(mirrorTalent1.colour).toBe('red');
        expect(mirrorTalent2.colour).toBe('green');
    });

    it('should return expected talent when calling getRandom', () => {
        const getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(getRandomItemFromArrayMock);


        const mirrorTalent1 = new MirrorTalent('Run Fast', [1, 2, 3]);
        const mirrorTalent2 = new MirrorTalent('Jump High', [3, 3, 3]);
        const mirrorTalentSet = new MirrorTalentSet([mirrorTalent1, mirrorTalent2]);

        const randomMirrorTalent = mirrorTalentSet.getRandom();

        expect(getRandomItemFromArraySpy).toBeCalledWith([mirrorTalent1, mirrorTalent2]);
        expect(randomMirrorTalent).toBe(mirrorTalent2);

        getRandomItemFromArraySpy.mockRestore();
    });
});

describe('MirrorGroup class', () => {
    let mirrorTalent1: MirrorTalent;
    let mirrorTalent2: MirrorTalent;
    let mirrorTalent3: MirrorTalent;
    let mirrorTalent4: MirrorTalent;

    let mirrorTalentSet1: MirrorTalentSet;
    let mirrorTalentSet2: MirrorTalentSet;

    beforeEach(() => {
        mirrorTalent1 = new MirrorTalent('Run Fast', [1, 2, 3]);
        mirrorTalent2 = new MirrorTalent('Jump High', [3, 3, 3]);
        mirrorTalent3 = new MirrorTalent('Talk Good', [5, 5, 5, 5]);
        mirrorTalent4 = new MirrorTalent('Smile Nice', [20]);

        mirrorTalentSet1 = new MirrorTalentSet([mirrorTalent1, mirrorTalent2]);
        mirrorTalentSet2 = new MirrorTalentSet([mirrorTalent3, mirrorTalent4]);
    });

    it('should create expected MirrorGroup class instance', () => {
        const mirrorTalentGroup = new MirrorGroup([mirrorTalentSet1, mirrorTalentSet2]);

        expect(mirrorTalentGroup).toMatchSnapshot();
        expect(mirrorTalentGroup.isUnlocked).toBe(false);
    });

    it('should create expected MirrorGroup class instance with isUnlocked set to true', () => {
        const mirrorTalentGroup = new MirrorGroup([mirrorTalentSet1, mirrorTalentSet2], true);

        expect(mirrorTalentGroup.isUnlocked).toBe(true);
    });

    it('should return expected talents when calling getRandom', () => {
        const getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(getRandomItemFromArrayMock);

        const mirrorTalentGroup = new MirrorGroup([mirrorTalentSet1, mirrorTalentSet2]);

        const randomMirrorTalents = mirrorTalentGroup.getRandom();

        expect(getRandomItemFromArraySpy).toBeCalledTimes(2);
        expect(randomMirrorTalents).toStrictEqual([mirrorTalent2, mirrorTalent4]);

        getRandomItemFromArraySpy.mockRestore();
    });
});

describe('MirrorConfiguration class', () => {
    it('should create expected MirrorConfiguration class instance', () => {
        const mirrorConfiguration = new MirrorConfiguration([new MirrorTalent('Run Fast', [1, 2, 3]), new MirrorTalent('Talk Good', [5, 5, 5, 5])]);

        expect(mirrorConfiguration).toMatchSnapshot();
        expect(mirrorConfiguration.totalDarkness).toBe(26);
    });
});

describe('Mirror class', () => {
    let mirrorTalent1: MirrorTalent;
    let mirrorTalent2: MirrorTalent;
    let mirrorTalent3: MirrorTalent;
    let mirrorTalent4: MirrorTalent;
    let mirrorTalent5: MirrorTalent;
    let mirrorTalent6: MirrorTalent;
    let mirrorTalent7: MirrorTalent;
    let mirrorTalent8: MirrorTalent;

    beforeEach(() => {
        mirrorTalent1 = new MirrorTalent('Run Fast', [1, 2, 3]);
        mirrorTalent2 = new MirrorTalent('Jump High', [3, 3, 3]);
        mirrorTalent3 = new MirrorTalent('Talk Good', [5, 5, 5, 5]);
        mirrorTalent4 = new MirrorTalent('Smile Nice', [20]);
        mirrorTalent5 = new MirrorTalent('Live Long', [100, 100, 100, 100]);
        mirrorTalent6 = new MirrorTalent('Dodge Quick', [15, 15]);
        mirrorTalent7 = new MirrorTalent('Eat Well', [250, 250]);
        mirrorTalent8 = new MirrorTalent('Smell Pleasant', [4000]);
    });

    it('should create expected Mirror class instance', () => {
        const mirror = new Mirror();

        expect(mirror).toMatchSnapshot();
        expect(mirror.unlockedGroups).toStrictEqual([]);
    });

    it('should add group with addGroup', () => {
        const mirror = new Mirror().addGroup([
            [mirrorTalent1, mirrorTalent2],
            [mirrorTalent3, mirrorTalent4],
        ]);

        expect(mirror).toMatchSnapshot();
        expect(mirror.groups[0].isUnlocked).toBe(false);
        expect(mirror.unlockedGroups).toHaveLength(0);
    });

    it('should add unlocked group with addGroup with isUnlocked true', () => {
        const mirror = new Mirror().addGroup([
            [mirrorTalent1, mirrorTalent2],
            [mirrorTalent3, mirrorTalent4],
        ], true);

        expect(mirror.groups[0].isUnlocked).toBe(true);
        expect(mirror.unlockedGroups).toHaveLength(1);
    });

    it('should unlock all groups with unlockAll', () => {
        const mirror = new Mirror().addGroup([
            [mirrorTalent1, mirrorTalent2],
            [mirrorTalent3, mirrorTalent4],
        ]).addGroup([
            [mirrorTalent5, mirrorTalent6],
            [mirrorTalent7, mirrorTalent8],
        ]);

        expect(mirror.groups[0].isUnlocked).toBe(false);
        expect(mirror.groups[1].isUnlocked).toBe(false);
        expect(mirror.unlockedGroups).toHaveLength(0);

        mirror.unlockAll();

        expect(mirror.groups[0].isUnlocked).toBe(true);
        expect(mirror.groups[1].isUnlocked).toBe(true);
        expect(mirror.unlockedGroups).toHaveLength(2);
    });

    it('should return expected MirrorConfiguration from getRandom with no unlocked groups', () => {
        const getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(getRandomItemFromArrayMock);

        const mirror = new Mirror().addGroup([
            [mirrorTalent1, mirrorTalent2],
            [mirrorTalent3, mirrorTalent4],
        ]).addGroup([
            [mirrorTalent5, mirrorTalent6],
            [mirrorTalent7, mirrorTalent8],
        ]);

        const randomMirrorConfiguration = mirror.getRandom();

        expect(getRandomItemFromArraySpy).toBeCalledTimes(0);
        expect(randomMirrorConfiguration).toStrictEqual(new MirrorConfiguration([]));

        getRandomItemFromArraySpy.mockRestore();
    });

    it('should return expected MirrorConfiguration from getRandom with unlocked groups', () => {
        const getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(getRandomItemFromArrayMock);

        const mirror = new Mirror().addGroup([
            [mirrorTalent1, mirrorTalent2],
            [mirrorTalent3, mirrorTalent4],
        ]).addGroup([
            [mirrorTalent5, mirrorTalent6],
            [mirrorTalent7, mirrorTalent8],
        ]);

        mirror.unlockAll();

        const randomMirrorConfiguration = mirror.getRandom();

        expect(getRandomItemFromArraySpy).toBeCalledTimes(4);
        expect(randomMirrorConfiguration).toMatchSnapshot();
        expect(randomMirrorConfiguration.talents).toStrictEqual([mirrorTalent2, mirrorTalent4, mirrorTalent6, mirrorTalent8]);

        getRandomItemFromArraySpy.mockRestore();
    });
});