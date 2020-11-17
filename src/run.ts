import { Weapon, WeaponAspect, WeaponOptions, Weapons } from './weapons';
import { KeepsakeConfiguration, KeepsakeOptions, Keepsakes } from './keepsakes';
import { Companion, CompanionOptions, Companions } from './companions';
import { Mirror, MirrorConfiguration, MirrorOptions } from './mirror';
import { Pact, PactConfiguration, PactOptions } from './pact';

export interface RunOptions {
    weaponOptions?: WeaponOptions;
    keepsakeOptions?: KeepsakeOptions;
    companionOptions?: CompanionOptions;
    mirrorOptions?: MirrorOptions;
    pactOptions?: PactOptions;
}

export interface Data {
    weapons: Weapons;
    keepsakes: Keepsakes;
    companions: Companions;
    mirror: Mirror;
    pact: Pact;
}

export const defaultRunOptions: RunOptions = {
    weaponOptions: {
        enabled: true,
        randomAspect: true,
    },
    keepsakeOptions: {
        enabled: true,
        ignoreMaxLevel: true,
        changeBetweenBiomes: true,
    },
    companionOptions: {
        enabled: true,
        ignoreMaxCodex: true,
    },
    mirrorOptions: {
        enabled: true,
    },
    pactOptions: {
        enabled: true,
        // heatRange: {
        //     min: 4,
        //     max: 12,
        // },
    }
};

export class Run {
    constructor(public weapon: Weapon, public weaponAspect: WeaponAspect, public keepsake: KeepsakeConfiguration, public companion: Companion, public mirror: MirrorConfiguration, public pact: PactConfiguration) {
    }

    static generateRandomRun(options: RunOptions, data: Data) {
        const runWeapon = options.weaponOptions?.enabled ? data.weapons.getRandom() : null;
        const runWeaponAspect = runWeapon && options.weaponOptions.randomAspect ? runWeapon.getRandomAspect() : null;
        const runKeepsakes = options.keepsakeOptions?.enabled ? data.keepsakes.getRandomKeepsakes(options.keepsakeOptions) : null;
        const runCompanion = options.companionOptions?.enabled ? data.companions.getRandomCompanion(options.companionOptions) : null;
        const runMirror = options.mirrorOptions?.enabled ? data.mirror.getRandom() : null;
        const runPact = options.pactOptions?.enabled ? data.pact.getRandomWithRange(options.pactOptions.heatRange) : null;

        return new Run(
            runWeapon,
            runWeaponAspect,
            runKeepsakes,
            runCompanion,
            runMirror,
            runPact,
        );
    }
}