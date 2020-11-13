import { Weapon, WeaponAspect, Weapons } from './weapons';
import { Keepsake, Keepsakes } from './keepsakes';
import { Companion, Companions } from './companions';
import { Mirror, MirrorTalent } from './mirror';
import { Pact, PactCondition } from './pact';
import { fillArray } from './utils';
import * as React from 'react';

export const weapons = new Weapons().addItems([
    new Weapon('Stygius', 'Blade of the Underworld', 'sword', true)
    .addAspects([
        new WeaponAspect('Zagreus', 0, false, true),
        new WeaponAspect('Nemesis'),
        new WeaponAspect('Poseidon'),
        new WeaponAspect('Arthur', 1, true),
    ]),
    new Weapon('Varatha', 'Eternal Spear', 'spear')
    .addAspects([
        new WeaponAspect('Zagreus', 0, false, true),
        new WeaponAspect('Achilles'),
        new WeaponAspect('Hades'),
        new WeaponAspect('Guan Yu', 1, true),
    ]),
    new Weapon('Coronacht', 'Heart-Seeking Bow', 'bow')
    .addAspects([
        new WeaponAspect('Zagreus', 0, false, true),
        new WeaponAspect('Chiron'),
        new WeaponAspect('Hera'),
        new WeaponAspect('Rama', 1, true),
    ]),
    new Weapon('Aegis', 'Shield of Chaos', 'shield')
    .addAspects([
        new WeaponAspect('Zagreus', 0, false, true),
        new WeaponAspect('Chaos'),
        new WeaponAspect('Zeus'),
        new WeaponAspect('Beowulf', 1, true),
    ]),
    new Weapon('Malphon', 'Twin Fists', 'fists')
    .addAspects([
        new WeaponAspect('Zagreus', 0, false, true),
        new WeaponAspect('Talos'),
        new WeaponAspect('Demeter'),
        new WeaponAspect('Gilgamesh', 1, true),
    ]),
    new Weapon('Exagryph', 'Adamant Rail', 'gun')
    .addAspects([
        new WeaponAspect('Zagreus', 0, false, true),
        new WeaponAspect('Eris'),
        new WeaponAspect('Hestia'),
        new WeaponAspect('Lucifer', 1, true),
    ]),
]);

export const keepsakes = new Keepsakes().addItems([
    new Keepsake('Old Spiked Collar', 'Cerberus'),
    new Keepsake('Myrmidon Bracer', 'Achilles'),
    new Keepsake('Black Shawl', 'Nyx'),
    new Keepsake('Pierced Butterfly', 'Thanatos'),
    new Keepsake('Bone Hourglass', 'Charon'),
    new Keepsake('Chthonic Coin Purse', 'Hypnos'),
    new Keepsake('Skull Earring', 'Megaera'),
    new Keepsake('Distant Memory', 'Orpheus'),
    new Keepsake('Harpy Feather Duster', 'Dusa'),
    new Keepsake('Lucky Tooth', 'Skelly'),
    new Keepsake('Thunder Signet', 'Zeus'),
    new Keepsake('Conch Shell', 'Poseidon'),
    new Keepsake('Owl Pendant', 'Athena'),
    new Keepsake('Eternal Rose', 'Aphrodite'),
    new Keepsake('Blood-Filled Vial', 'Ares'),
    new Keepsake('Adamant Arrowhead', 'Artemis'),
    new Keepsake('Overflowing Cup', 'Dionysus'),
    new Keepsake('Lambent Plume', 'Hermes'),
    new Keepsake('Frostbitten Horn', 'Demeter'),
    new Keepsake('Cosmic Egg', 'Chaos'),
    new Keepsake('Shattered Shackle', 'Sisyphus'),
    new Keepsake('Evergreen Acorn', 'Eurydice'),
    new Keepsake('Broken Spearpoint', 'Patroclus'),
    new Keepsake('Pom Blossom', 'Persephone'),
    new Keepsake('Sigil of the Dead', 'Hades', true),
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