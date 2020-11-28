import { Weapon, WeaponAspect, Weapons } from '../src/weapons';
import * as utils from '../src/utils';
import { getRandomItemFromArrayMock, fakeIcon } from './helpers';

describe('WeaponAspect class', () => {
    it('should create expected WeaponAspect class instance', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);

        expect(weaponAspect).toMatchSnapshot();
    });

    it('should create expected WeaponAspect class instance with more parameters', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1], true, true);

        expect(weaponAspect).toMatchSnapshot();
    });

    it('should return false for isUnlocked after lock is called and canBeLocked is true', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);

        expect(weaponAspect.canBeLocked).toBe(true);

        weaponAspect.unlock();
        expect(weaponAspect.isUnlocked).toBe(true);

        weaponAspect.lock();
        expect(weaponAspect.isUnlocked).toBe(false);
    });

    it('should return false for isUnlocked after lock is called and canBeLocked is false', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1], false, true);

        expect(weaponAspect.canBeLocked).toBe(false);
        expect(weaponAspect.isUnlocked).toBe(true);

        weaponAspect.lock();
        expect(weaponAspect.isUnlocked).toBe(true);
    });

    it('should set isUnlocked to true when changing level above 0 when canBeLocked is true', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);

        expect(weaponAspect.canBeLocked).toBe(true);
        expect(weaponAspect.isUnlocked).toBe(false);

        weaponAspect.level.value = 1;

        expect(weaponAspect.isUnlocked).toBe(true);
    });

    it('should set isUnlocked to false when changing level to 0 when canBeLocked is true', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);

        expect(weaponAspect.canBeLocked).toBe(true);
        expect(weaponAspect.isUnlocked).toBe(false);

        weaponAspect.level.value = 1;

        expect(weaponAspect.isUnlocked).toBe(true);

        weaponAspect.level.value = 0;

        expect(weaponAspect.isUnlocked).toBe(false);
    });

    it('should not change isUnlocked when changing level above 0 when canBeLocked is false', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1], false, true);

        expect(weaponAspect.canBeLocked).toBe(false);
        expect(weaponAspect.isUnlocked).toBe(true);

        weaponAspect.level.value = 1;

        expect(weaponAspect.isUnlocked).toBe(true);
    });

    it('should not change isUnlocked when changing level to 0 when canBeLocked is false', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1], false, true);

        expect(weaponAspect.canBeLocked).toBe(false);
        expect(weaponAspect.isUnlocked).toBe(true);

        weaponAspect.level.value = 1;

        expect(weaponAspect.isUnlocked).toBe(true);

        weaponAspect.level.value = 0;

        expect(weaponAspect.isUnlocked).toBe(true);
    });

    it('should change resource values when level is updated', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);

        expect(weaponAspect.resource.total).toBe(5);
        expect(weaponAspect.resource.spent).toBe(0);
        expect(weaponAspect.resource.required).toBe(5);

        weaponAspect.level.value = 4;

        expect(weaponAspect.resource.total).toBe(5);
        expect(weaponAspect.resource.spent).toBe(4);
        expect(weaponAspect.resource.required).toBe(1);
    });

    describe('toStorableData', () => {
        it('should return expected storable data', () => {
            const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
    
            expect(weaponAspect.toStorableData()).toMatchSnapshot();
        });

        it('should return expected storable data with level', () => {
            const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            weaponAspect.level.value = 5;
    
            expect(weaponAspect.toStorableData()).toMatchSnapshot();
        });
    });

    describe('fromStoredData', () => {
        it('should retun expected Weapon instance after loading from data', () => {
            const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            weaponAspect.fromStoredData({
                isUnlocked: true,
                level: 2,
            });

            expect(weaponAspect).toMatchSnapshot();
        });
    });
});

// Skybreaker is a legendary weapon, a 'Mistblade', in my D&D campaign.
// Tarak is a player's character who now owns it.
// Shokrug is its previous owner.
// It fit too well not to use...

