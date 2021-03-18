import { Weapon, WeaponAspect, WeaponOptions, Weapons, defaultWeaponOptions } from './weapons';
import { KeepsakeConfiguration, KeepsakeOptions, Keepsakes, defaultKeepsakeOptions } from './keepsakes';
import { Companion, CompanionOptions, Companions, defaultCompanionOptions } from './companions';
import { Mirror, MirrorConfiguration, MirrorOptions, defaultMirrorOptions } from './mirror';
import { Pact, PactConfiguration, PactOptions, defaultPactOptions } from './pact';

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
    weaponOptions: defaultWeaponOptions,
    keepsakeOptions: defaultKeepsakeOptions,
    companionOptions: defaultCompanionOptions,
    mirrorOptions: defaultMirrorOptions,
    pactOptions: defaultPactOptions,
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