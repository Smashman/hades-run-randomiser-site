import * as React from 'react';
import { data } from '../data';
import { Weapons } from '../weapons';
import { Keepsakes } from '../keepsakes';
import { Companions } from '../companions';
import { Mirror } from '../mirror';
import { Pact } from '../pact';
import * as localForage from 'localforage';
import { RunOptions } from '../run';

interface DataContainer {
    [k: string]: Weapons | Keepsakes | Companions | Mirror | Pact;
}
function createContext<T>() {
    return React.createContext<[T, (data:T) => void]>([{} as T, {} as (data:T) => void]);
};
function createDataProvider<T extends DataContainer>(categoryName: string, context: React.Context<[T, (data:T) => void]>) {
    const defaultValue: T = {
        [categoryName]: data[categoryName],
    } as T;

    const DataProvider: React.FC = (props) => {    
        const [state, setState] = React.useState(defaultValue);

        const updateData = (data: T) => {
            try {
                localForage.setItem(categoryName, data[categoryName].toStorableData());
            } catch (e) {
                console.error(e);
            }
            setState(data);
        };

        return <context.Provider value={[state, updateData]} {...props} />
    }
    return DataProvider;
}

interface WeaponsData extends DataContainer {
    weapons: Weapons;
}
export const WeaponsContext = createContext<WeaponsData>();
export const WeaponsDataProvider = createDataProvider<WeaponsData>('weapons', WeaponsContext);

interface KeepsakesData extends DataContainer {
    keepsakes: Keepsakes;
}
export const KeepsakesContext = createContext<KeepsakesData>();
export const KeepsakesDataProvider = createDataProvider<KeepsakesData>('keepsakes', KeepsakesContext);

interface CompanionsData extends DataContainer {
    companions: Companions;
}
export const CompanionsContext = createContext<CompanionsData>();
export const CompanionsDataProvider = createDataProvider<CompanionsData>('companions', CompanionsContext);

interface MirrorData extends DataContainer {
    mirror: Mirror;
}
export const MirrorContext = createContext<MirrorData>();
export const MirrorDataProvider = createDataProvider<MirrorData>('mirror', MirrorContext);

interface PactData extends DataContainer {
    pact: Pact;
}
export const PactContext = createContext<PactData>();
export const PactDataProvider = createDataProvider<PactData>('pact', PactContext);

interface RunOptionsData {
    runOptions: RunOptions;
}
export const RunOptionsContext = createContext<RunOptionsData>();
export const RunOptionsDataProvider: React.FC = (props) => {    
    const [state, setState] = React.useState({runOptions: data.runOptions});

    const updateData = (data: RunOptionsData) => {
        try {
            localForage.setItem('runOptions', data.runOptions);
        } catch (e) {
            console.error(e);
        }
        setState(data);
    };

    return <RunOptionsContext.Provider value={[state, updateData]} {...props} />
}

export const DataProvider: React.FC = (props) => {
    return (
        <KeepsakesDataProvider>
            <WeaponsDataProvider>
                <CompanionsDataProvider>
                    <MirrorDataProvider>
                        <PactDataProvider>
                            <RunOptionsDataProvider {...props}>
                            </RunOptionsDataProvider>
                        </PactDataProvider>
                    </MirrorDataProvider>
                </CompanionsDataProvider>
            </WeaponsDataProvider>
        </KeepsakesDataProvider>
    );
}