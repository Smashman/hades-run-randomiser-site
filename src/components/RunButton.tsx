import * as React from 'react';
import { CompanionsContext, KeepsakesContext, MirrorContext, PactContext, WeaponsContext } from './Data';
import { Run, defaultRunOptions, Data } from '../run';

const RunButton: React.FC = () => {
    const [weaponsData] = React.useContext(WeaponsContext);
    const [keepsakesData] = React.useContext(KeepsakesContext);
    const [companionsData] = React.useContext(CompanionsContext);
    const [mirrorData] = React.useContext(MirrorContext);
    const [pactData] = React.useContext(PactContext);

    const data: Data = {
        weapons: weaponsData.weapons,
        keepsakes: keepsakesData.keepsakes,
        companions: companionsData.companions,
        mirror: mirrorData.mirror,
        pact: pactData.pact,
    };
    
    React.useLayoutEffect(() => {
        console.log('run button');

        const run = Run.generateRandomRun(defaultRunOptions, data);
        
        console.log('run', run);
        console.log('run.weapon', run.weapon);
        console.log('run.weaponAspect', run.weaponAspect);
        console.log('run.keepsake', run.keepsake);
        console.log('run.companion', run.companion);
        console.log('run.mirror', run.mirror);
        console.log('run.pact', run.pact);
    });
    
    const generateRun = () => {
        console.log(Run.generateRandomRun(defaultRunOptions, data));
    }

    return <button onClick={generateRun}>Generate run</button>;
}

export default RunButton;