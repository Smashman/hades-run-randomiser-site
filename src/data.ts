import { Weapon, WeaponAspect, Weapons } from './weapons';
import { Keepsake, Keepsakes } from './keepsakes';
import { Companion, Companions } from './companions';
import { Mirror, MirrorTalent } from './mirror';
import { Pact, PactCondition } from './pact';
import { fillArray } from './utils';
import * as React from 'react';
import * as keepsakeIcons from './img/keepsake';
import * as weaponIcons from './img/weapon';

export const weapons = new Weapons().addItems([
    new Weapon('Stygius', 'Blade of the Underworld', 'sword', true)
    .addAspects([
        new WeaponAspect('Zagreus', weaponIcons.sword.zagreus, false, true),
        new WeaponAspect('Nemesis', weaponIcons.sword.nemesis),
        new WeaponAspect('Poseidon', weaponIcons.sword.poseidon),
        new WeaponAspect('Arthur', weaponIcons.sword.arthur, true),
    ]),
    new Weapon('Varatha', 'Eternal Spear', 'spear')
    .addAspects([
        new WeaponAspect('Zagreus', weaponIcons.spear.zagreus, false, true),
        new WeaponAspect('Achilles', weaponIcons.spear.achilles),
        new WeaponAspect('Hades', weaponIcons.spear.hades),
        new WeaponAspect('Guan Yu', weaponIcons.spear.guanYu, true),
    ]),
    new Weapon('Aegis', 'Shield of Chaos', 'shield')
    .addAspects([
        new WeaponAspect('Zagreus', weaponIcons.shield.zagreus, false, true),
        new WeaponAspect('Chaos', weaponIcons.shield.chaos),
        new WeaponAspect('Zeus', weaponIcons.shield.zeus),
        new WeaponAspect('Beowulf', weaponIcons.shield.beowulf, true),
    ]),
    new Weapon('Coronacht', 'Heart-Seeking Bow', 'bow')
    .addAspects([
        new WeaponAspect('Zagreus', weaponIcons.bow.zagreus, false, true),
        new WeaponAspect('Chiron', weaponIcons.bow.chiron),
        new WeaponAspect('Hera', weaponIcons.bow.hera),
        new WeaponAspect('Rama', weaponIcons.bow.rama, true),
    ]),
    new Weapon('Malphon', 'Twin Fists', 'fists')
    .addAspects([
        new WeaponAspect('Zagreus', weaponIcons.fists.zagreus, false, true),
        new WeaponAspect('Talos', weaponIcons.fists.talos),
        new WeaponAspect('Demeter', weaponIcons.fists.demeter),
        new WeaponAspect('Gilgamesh', weaponIcons.fists.gilgamesh, true),
    ]),
    new Weapon('Exagryph', 'Adamant Rail', 'gun')
    .addAspects([
        new WeaponAspect('Zagreus', weaponIcons.gun.zagreus, false, true),
        new WeaponAspect('Eris', weaponIcons.gun.eris),
        new WeaponAspect('Hestia', weaponIcons.gun.hestia),
        new WeaponAspect('Lucifer', weaponIcons.gun.lucifer, true),
    ]),
]);

export const keepsakes = new Keepsakes().addItems([
    new Keepsake('Old Spiked Collar', 'Cerberus', keepsakeIcons.oldSpikedCollar),
    new Keepsake('Myrmidon Bracer', 'Achilles', keepsakeIcons.myrmidonBracer),
    new Keepsake('Black Shawl', 'Nyx', keepsakeIcons.blackShawl),
    new Keepsake('Pierced Butterfly', 'Thanatos', keepsakeIcons.piercedButterfly),
    new Keepsake('Bone Hourglass', 'Charon', keepsakeIcons.boneHourglass),
    new Keepsake('Chthonic Coin Purse', 'Hypnos', keepsakeIcons.chthonicCoinPurse),
    new Keepsake('Skull Earring', 'Megaera', keepsakeIcons.skullEarring),
    new Keepsake('Distant Memory', 'Orpheus', keepsakeIcons.distantMemory),
    new Keepsake('Harpy Feather Duster', 'Dusa', keepsakeIcons.harpyFeatherDuster),
    new Keepsake('Lucky Tooth', 'Skelly', keepsakeIcons.luckyTooth),
    new Keepsake('Thunder Signet', 'Zeus', keepsakeIcons.thunderSignet),
    new Keepsake('Conch Shell', 'Poseidon', keepsakeIcons.conchShell),
    new Keepsake('Owl Pendant', 'Athena', keepsakeIcons.owlPendant),
    new Keepsake('Eternal Rose', 'Aphrodite', keepsakeIcons.eternalRose),
    new Keepsake('Blood-Filled Vial', 'Ares', keepsakeIcons.bloodFilledVial),
    new Keepsake('Adamant Arrowhead', 'Artemis', keepsakeIcons.adamantArrowhead),
    new Keepsake('Overflowing Cup', 'Dionysus', keepsakeIcons.overflowingCup),
    new Keepsake('Lambent Plume', 'Hermes', keepsakeIcons.lambentPlume),
    new Keepsake('Frostbitten Horn', 'Demeter', keepsakeIcons.frostbittenHorn),
    new Keepsake('Cosmic Egg', 'Chaos', keepsakeIcons.cosmicEgg),
    new Keepsake('Shattered Shackle', 'Sisyphus', keepsakeIcons.shatteredShackle),
    new Keepsake('Evergreen Acorn', 'Eurydice', keepsakeIcons.evergreenAcorn),
    new Keepsake('Broken Spearpoint', 'Patroclus', keepsakeIcons.brokenSpearpoint),
    new Keepsake('Pom Blossom', 'Persephone', keepsakeIcons.pomBlossom),
    new Keepsake('Sigil of the Dead', 'Hades', keepsakeIcons.sigilOfTheDead, true),
]);

