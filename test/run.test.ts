import { Run, RunOptions } from '../src/run';
import * as data from '../src/data';
import { Weapon, WeaponAspect } from '../src/weapons';
import { Keepsake, KeepsakeOptions } from '../src/keepsakes';
import { Companion, CompanionOptions } from '../src/companions';
import { MirrorConfiguration, MirrorTalent } from '../src/mirror';
import { HeatRange, Pact, PactCondition, PactConfiguration, PactOptions} from '../src/pact';
import { fakeIcon } from './helpers';
jest.mock('../src/data');

describe('Run class', () => {
    it('should create expected Run class instance', () => {
        const run = new Run(null, null, null, null, null, null);

        expect(run).toMatchSnapshot();
    });

    describe('generateRandomRun', () => {
        afterEach(() => {
            jest.resetAllMocks();
        });

        it('should generate empty random run with no options', () => {
            const runOptions: RunOptions = {};
            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun).toMatchSnapshot();
            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
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
            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun).toMatchSnapshot();
            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with weapon enabled', () => {
            const runOptions: RunOptions = {
                weaponOptions: {
                    enabled: true,
                },
            };
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword');

            (data.weapons.getRandom as jest.MockedFunction<typeof data.weapons.getRandom>).mockReturnValue(weapon);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.weapon).toBe(weapon);

            expect(data.weapons.getRandom).toHaveBeenCalledTimes(1);
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with weapon enabled and randomAspect', () => {
            const runOptions: RunOptions = {
                weaponOptions: {
                    enabled: true,
                    randomAspect: true,
                },
            };
            const weaponAspect = new WeaponAspect('Tarak', fakeIcon);
            const weapon = new Weapon('Skybreaker', 'Mistblade', 'sword').addAspect(weaponAspect);

            (data.weapons.getRandom as jest.MockedFunction<typeof data.weapons.getRandom>).mockReturnValue(weapon);

            const getRandomAspectMock = jest.spyOn(weapon, 'getRandomAspect').mockReturnValue(weaponAspect);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.weapon).toBe(weapon);
            expect(randomRun.weaponAspect).toBe(weaponAspect);

            expect(data.weapons.getRandom).toHaveBeenCalledTimes(1);
            expect(getRandomAspectMock).toHaveBeenCalledTimes(1);
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with keepsake enabled', () => {
            const keepsakeOptions: KeepsakeOptions = {
                enabled: true,
            };
            const runOptions: RunOptions = {
                keepsakeOptions
            };
            const keepsake = new Keepsake('Shoe', 'Jeff', fakeIcon);

            (data.keepsakes.getRandomKeepsakes as jest.MockedFunction<typeof data.keepsakes.getRandomKeepsakes>).mockReturnValue([keepsake]);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.keepsake).toStrictEqual([keepsake]);

            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).toHaveBeenCalledTimes(1);
            expect(data.keepsakes.getRandomKeepsakes).toHaveBeenCalledWith(keepsakeOptions);
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with companion enabled', () => {
            const companionOptions: CompanionOptions = {
                enabled: true,
            }
            const runOptions: RunOptions = {
                companionOptions,
            };
            const companion = new Companion('Fluff', 'Jeff');

            (data.companions.getRandomCompanion as jest.MockedFunction<typeof data.companions.getRandomCompanion>).mockReturnValue(companion);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.companion).toBe(companion);

            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandom).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).toHaveBeenCalledTimes(1);
            expect(data.companions.getRandomCompanion).toHaveBeenCalledWith(companionOptions);
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
        });

        it('should generate random run with mirror enabled', () => {
            const runOptions: RunOptions = {
                mirrorOptions: {
                    enabled: true,
                },
            };
            const mirrorConfiguration = new MirrorConfiguration([new MirrorTalent('Run Fast', [1, 2, 3]), new MirrorTalent('Talk Good', [5, 5, 5, 5])]);

            (data.mirror.getRandom as jest.MockedFunction<typeof data.mirror.getRandom>).mockReturnValue(mirrorConfiguration);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.mirror).toStrictEqual(mirrorConfiguration);

            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).toHaveBeenCalledTimes(1);
            expect(data.pact.getRandomWithRange).not.toHaveBeenCalled();
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

            (data.pact.getRandomWithRange as jest.MockedFunction<typeof data.pact.getRandomWithRange>).mockReturnValue(pactConfig);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.pact).toStrictEqual(pactConfig);

            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).toHaveBeenCalledTimes(1);
            expect(data.pact.getRandomWithRange).toHaveBeenCalledWith(undefined);
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

            (data.pact.getRandomWithRange as jest.MockedFunction<typeof data.pact.getRandomWithRange>).mockReturnValue(pactConfig);

            const randomRun = Run.generateRandomRun(runOptions);

            expect(randomRun.pact).toStrictEqual(pactConfig);

            expect(data.weapons.getRandom).not.toHaveBeenCalled();
            expect(data.keepsakes.getRandomKeepsakes).not.toHaveBeenCalled();
            expect(data.companions.getRandomCompanion).not.toHaveBeenCalled();
            expect(data.mirror.getRandom).not.toHaveBeenCalled();
            expect(data.pact.getRandomWithRange).toHaveBeenCalledTimes(1);
            expect(data.pact.getRandomWithRange).toHaveBeenCalledWith(heatRange);
        });
    });
});