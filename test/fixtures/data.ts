import { Weapon, WeaponAspect, Weapons } from '../../src/weapons';
import { Keepsakes, Keepsake } from '../../src/keepsakes';
import { Companions, Companion } from '../../src/companions';
import { Mirror, MirrorTalent } from '../../src/mirror';
import { Pact, PactCondition } from '../../src/pact';
import { fakeIcon } from '../helpers';

export const weapons = new Weapons().addItems([
    new Weapon('Skybreaker', 'Mistblade', 'sword').addAspects([new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Shokrug', fakeIcon, [1, 2, 3, 4, 5])]),
    new Weapon('Lightsaber', 'Weapon of the Jedi', 'laser sword').addAspects([new WeaponAspect('Rey', fakeIcon, [1, 1, 1, 1, 1]), new WeaponAspect('Luke', fakeIcon, [1, 2, 3, 4, 5]), new WeaponAspect('Anakin', fakeIcon, [3, 3, 3, 3, 3])])
]);

export const keepsakes = new Keepsakes().addItems([
    new Keepsake('Shoe', 'Jeff', fakeIcon),
    new Keepsake('Coat', 'Delilah', fakeIcon),
    new Keepsake('Skirt', 'Bob', fakeIcon),
    new Keepsake('Scarf', 'Trevor', fakeIcon),
]);

export const companions = new Companions().addItems([
    new Companion('Fluff', 'Jeff'),
    new Companion('Rex', 'Delilah'),
    new Companion('Trunky', 'Bob'),
    new Companion('Mr. Bilbadopulous', 'Trevor'),
]);

export const mirror = new Mirror().addGroup([
    [new MirrorTalent('Run Fast', [1, 2, 3]), new MirrorTalent('Jump High', [3, 3, 3])],
    [new MirrorTalent('Talk Good', [5, 5, 5, 5]), new MirrorTalent('Smile Nice', [20])],
]).addGroup([
    [new MirrorTalent('Live Long', [100, 100, 100, 100]), new MirrorTalent('Dodge Quick', [15, 15])],
    [new MirrorTalent('Eat Well', [250, 250]), new MirrorTalent('Smell Pleasant', [4000])],
]);

export const pact = new Pact()
    .addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3]))
    .addCondition(new PactCondition('Bigger Slam', [2, 2]))
    .addCondition(new PactCondition('Harder Skin', [5]));