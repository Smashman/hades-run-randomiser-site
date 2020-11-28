import { Data, Run, RunOptions } from '../src/run';
import { Weapon, WeaponAspect } from '../src/weapons';
import { Keepsake, KeepsakeOptions } from '../src/keepsakes';
import { Companion, CompanionOptions } from '../src/companions';
import { MirrorConfiguration, MirrorTalent } from '../src/mirror';
import { HeatRange, Pact, PactCondition, PactConfiguration, PactOptions} from '../src/pact';
import { fakeIcon } from './helpers';
import {
    weapons as weaponsFixture,
    keepsakes as keepsakesFixture,
    companions as companionsFixture,
    mirror as mirrorFixture,
    pact as pactFixture,
} from './fixtures/data';
jest.mock('./fixtures/data');

describe('Run class', () => {
    it('should create expected Run class instance', () => {
        const run = new Run(null, null, null, null, null, null);

        expect(run).toMatchSnapshot();
    });

    describe('generateRandomRun', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        const runData: Data = {
            weapons: weaponsFixture,
            keepsakes: keepsakesFixture,
            companions: companionsFixture,
            mirror: mirrorFixture,
            pact: pactFixture,
        };

        it('should generate empty random run with no options', () => {
            const runOptions: RunOptions = {};
            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun).toMatchSnapshot();
            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate empty random run with enabled false in all options', () => {
            const runOptions: RunOptions = {
                weaponOptions: {
                    enabled: false,
                },
                keepsakeOptions: {
                    enabled: false,
                },
                companionOptions: {
                    enabled: false,
                },
                mirrorOptions: {
                    enabled: false,
                },
                pactOptions: {
                    enabled: false,
                },
            };
            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun).toMatchSnapshot();
            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with weapon enabled', () => {
            const runOptions: RunOptions = {
                weaponOptions: {
                    enabled: true,
                },
            };
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword');

            (runData.weapons.getRandom as jest.MockedFunction<typeof runData.weapons.getRandom>).mockReturnValue(weapon);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.weapon).toBe(weapon);

            expect(runData.weapons.getRandom).toHaveBeenCalledTimes(1);
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with weapon enabled and randomAspect', () => {
            const runOptions: RunOptions = {
                weaponOptions: {
                    enabled: true,
                    randomAspect: true,
                },
            };
            const weaponAspect = new WeaponAspect('Tarak', fakeIcon, [1, 1, 1, 1, 1]);
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspect(weaponAspect);

            (runData.weapons.getRandom as jest.MockedFunction<typeof runData.weapons.getRandom>).mockReturnValue(weapon);

            const getRandomAspectMock = jest.spyOn(weapon, 'getRandomAspect').mockReturnValue(weaponAspect);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.weapon).toBe(weapon);
            expect(randomRun.weaponAspect).toBe(weaponAspect);

            expect(runData.weapons.getRandom).toHaveBeenCalledTimes(1);
            expect(getRandomAspectMock).toHaveBeenCalledTimes(1);
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with keepsake enabled', () => {
            const keepsakeOptions: KeepsakeOptions = {
                enabled: true,
            };
            const runOptions: RunOptions = {
                keepsakeOptions
            };
            const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);

            (runData.keepsakes.getRandomKeepsakes as jest.MockedFunction<typeof runData.keepsakes.getRandomKeepsakes>).mockReturnValue([keepsake]);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.keepsake).toStrictEqual([keepsake]);

            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).toHaveBeenCalledTimes(1);
            expect(runData.keepsakes.getRandomKeepsakes).toHaveBeenCalledWith(keepsakeOptions);
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with companion enabled', () => {
            const companionOptions: CompanionOptions = {
                enabled: true,
            }
            const runOptions: RunOptions = {
                companionOptions,
            };
            const companion = new Companion('Fluff', 'Jeff');

            (runData.companions.getRandomCompanion as jest.MockedFunction<typeof runData.companions.getRandomCompanion>).mockReturnValue(companion);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.companion).toBe(companion);

            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandom).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).toHaveBeenCalledTimes(1);
            expect(runData.companions.getRandomCompanion).toHaveBeenCalledWith(companionOptions);
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with mirror enabled', () => {
            const runOptions: RunOptions = {
                mirrorOptions: {
                    enabled: true,
                },
            };
            const mirrorConfiguration = new MirrorConfiguration([new MirrorTalent('Run Fast', [1, 2, 3]), new MirrorTalent('Talk Good', [5, 5, 5, 5])]);

            (runData.mirror.getRandom as jest.MockedFunction<typeof runData.mirror.getRandom>).mockReturnValue(mirrorConfiguration);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.mirror).toStrictEqual(mirrorConfiguration);

            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).toHaveBeenCalledTimes(1);
            expect(runData.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with pact enabled', () => {
            const pactOptions: PactOptions = {
                enabled: true,
            };
            const runOptions: RunOptions = {
                pactOptions,
            };
            const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3])).addCondition(new PactCondition('Bigger Slam', [2, 2]));
            const pactConfig = new PactConfiguration(pact);

            (runData.pact.getRandomWithRange as jest.MockedFunction<typeof runData.pact.getRandomWithRange>).mockReturnValue(pactConfig);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.pact).toStrictEqual(pactConfig);

            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).toHaveBeenCalledTimes(1);
            expect(runData.pact.getRandomWithRange).toHaveBeenCalledWith(undefined);
        });

        it('should generate random run with pact enabled and a heatRange', () => {
            const heatRange: HeatRange = {
                min: 2,
                max: 12,
            };
            const pactOptions: PactOptions = {
                enabled: true,
                heatRange,
            };
            const runOptions: RunOptions = {
                pactOptions,
            };
            const pact = new Pact().addCondition(new PactCondition('Extra Angry', [1, 1, 1, 2, 3])).addCondition(new PactCondition('Bigger Slam', [2, 2]));
            const pactConfig = new PactConfiguration(pact);

            (runData.pact.getRandomWithRange as jest.MockedFunction<typeof runData.pact.getRandomWithRange>).mockReturnValue(pactConfig);

            const randomRun = Run.generateRandomRun(runOptions, runData);

            expect(randomRun.pact).toStrictEqual(pactConfig);

            expect(runData.weapons.getRandom).not.toHaveBeenCalled();
            expect(runData.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(runData.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(runData.mirror.getRandom).not.toHaveBeenCalled();
            expect(runData.pact.getRandomWithRange).toHaveBeenCalledTimes(1);
            expect(runData.pact.getRandomWithRange).toHaveBeenCalledWith(heatRange);
        });
    });
});