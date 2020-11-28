import { Keepsake, Keepsakes } from '../src/keepsakes';
import type { KeepsakeConfiguration } from '../src/keepsakes';
import * as utils from '../src/utils';
import { getRandomItemFromArrayMock, fakeIcon } from './helpers';

describe('Keepsake class', () => {
    it('should create expected Keepsake class instance', () => {
        const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);

        expect(keepsake).toMatchSnapshot();
    });

    it('should return false for isMaxLevel when level is less than 3', () => {
        const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);
        keepsake.level.value = 2;

        expect(keepsake.isMaxLevel).toBe(false);
    });

    it('should return true for isMaxLevel when level is 3', () => {
        const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);
        keepsake.level.value = 3;

        expect(keepsake.isMaxLevel).toBe(true);
    });

    it('should set isHidden to true when passed into the constructor', () => {
        const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon, true);

        expect(keepsake.isHidden).toBe(true);
    });

    describe('toStorableData', () => {
        it('should return expected storable data', () => {
            const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);
    
            expect(keepsake.toStorableData()).toMatchSnapshot();
        });

        it('should return expected storable data with level', () => {
            const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);
            keepsake.level.value = 3;
    
            expect(keepsake.toStorableData()).toMatchSnapshot();
        });
    });

    describe('fromStoredData', () => {
        it('should retun expected Keepsake instance after loading from data', () => {
            const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);
            keepsake.fromStoredData({
                isUnlocked: true,
                level: 2,
            });

            expect(keepsake).toMatchSnapshot();
        });
    });
});

