import * as React from 'react';
import { CompanionsContext, KeepsakesContext, MirrorContext, PactContext, RunOptionsContext, WeaponsContext } from './Data';
import { Run, Data, RunOptions } from '../run';
import { WeaponOptions } from '../weapons';
import { KeepsakeOptions } from '../keepsakes';
import { CompanionOptions } from '../companions';
import { MirrorOptions } from '../mirror';
import { PactOptions } from '../pact';

const RunResults: React.FC = () => {
    const [{weapons}] = React.useContext(WeaponsContext);
    const [{keepsakes}] = React.useContext(KeepsakesContext);
    const [{companions}] = React.useContext(CompanionsContext);
    const [{mirror}] = React.useContext(MirrorContext);
    const [{pact}] = React.useContext(PactContext);
    const [{runOptions}, setRunOptions] = React.useContext(RunOptionsContext);

    interface RunData {
        run: Run;
    }

    const [runData, setRunData] = React.useState<RunData>();

    const data: Data = {
        weapons,
        keepsakes,
        companions,
        mirror,
        pact,
    };
    
    React.useLayoutEffect(() => {
        console.log('run button');

        // const run = Run.generateRandomRun(runOptions, data);

        // setRunData({run});
        
        // console.log('run', run);
        // console.log('run.weapon', run.weapon);
        // console.log('run.weaponAspect', run.weaponAspect);
        // console.log('run.keepsake', run.keepsake);
        // console.log('run.companion', run.companion);
        // console.log('run.mirror', run.mirror);
        // console.log('run.pact', run.pact);
    }, []);
    
    const generateRun = () => {
        const generatedRun = Run.generateRandomRun(runOptions, data);
        setRunData({run: generatedRun});
    }

    // type PropertyKeys = WeaponOptions | KeepsakeOptions | CompanionOptions | MirrorOptions;

    // const updateRunOption = <T extends WeaponOptions, K extends keyof T>(options: T, key: K) => {
    //     return (event: React.ChangeEvent<HTMLInputElement>) => {
    //         if (typeof options[key] === 'boolean') {
    //             (options[key] as boolean) = event.target.checked;
    //         }
    //         setRunOptions({runOptions});
    //     }
    // }

    return (<div>
        <div>
            {/* <div>
                <label>Choose a random weapon</label><input type="checkbox" checked={runOptions.weaponOptions?.enabled} onChange={updateRunOption(runOptions.weaponOptions, 'enabled')} />
            </div>
            <div>
                <label>Choose a random aspect</label><input type="checkbox" checked={runOptions.weaponOptions?.randomAspect} onChange={updateRunOption(runOptions.weaponOptions, 'randomAspect')} />
            </div>
            <div>
                <label>Choose a random keepsake</label><input type="checkbox" checked={runOptions.weaponOptions?.randomAspect} onChange={updateRunOption(runOptions.keepsakeOptions, 'enabled')} />
            </div> */}
            {/* { Object.values(runOptions).map(value => {
                console.log(value);
                return <div>{JSON.stringify(value)}</div>;
            })} */}
            {/* { JSON.stringify(runOptions) } */}
        </div>
        <button onClick={generateRun}>Generate run</button>
        {/* <div>{JSON.stringify(cleanedRunData)}</div> */}
        { runData ?
            <table>
                <thead>
                    <tr>
                        <th>Thing</th>
                        <th>What use</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Weapon</td>
                        <td>{runData.run.weapon?.name}</td>
                    </tr>
                    <tr>
                        <td>Weapon Aspect</td>
                        <td>{runData.run.weaponAspect?.name}</td>
                    </tr>
                    <tr>
                        <td>Keepsake</td>
                        <td>{runData.run.keepsake?.map(keepsake => `${keepsake?.name}, `)}</td>
                    </tr>
                    <tr>
                        <td>Companion</td>
                        <td>{runData.run.companion?.name}</td>
                    </tr>
                </tbody>
            </table>
        : '' }
    </div>);
}

export default RunResults;