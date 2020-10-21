import { Run, RunOptions } from './run';

const runOptions: RunOptions = {
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
        heatRange: {
            min: 4,
            max: 12,
        },
    }
};

const run = Run.generateRandomRun(runOptions);

console.log('run', run);
console.log('run.weapon', run.weapon);
console.log('run.weaponAspect', run.weaponAspect);
console.log('run.keepsake', run.keepsake);
console.log('run.companion', run.companion);
console.log('run.mirror', run.mirror);
console.log('run.pact', run.pact);