describe('Keepsakes class', () => {
    it('should return false for isAllMaxLevel if not every keepsake is max level', () => {
        const keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
        const keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
        const keepsakes = new Keepsakes().addItems([keepsake1, keepsake2]);

        keepsake1.level.value = 3;

        expect(keepsakes.isAllMaxLevel).toBe(false);
    });

    it('should return true for isAllMaxLevel if every keepsake is max level', () => {
        const keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
        const keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
        const keepsakes = new Keepsakes().addItems([keepsake1, keepsake2]);

        keepsake1.level.value = 3;
        keepsake2.level.value = 3;

        expect(keepsakes.isAllMaxLevel).toBe(true);
    });

    it('should max level all keepsakes when maxLevelAll is called', () => {
        const keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
        const keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
        const keepsakes = new Keepsakes().addItems([keepsake1, keepsake2]);

        keepsakes.maxLevelAll();

        expect(keepsake1.level.value).toBe(3);
        expect(keepsake2.level.value).toBe(3);

        expect(keepsakes.isAllMaxLevel).toBe(true);
    });

    describe('getRandomKeepsakes', () => {
        let getRandomItemFromArraySpy: jest.SpyInstance;

        let keepsakes: Keepsakes;

        let keepsake1: Keepsake;
        let keepsake2: Keepsake;
        let keepsake3: Keepsake;
        let keepsake4: Keepsake;

        beforeEach(() => {
            keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
            keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
            keepsake3 = new Keepsake('Skirt', 'Bob', fakeIcon);
            keepsake4 = new Keepsake('Scarf', 'Trevor', fakeIcon);
            keepsakes = new Keepsakes().addItems([keepsake1, keepsake2, keepsake3, keepsake4]);

            getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(getRandomItemFromArrayMock);
        });

        afterEach(() => {
            jest.spyOn(utils, 'getRandomItemFromArray').mockRestore();
        });

        it('should return null if no keepsakes are unlocked', () => {
            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes();

            expect(randomKeepsakeConfiguration).toBe(null);
            expect(getRandomItemFromArraySpy).not.toBeCalled();
        });

        it('should return KeepsakeConfiguration with one value when called with no options when all keepsakes are unlocked', () => {
            keepsakes.unlockAll();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes();

            const expectedChoices: Keepsake[] = [keepsake1, keepsake2, keepsake3, keepsake4];
            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake3];

            expect(getRandomItemFromArraySpy).toBeCalledWith(expectedChoices);
            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should return KeepsakeConfiguration with one value when called with no options when a subset of keepsakes are unlocked', () => {
            keepsake2.unlock();
            keepsake4.unlock();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes();

            const expectedChoices: Keepsake[] = [keepsake2, keepsake4];
            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake4];

            expect(getRandomItemFromArraySpy).toBeCalledWith(expectedChoices);
            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should return KeepsakeConfiguration with one value when called with changeBetweenBiomes option set to false when all keepsakes are unlocked', () => {
            keepsakes.unlockAll();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes({changeBetweenBiomes: false});

            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake3];

            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should return KeepsakeConfiguration with four values when called with changeBetweenBiomes option set to true when all keepsakes are unlocked', () => {
            keepsakes.unlockAll();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes({changeBetweenBiomes: true});

            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake3, keepsake2, keepsake4, keepsake1];

            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should return a keepsake configuration with 3 null values when called with changeBetweenBiomes option set to true if there\'s only one keepsake to choose from', () => {
            keepsakes = new Keepsakes().addItem(keepsake1);
            keepsakes.unlockAll();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes({changeBetweenBiomes: true});

            const expectedChoices: Keepsake[] = [keepsake1];
            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake1, null, null, null];

            expect(getRandomItemFromArraySpy).toBeCalledWith(expectedChoices);
            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should not filter out any keepsakes when called with ignoreMaxLevel true, but no keepsakes are at max level', () => {
            keepsakes.unlockAll();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes({ignoreMaxLevel: true});

            const expectedChoices: Keepsake[] = [keepsake1, keepsake2, keepsake3, keepsake4];
            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake3];

            expect(getRandomItemFromArraySpy).toBeCalledWith(expectedChoices);
            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should filter out keepsakes when called with ignoreMaxLevel true and keepsakes are at max level', () => {
            keepsakes.unlockAll();

            keepsake1.level.value = Keepsake.maxLevel;
            keepsake3.level.value = Keepsake.maxLevel;

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes({ignoreMaxLevel: true});

            const expectedChoices: Keepsake[] = [keepsake2, keepsake4];
            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake4];

            expect(getRandomItemFromArraySpy).toBeCalledWith(expectedChoices);
            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });

        it('should get random item from full array when called with ignoreMaxLevel true, but all keepsakes are at max level', () => {
            keepsakes.unlockAll();
            keepsakes.maxLevelAll();

            const randomKeepsakeConfiguration = keepsakes.getRandomKeepsakes({ignoreMaxLevel: true});

            const expectedChoices: Keepsake[] = [keepsake1, keepsake2, keepsake3, keepsake4];
            const expectedKeepsakeConfiguration: KeepsakeConfiguration = [keepsake3];

            expect(getRandomItemFromArraySpy).toBeCalledWith(expectedChoices);
            expect(randomKeepsakeConfiguration).toStrictEqual(expectedKeepsakeConfiguration);
        });
    });

    describe('toStorableData', () => {
        it('should return expected storable data', () => {
            const keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
            const keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
            const keepsakes = new Keepsakes().addItems([keepsake1, keepsake2]);
    
            expect(keepsakes.toStorableData()).toMatchSnapshot();
        });

        it('should return expected storable data with level', () => {
            const keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
            const keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
            const keepsakes = new Keepsakes().addItems([keepsake1, keepsake2]);

            keepsake1.level.value = 3;
    
            expect(keepsakes.toStorableData()).toMatchSnapshot();
        });
    });

    describe('fromStoredData', () => {
        it('should retun expected Keepsake instance after loading from data', () => {
            const keepsake1 = new Keepsake('Shoe', 'Jeff', fakeIcon);
            const keepsake2 = new Keepsake('Coat', 'Delilah', fakeIcon);
            const keepsakes = new Keepsakes().addItems([keepsake1, keepsake2]);
            keepsakes.fromStoredData({
                items: [{
                    isUnlocked: true,
                    level: 2,
                },
                {
                    isUnlocked: false,
                    level: 3,
                }]
            });

            expect(keepsakes).toMatchSnapshot();
        });
    });
});