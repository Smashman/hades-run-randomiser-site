import * as React from 'react';
import { CompanionsContext, KeepsakesContext, MirrorContext, PactContext, RunOptionsContext, WeaponsContext } from './Data';
import { Run, Data, RunOptions } from '../run';
import style from '../scss/runOptions.scss';

interface RunData {
    run: Run;
}

const RunInterface: React.FC = () => {
    const [{ runOptions }, setRunOptions] = React.useContext(RunOptionsContext);
    const [{ weapons }] = React.useContext(WeaponsContext);
    const [{ keepsakes }] = React.useContext(KeepsakesContext);
    const [{ companions }] = React.useContext(CompanionsContext);
    const [{ mirror }] = React.useContext(MirrorContext);
    const [{ pact }] = React.useContext(PactContext);

    const data: Data = {
        weapons,
        keepsakes,
        companions,
        mirror,
        pact,
    };

    const [runData, setRunData] = React.useState<RunData>();

    const updateRunOptions = () => {
        setRunOptions({ runOptions });
    };

    const generateRun = () => {
        const generatedRun = Run.generateRandomRun(runOptions, data);
        console.log({generatedRun});
        setRunData({ run: generatedRun });
    }

    const runOptionsProps: RunOptionsProps = {
        runOptions,
        updateRunOptions,
        generateRun,
    };

    const runResultsProps: RunResultsProps = {
        runData,
    };

    return <React.Fragment>
        <RunOptions {...runOptionsProps} />
        <RunResults {...runResultsProps} />
    </React.Fragment>;
};

interface RunOptionsProps {
    runOptions: RunOptions;
    updateRunOptions: () => void;
    generateRun: () => void;
}

const RunOptions: React.FC<RunOptionsProps> = ({ runOptions, updateRunOptions, generateRun }) => {
    const [{ pact }] = React.useContext(PactContext);

    React.useEffect(() => {
        console.log('run options');
        console.log({runOptions});
    });

    const updateBooleanRunOption = <O extends keyof RunOptions, K extends keyof RunOptions[O]>(option: O, key: K) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            runOptions[option] = {
                ...runOptions[option],
                [key]: event.target.checked,
            };
            updateRunOptions();
        }
    }

    const disableGenerateButton = [
        runOptions.weaponOptions?.enabled,
        runOptions.keepsakeOptions?.enabled,
        // runOptions.companionOptions?.enabled,
        // runOptions.mirrorOptions?.enabled,
        // runOptions.pactOptions?.enabled,
    ].every(bool => !bool);

    return (<div className={style.settings}>
        <div className={style.title}>Generate a Randomised Run</div>
        <div className={style.settingsContainer}>
            <div className={style.settingContainer}>
                <div className={style.settingTitle}>Weapon</div>
                <CheckboxRunOption
                    label='Choose a random weapon'
                    id={'weaponEnabled'}
                    value={runOptions.weaponOptions?.enabled}
                    onChange={updateBooleanRunOption('weaponOptions', 'enabled')}
                />
                <CheckboxRunOption
                    label='Choose a random aspect'
                    id={'weaponRandomAspect'}
                    value={runOptions.weaponOptions?.randomAspect}
                    onChange={updateBooleanRunOption('weaponOptions', 'randomAspect')}
                    disabled={!runOptions.weaponOptions.enabled}
                />
            </div>
            <div className={style.settingContainer}>
                <div className={style.settingTitle}>Keepsake</div>
                <CheckboxRunOption
                    label='Choose a random keepsake'
                    id={'keepsakeEnabled'}
                    value={runOptions.keepsakeOptions?.enabled}
                    onChange={updateBooleanRunOption('keepsakeOptions', 'enabled')}
                />
                <CheckboxRunOption
                    label='Only choose from keepsakes that are not max level'
                    id={'keepsakeIgnoreMaxLevel'}
                    value={runOptions.keepsakeOptions?.ignoreMaxLevel}
                    onChange={updateBooleanRunOption('keepsakeOptions', 'ignoreMaxLevel')}
                    disabled={!runOptions.keepsakeOptions.enabled}
                />
                <CheckboxRunOption
                    label='Choose a different keepsake for each biome'
                    id={'keepsakeChangeBetweenBiomes'}
                    value={runOptions.keepsakeOptions?.changeBetweenBiomes}
                    onChange={updateBooleanRunOption('keepsakeOptions', 'changeBetweenBiomes')}
                    disabled={!runOptions.keepsakeOptions.enabled}
                />
            </div>
            {/* <div className={style.settingContainer}>
                <div className={style.settingTitle}>Companion</div>
                <CheckboxRunOption
                    label='Choose a random companion'
                    id={'companionEnabled'}
                    value={runOptions.companionOptions?.enabled}
                    onChange={updateBooleanRunOption('companionOptions', 'enabled')}
                />
                <CheckboxRunOption
                    label='Only choose from companions that do not have a complete codex entry'
                    id={'companionIgnoreMaxCodex'}
                    value={runOptions.companionOptions?.ignoreMaxCodex}
                    onChange={updateBooleanRunOption('companionOptions', 'ignoreMaxCodex')}
                    disabled={!runOptions.companionOptions.enabled}
                />
            </div> */}
            {/* <div className={style.settingContainer}>
                <div className={style.settingTitle}>Mirror</div>
                <CheckboxRunOption
                    label='Choose a random mirror configuration'
                    id={'mirrorEnabled'}
                    value={runOptions.mirrorOptions?.enabled}
                    onChange={updateBooleanRunOption('mirrorOptions', 'enabled')}
                />
            </div> */}
            {/* <div className={style.settingContainer}>
                <div className={style.settingTitle}>Pact</div>
                <CheckboxRunOption
                    label='Choose a random heat configuration'
                    id={'pactEnabled'}
                    value={runOptions.pactOptions?.enabled}
                    onChange={updateBooleanRunOption('pactOptions', 'enabled')}
                />
                <div>
                    <label>
                        Generate a heat configuration between this range<br/>
                        <em>Higher heat generations might exceed the range slightly due to larger heat values between steps</em>
                        <div>
                            <input type="range"
                                value={runOptions.pactOptions.heatRange.max} min={0} max={pact.maxHeat}
                                onChange={(event) => {
                                    runOptions.pactOptions.heatRange.max = parseInt(event.target.value);
                                    updateRunOptions();
                                }}
                                disabled={!runOptions.pactOptions.enabled}
                            />
                        </div>
                    </label>
                </div>
            </div> */}
        </div>
        <div className={style.generate}>
            <button onClick={generateRun} disabled={disableGenerateButton}>Roll the bones!</button>
        </div>
    </div>);
};

interface CheckboxRunOptionProps {
    label: string;
    id: string;
    value: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

const CheckboxRunOption: React.FC<CheckboxRunOptionProps> = ({label, id, value, onChange, disabled}) => {
    return (<div className={style.setting}>
        <input
            type="checkbox"
            id={id}
            checked={value}
            onChange={onChange}
            disabled={disabled}
        />
        <label htmlFor={id}>{label}</label>
    </div>);
};

interface RunResultsProps {
    runData: RunData;
}

const RunResults: React.FC<RunResultsProps> = ({ runData }) => {
    React.useEffect(() => {
        console.log('run results');
    });

    return (<div>
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
            : ''}
    </div>);
};

export default RunInterface;