describe('Weapon class', () => {
    it('should create expected Weapon class instance', () => {
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword');

        expect(weapon).toMatchSnapshot();
    });

    it('should add aspect to Weapon', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspect(weaponAspect);

        expect(weapon.aspects).toHaveLength(1);
        expect(weapon.aspects).toContain(weaponAspect);
    });

    it('should add aspects to Weapon', () => {
        const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.aspects).toHaveLength(2);
        expect(weapon.aspects).toContain(weaponAspect1);
        expect(weapon.aspects).toContain(weaponAspect2);
    });

    it('should return no items for unlockedAspects if no aspects are unlocked', () => {
        const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.unlockedAspects).toHaveLength(0);
    });

    it('should return expected items for unlockedAspects when a subset of aspects is unlocked', () => {
        const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        weaponAspect1.unlock();

        const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);

        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.unlockedAspects).toHaveLength(1);
        expect(weapon.unlockedAspects).toContain(weaponAspect1);
        expect(weapon.unlockedAspects).not.toContain(weaponAspect2);
    });

    it('should return all items for unlockedAspects when all aspects are unlocked', () => {
        const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        weaponAspect1.unlock();

        const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
        weaponAspect2.unlock();

        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.unlockedAspects).toHaveLength(2);
        expect(weapon.unlockedAspects).toContain(weaponAspect1);
        expect(weapon.unlockedAspects).toContain(weaponAspect2);
    });

    it('should set all aspects to unlocked when calling unlockAllAspects', () => {
        const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

        weapon.unlockAllAspects();

        expect(weapon.unlockedAspects).toHaveLength(2);
        expect(weapon.unlockedAspects).toContain(weaponAspect1);
        expect(weapon.unlockedAspects).toContain(weaponAspect2);
    });

    it('should set all aspects to max level when calling maxLevelAllAspects', () => {
        const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

        weapon.maxLevelAllAspects();

        expect(weaponAspect1.level.value).toBe(5);
        expect(weaponAspect2.level.value).toBe(5);
    });

    it('should return false for isUnlocked after lock is called and canBeLocked is true', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspect(weaponAspect);

        expect(weapon.canBeLocked).toBe(true);

        weapon.unlock();
        expect(weapon.isUnlocked).toBe(true);

        weapon.lock();
        expect(weapon.isUnlocked).toBe(false);
    });

    it('should return false for isUnlocked after lock is called and canBeLocked is false', () => {
        const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
        const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword', true).addAspect(weaponAspect);

        expect(weapon.canBeLocked).toBe(false);
        expect(weapon.isUnlocked).toBe(true);

        weapon.lock();
        expect(weapon.isUnlocked).toBe(true);
    });

    describe('getRandomAspect', () => {
        let getRandomItemFromArraySpy: jest.SpyInstance;

        let weaponAspect1: WeaponAspect;
        let weaponAspect2: WeaponAspect;

        let weapon: Weapon;

        beforeEach(() => {
            weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
            weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);

            getRandomItemFromArraySpy = jest.spyOn(utils, 'getRandomItemFromArray').mockImplementation(getRandomItemFromArrayMock);
        });

        afterEach(() => {
            jest.spyOn(utils, 'getRandomItemFromArray').mockRestore();
        });

        it('should return null if no aspects are unlocked', () => {
            const randomAspect = weapon.getRandomAspect();

            expect(randomAspect).toBe(null);
        });

        it('should return expected aspect if all aspect are unlocked', () => {
            weapon.unlockAllAspects();

            const randomAspect = weapon.getRandomAspect();

            expect(getRandomItemFromArraySpy).toBeCalledWith([weaponAspect1, weaponAspect2]);
            expect(randomAspect).toBe(weaponAspect2);
        });

        it('should return expected companion when a subset of companions are unlocked', () => {
            weaponAspect1.unlock();

            const randomCompanion = weapon.getRandomAspect();

            expect(getRandomItemFromArraySpy).toBeCalledWith([weaponAspect1]);
            expect(randomCompanion).toBe(weaponAspect1);
        });
    });

    describe('Resources', () => {
        let weaponAspect1: WeaponAspect;
        let weaponAspect2: WeaponAspect;

        let weapon: Weapon;

        beforeEach(() => {
            weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
            weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);
        });

        it('should calculate resource values from all aspects', () => {
            expect(weapon.resourceTotal).toBe(20);
            expect(weapon.resourceSpent).toBe(0);
            expect(weapon.resourceRequired).toBe(20);
        });

        it('should calculate resource values from all aspects when aspects are leveled', () => {
            weaponAspect1.level.value = 2;
            weaponAspect2.level.value = 3;

            expect(weapon.resourceTotal).toBe(20);
            expect(weapon.resourceSpent).toBe(8);
            expect(weapon.resourceRequired).toBe(12);
        });
    });

    describe('toStorableData', () => {
        it('should return expected storable data', () => {
            const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);
    
            expect(weapon.toStorableData()).toMatchSnapshot();
        });

        it('should return expected storable data with aspects with level', () => {
            const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);
            weapon.unlock();
            weaponAspect1.level.value = 2;
            weaponAspect2.level.value = 4;
    
            expect(weapon.toStorableData()).toMatchSnapshot();
        });
    });

    describe('fromStoredData', () => {
        it('should retun expected Weapons instance after loading from data', () => {
            const weaponAspect1 = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            const weaponAspect2 = new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5]);
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([weaponAspect1, weaponAspect2]);
            weapon.fromStoredData({
                isUnlocked: true,
                aspects: [
                    {
                        isUnlocked: true,
                        level: 3,
                    },
                    {
                        isUnlocked: false,
                        level: 0,
                    }
                ]
            });

            expect(weapon).toMatchSnapshot();
        });
    });
});

