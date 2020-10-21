import { Weapon, WeaponAspect, WeaponOptions } from './weapons';
import { KeepsakeConfiguration, KeepsakeOptions } from './keepsakes';
import { Companion, CompanionOptions } from './companions';
import { MirrorConfiguration, MirrorOptions } from './mirror';
import { PactConfiguration, PactOptions } from './pact';

import { weapons, keepsakes, companions, mirror, pact } from './data';

export interface RunOptions {
    weaponOptions?: WeaponOptions;
    keepsakeOptions?: KeepsakeOptions;
    companionOptions?: CompanionOptions;
    mirrorOptions?: MirrorOptions;
    pactOptions?: PactOptions;
}

export class Run {
    constructor(public weapon: Weapon, public weaponAspect: WeaponAspect, public keepsake: KeepsakeConfiguration, public companion: Companion, public mirror: MirrorConfiguration, public pact: PactConfiguration) {
    }

    static generateRandomRun(options: RunOptions) {
        const runWeapon = options?.weaponOptions?.enabled ? weapons.getRandom() : null;
        const runWeaponAspect = runWeapon && options?.weaponOptions?.randomAspect ? runWeapon.getRandomAspect() : null;
        const runKeepsake = options?.keepsakeOptions?.enabled ? keepsakes.getRandomKeepsakes(options?.keepsakeOptions) : null;
        const runCompanion = options?.companionOptions?.enabled ? companions.getRandomCompanion(options?.companionOptions) : null;
        const runMirror = options?.mirrorOptions?.enabled ? mirror.getRandom() : null;
        const runPact = options?.pactOptions?.enabled ? pact.getRange(options?.pactOptions?.heatRange) : null;

        return new Run(
            runWeapon,
            runWeaponAspect,
            runKeepsake,
            runCompanion,
            runMirror,
            runPact,
        );
    }
}