export const companions = new Companions().addItems([
    new Companion('Battie', 'Megaera'),
    new Companion('Mort', 'Thanatos'),
    new Companion('Rib', 'Skelly'),
    new Companion('Shady', 'Sisyphus'),
    new Companion('Fidi', 'Dusa'),
    new Companion('Antos', 'Achilles'),
]);

export const mirror = new Mirror()
    .addGroup([
        [
            new MirrorTalent('Shadow Presence', [10, 15, 20, 25, 30]),
            new MirrorTalent('Fiery Presence', [10, 15, 20, 25, 30]),
        ], [
            new MirrorTalent('Chthonic Vitality', [10, 20, 40]),
            new MirrorTalent('Dark Regeneration', [30, 60]),
        ]
    ], true)
    .addGroup([
        [
            new MirrorTalent('Death Defiance', [30, 500, 1000]),
            new MirrorTalent('Stubborn Defiance', [600]),
        ],
        [
            new MirrorTalent('Greater Reflex', [50]),
            new MirrorTalent('Ruthless Reflex', [75]),
        ]
    ], true)
    .addGroup([
        [
            new MirrorTalent('Boiling Blood', [10, 30, 50, 70, 90]),
            new MirrorTalent('Abyssal Blood', [20, 40, 60, 80, 100]),
        ],
        [
            new MirrorTalent('Infernal Soul', [20, 80]),
            new MirrorTalent('Stygian Soul', [0, 60, 180]),
        ]
    ])
    .addGroup([
        [
            new MirrorTalent('Deep Pockets', [30, 35, 40, 45, 50, 55, 60, 65, 70, 75]),
            new MirrorTalent('Golden Touch', [70, 90, 110]),
        ],
        [
            new MirrorTalent('Thick Skin', [40, 45, 50, 55, 60, 65, 70, 75, 80, 85]),
            new MirrorTalent('High Confidence', [50, 100, 150, 200, 250]),
        ]
    ])
    .addGroup([
        [
            new MirrorTalent('Privileged Status', [50, 500]),
            new MirrorTalent('Family Favorite', [50, 150]),
        ],
        [
            new MirrorTalent('Olympian Favor', fillArray(40, 50)),
            new MirrorTalent('Dark Foresight', fillArray(10, 150)),
        ]
    ])
    .addGroup([
        [
            new MirrorTalent('Gods\' Pride', fillArray(20, 100)),
            new MirrorTalent('Gods\' Legacy', fillArray(10, 250)),
        ],
        [
            new MirrorTalent('Fated Authority', [500, 750, 1000, 1250, 1500, 1750, 2000, 2250]),
            new MirrorTalent('Fated Persuasion', [1000, 2000, 3000, 4000]),
        ]
    ]);

export const pact = new Pact()
    .addCondition(new PactCondition('Hard Labor', [1, 1, 1, 1, 1]))
    .addCondition(new PactCondition('Lasting Consequences', [1, 1, 1, 1]))
    .addCondition(new PactCondition('Convenience Fee', [1, 1]))
    .addCondition(new PactCondition('Jury Summons', [1, 1, 1]))
    .addCondition(new PactCondition('Extreme Measures', [1, 2, 3, 4], 3))
    .addCondition(new PactCondition('Calisthenics Program', [1, 1]))
    .addCondition(new PactCondition('Benefits Package', [2, 3]))
    .addCondition(new PactCondition('Middle Management', [2]))
    .addCondition(new PactCondition('Underworld Customs', [2]))
    .addCondition(new PactCondition('Forced Overtime', [3, 3]))
    .addCondition(new PactCondition('Heightened Security', [1]))
    .addCondition(new PactCondition('Routine Inspection', [2, 2, 2, 2]))
    .addCondition(new PactCondition('Damage Control', [1, 1]))
    .addCondition(new PactCondition('Approval Process', [2, 3]))
    .addCondition(new PactCondition('Tight Deadline', [1, 2, 3]));

// weapons.unlockAll();
// keepsakes.unlockAll();
// companions.unlockAll();
// mirror.unlockAll();
// pact.unlockAll();

// weapons.maxLevelAll();
// keepsakes.maxLevelAll();
// companions.maxLevelAll();
// companions.maxCodexAll();

interface Data {
    weapons: Weapons;
    keepsakes: Keepsakes;
    companions: Companions;
    mirror: Mirror;
    pact: Pact;
}

export const defaultData: Data = {
    weapons,
    keepsakes,
    companions,
    mirror,
    pact,
};

export const DataContext = React.createContext<[Data, React.Dispatch<React.SetStateAction<Data>>]>([defaultData, {} as React.Dispatch<React.SetStateAction<Data>>]);

//@ts-ignore
// window.data = defaultData;