describe('Weapons class', () => {
    it('should unlock all aspects as well as all weapons when calling unlockAll', () => {
        const weapon1 = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5])]);
        const weapon2 = new Weapon('Lightsaber', 'Weapon of the Jedi', 'laser sword').addAspects([new WeaponAspect('Rey', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Luke', fakeIcon, [1, 2, 3, 4, 5]), new WeaponAspect('Anakin', fakeIcon, [3, 3, 3, 3, 3])]);
        const weapons = new Weapons().addItems([weapon1, weapon2]);

        expect(weapons.unlocked).toHaveLength(0);
        expect(weapon1.unlockedAspects).toHaveLength(0);
        expect(weapon2.unlockedAspects).toHaveLength(0);
        expect(weapon1.isUnlocked).toBe(false);
        expect(weapon2.isUnlocked).toBe(false);

        weapons.unlockAll();

        expect(weapons.unlocked).toHaveLength(2);
        expect(weapon1.unlockedAspects).toHaveLength(2);
        expect(weapon2.unlockedAspects).toHaveLength(3);
        expect(weapon1.isUnlocked).toBe(true);
        expect(weapon2.isUnlocked).toBe(true);
    });

    it('should max level all aspects of all weapons when calling maxLevelAll', () => {
        const weapon1 = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5])]);
        const weapon2 = new Weapon('Lightsaber', 'Weapon of the Jedi', 'laser sword').addAspects([new WeaponAspect('Rey', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Luke', fakeIcon, [1, 2, 3, 4, 5]), new WeaponAspect('Anakin', fakeIcon, [3, 3, 3, 3, 3])]);
        const weapons = new Weapons().addItems([weapon1, weapon2]);

        expect(weapon1.aspects[0].level.value).toBe(0);
        expect(weapon1.aspects[1].level.value).toBe(0);
        expect(weapon2.aspects[0].level.value).toBe(0);
        expect(weapon2.aspects[1].level.value).toBe(0);
        expect(weapon2.aspects[2].level.value).toBe(0);

        weapons.maxLevelAll();

        expect(weapon1.aspects[0].level.value).toBe(5);
        expect(weapon1.aspects[1].level.value).toBe(5);
        expect(weapon2.aspects[0].level.value).toBe(5);
        expect(weapon2.aspects[1].level.value).toBe(5);
        expect(weapon2.aspects[2].level.value).toBe(5);
    });

    it('should calculate resource values from all weapons', () => {
        const weapon1 = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5])]);
        const weapon2 = new Weapon('Lightsaber', 'Weapon of the Jedi', 'laser sword').addAspects([new WeaponAspect('Rey', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Luke', fakeIcon, [1, 2, 3, 4, 5]), new WeaponAspect('Anakin', fakeIcon, [3, 3, 3, 3, 3])]);
        const weapons = new Weapons().addItems([weapon1, weapon2]);

        expect(weapons.resourceTotal).toBe(55);
        expect(weapons.resourceSpent).toBe(0);
        expect(weapons.resourceRequired).toBe(55);
    });

    it('should calculate resource values from all weapons when aspects are leveled', () => {
        const weapon1 = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5])]);
        const weapon2 = new Weapon('Lightsaber', 'Weapon of the Jedi', 'laser sword').addAspects([new WeaponAspect('Rey', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Luke', fakeIcon, [1, 2, 3, 4, 5]), new WeaponAspect('Anakin', fakeIcon, [3, 3, 3, 3, 3])]);
        const weapons = new Weapons().addItems([weapon1, weapon2]);

        weapon1.aspects[0].level.value = 2;
        weapon1.aspects[1].level.value = 4;
        weapon2.aspects[0].level.value = 3;
        weapon2.aspects[1].level.value = 0;
        weapon2.aspects[2].level.value = 5;

        expect(weapons.resourceTotal).toBe(55);
        expect(weapons.resourceSpent).toBe(30);
        expect(weapons.resourceRequired).toBe(25);
    });
});