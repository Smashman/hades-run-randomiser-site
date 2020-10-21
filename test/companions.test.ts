import { Companion, Companions } from '../src/companions';
import * as utils from '../src/utils';

describe('Companion class', () => {
    it('should create expected Companion class', () => {
        const companion = new Companion('Fluff', 'Jeff');

        expect(companion).toMatchObject({
            name: 'Fluff',
            giver: 'Jeff',
            isUnlocked: false,
            level: 1,
            isMaxLevel: false,
            isMaxCodex: false,
        });
    });

    it('should return false for isMaxLevel when level is less than 5', () => {
        const companion = new Companion('Fluff', 'Jeff');
        companion.level = 4;

        expect(companion.isMaxLevel).toBe(false);
    });

    it('should return true for isMaxLevel when level is 5', () => {
        const companion = new Companion('Fluff', 'Jeff');
        companion.level = 5;

        expect(companion.isMaxLevel).toBe(true);
    });
});

describe('Companions class', () => {
    it('should return false for isAllMaxLevel if not every companion is max level', () => {
        const companion1 = new Companion('Fluff', 'Jeff');
        const companion2 = new Companion('Rex', 'Delilah');
        const companions = new Companions().addItems([companion1, companion2]);

        companion1.level = 5;

        expect(companions.isAllMaxLevel).toBe(false);
    });

    it('should return true for isAllMaxLevel if every companion is max level', () => {
        const companion1 = new Companion('Fluff', 'Jeff');
        const companion2 = new Companion('Rex', 'Delilah');
        const companions = new Companions().addItems([companion1, companion2]);

        companion1.level = 5;
        companion2.level = 5;

        expect(companions.isAllMaxLevel).toBe(true);
    });

    it('should max level all companions when maxLevelAll is called', () => {
        const companion1 = new Companion('Fluff', 'Jeff');
        const companion2 = new Companion('Rex', 'Delilah');
        const companions = new Companions().addItems([companion1, companion2]);

        companions.maxLevelAll();

        expect(companion1.level).toBe(5);
        expect(companion2.level).toBe(5);

        expect(companions.isAllMaxLevel).toBe(true);
    });

    it('should return false for isAllMaxCodex if not every companion is max codex', () => {
        const companion1 = new Companion('Fluff', 'Jeff');
        const companion2 = new Companion('Rex', 'Delilah');
        const companions = new Companions().addItems([companion1, companion2]);

        companion1.isMaxCodex = true;

        expect(companions.isAllMaxCodex).toBe(false);
    });

    it('should return true for isAllMaxCodex if every companion is max codex', () => {
        const companion1 = new Companion('Fluff', 'Jeff');
        const companion2 = new Companion('Rex', 'Delilah');
        const companions = new Companions().addItems([companion1, companion2]);

        companion1.isMaxCodex = true;
        companion2.isMaxCodex = true;

        expect(companions.isAllMaxCodex).toBe(true);
    });

    it('should max codex all companions when maxCodexAll is called', () => {
        const companion1 = new Companion('Fluff', 'Jeff');
        const companion2 = new Companion('Rex', 'Delilah');
        const companions = new Companions().addItems([companion1, companion2]);

        companions.maxCodexAll();

        expect(companion1.isMaxCodex).toBe(true);
        expect(companion2.isMaxCodex).toBe(true);

        expect(companions.isAllMaxCodex).toBe(true);
    });
    
    describe('getRandomCompanion', () => {
        let getRandomItemFromArraySpy: jest.SpyInstance;

        let companions: Companions;

        let companion1: Companion;
        let companion2: Companion;
        let companion3: Companion;
        let companion4: Companion;

        beforeEach(() => {
            companion1 = new Companion('Fluff', 'Jeff'),
            companion2 = new Companion('Rex', 'Delilah'),
            companion3 = new Companion('Trunky', 'Bob'),
            companion4 = new Companion('Mr. Bilbadopulous', 'Trevor');
            companions = new Companions().addItems([companion1, companion2, companion3, companion4]);

            getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(array => {
                return array[Math.ceil((array.length-1)/2)];
            });
        });

        afterEach(() => {
            jest.spyOn(utils, 'getRandomItemFromArray').mockRestore();
        });

        it('should return null if no companions are unlocked', () => {
            const randomCompanion = companions.getRandomCompanion();

            expect(getRandomItemFromArraySpy).toBeCalled();
            expect(randomCompanion).toBe(null);
        });

        it('should return expected companion if all companions are unlocked', () => {
            companions.unlockAll();

            const randomCompanion = companions.getRandomCompanion();

            expect(getRandomItemFromArraySpy).toBeCalledWith([companion1, companion2, companion3, companion4]);
            expect(randomCompanion).toBe(companion3);
        });

        it('should return expected companion when a subset of companions are unlocked', () => {
            companion2.unlock();
            companion4.unlock();

            const randomCompanion = companions.getRandomCompanion();

            expect(getRandomItemFromArraySpy).toBeCalledWith([companion2, companion4]);
            expect(randomCompanion).toBe(companion4);
        });

        it('should return expected companion with ignoreMaxCodex option but none are maxCodex', () => {
            companions.unlockAll();

            const randomCompanion = companions.getRandomCompanion({ignoreMaxCodex: true});

            expect(getRandomItemFromArraySpy).toBeCalledWith([companion1, companion2, companion3, companion4]);
            expect(randomCompanion).toBe(companion3);
        });

        it('should return expected companion with ignoreMaxCodex option and one is maxCodex', () => {
            companions.unlockAll();

            companion3.isMaxCodex = true;

            const randomCompanion = companions.getRandomCompanion({ignoreMaxCodex: true});

            expect(getRandomItemFromArraySpy).toBeCalledWith([companion1, companion2, companion4]);
            expect(randomCompanion).toBe(companion2);
        });
    });
});