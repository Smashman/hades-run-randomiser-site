import { Weapon, WeaponAspect, Weapons } from '../src/weapons';
import * as utils from '../src/utils';
import { getRandomItemFromArrayMock } from './helpers';

describe('WeaponAspect class', () => {
    it('should create expected WeaponAspect class instance', () => {
        const weaponAspect = new WeaponAspect('Tarak');

        expect(weaponAspect).toMatchSnapshot();
    });

    it('should create expected WeaponAspect class instance with more parameters', () => {
        const weaponAspect = new WeaponAspect('Tarak', 0, true, true);

        expect(weaponAspect).toMatchSnapshot();
    });
});

// Skybreaker is a legendary weapon, a 'Mistblade', in my D&D campaign.
// Tarak is a player's character who now owns it.
// Shokrug is its previous owner.
// It fit too well not to use...

describe('Weapon class', () => {
    it('should create expected Weapon class instance', () => {
        const weapon = new Weapon('Skybreaker', 'Mistblade');

        expect(weapon).toMatchSnapshot();
    });

    it('should add aspect to Weapon', () => {
        const weaponAspect = new WeaponAspect('Tarak');
        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspect(weaponAspect);

        expect(weapon.aspects).toHaveLength(1);
        expect(weapon.aspects).toContain(weaponAspect);
    });

    it('should add aspects to Weapon', () => {
        const weaponAspect1 = new WeaponAspect('Tarak');
        const weaponAspect2 = new WeaponAspect('Shokrug');
        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.aspects).toHaveLength(2);
        expect(weapon.aspects).toContain(weaponAspect1);
        expect(weapon.aspects).toContain(weaponAspect2);
    });

    it('should return no items for unlockedAspects if no aspects are unlocked', () => {
        const weaponAspect1 = new WeaponAspect('Tarak');
        const weaponAspect2 = new WeaponAspect('Shokrug');
        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.unlockedAspects).toHaveLength(0);
    });

    it('should return expected items for unlockedAspects when a subset of aspects is unlocked', () => {
        const weaponAspect1 = new WeaponAspect('Tarak');
        weaponAspect1.unlock();

        const weaponAspect2 = new WeaponAspect('Shokrug');

        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.unlockedAspects).toHaveLength(1);
        expect(weapon.unlockedAspects).toContain(weaponAspect1);
        expect(weapon.unlockedAspects).not.toContain(weaponAspect2);
    });

    it('should return all items for unlockedAspects when all aspects are unlocked', () => {
        const weaponAspect1 = new WeaponAspect('Tarak');
        weaponAspect1.unlock();

        const weaponAspect2 = new WeaponAspect('Shokrug');
        weaponAspect2.unlock();

        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

        expect(weapon.unlockedAspects).toHaveLength(2);
        expect(weapon.unlockedAspects).toContain(weaponAspect1);
        expect(weapon.unlockedAspects).toContain(weaponAspect2);
    });

    it('should set all aspects to unlocked when calling unlockAllAspects', () => {
        const weaponAspect1 = new WeaponAspect('Tarak');
        const weaponAspect2 = new WeaponAspect('Shokrug');
        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

        weapon.unlockAllAspects();

        expect(weapon.unlockedAspects).toHaveLength(2);
        expect(weapon.unlockedAspects).toContain(weaponAspect1);
        expect(weapon.unlockedAspects).toContain(weaponAspect2);
    });

    it('should set all aspects to max level when calling maxLevelAllAspects', () => {
        const weaponAspect1 = new WeaponAspect('Tarak');
        const weaponAspect2 = new WeaponAspect('Shokrug');
        const weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

        weapon.maxLevelAllAspects();

        expect(weaponAspect1.level.value).toBe(5);
        expect(weaponAspect2.level.value).toBe(5);
    });

    describe('getRandomAspect', () => {
        let getRandomItemFromArraySpy: jest.SpyInstance;

        let weaponAspect1: WeaponAspect;
        let weaponAspect2: WeaponAspect;

        let weapon: Weapon;

        beforeEach(() => {
            weaponAspect1 = new WeaponAspect('Tarak');
            weaponAspect2 = new WeaponAspect('Shokrug');
            weapon = new Weapon('Skybreaker', 'Mistblade').addAspects([weaponAspect1, weaponAspect2]);

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
});

describe('Weapons class', () => {
    it('should unlock all aspects as well as all weapons when calling unlockAll', () => {
        const weapon1 = new Weapon('Skybreaker', 'Mistblade').addAspects([new WeaponAspect('Tarak'), new WeaponAspect('Shokrug')]);
        const weapon2 = new Weapon('Lightsaber', 'Weapon of the Jedi').addAspects([new WeaponAspect('Rey'), new WeaponAspect('Luke'), new WeaponAspect('Anakin')]);
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
        const weapon1 = new Weapon('Skybreaker', 'Mistblade').addAspects([new WeaponAspect('Tarak'), new WeaponAspect('Shokrug')]);
        const weapon2 = new Weapon('Lightsaber', 'Weapon of the Jedi').addAspects([new WeaponAspect('Rey'), new WeaponAspect('Luke'), new WeaponAspect('Anakin')]);
        const weapons = new Weapons().addItems([weapon1, weapon2]);

        expect(weapon1.aspects[0].level.value).toBe(1);
        expect(weapon1.aspects[1].level.value).toBe(1);
        expect(weapon2.aspects[0].level.value).toBe(1);
        expect(weapon2.aspects[1].level.value).toBe(1);
        expect(weapon2.aspects[2].level.value).toBe(1);

        weapons.maxLevelAll();

        expect(weapon1.aspects[0].level.value).toBe(5);
        expect(weapon1.aspects[1].level.value).toBe(5);
        expect(weapon2.aspects[0].level.value).toBe(5);
        expect(weapon2.aspects[1].level.value).toBe(5);
        expect(weapon2.aspects[2].level.value).toBe(5);
    });
});