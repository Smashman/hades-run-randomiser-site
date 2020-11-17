import * as React from 'react';
import { data } from '../data';
import { Weapon, Weapons } from '../weapons';
import { Keepsakes } from '../keepsakes';
import { Companions } from '../companions';
import { Mirror } from '../mirror';
import { Pact } from '../pact';
import * as localForage from 'localforage';

interface DataContainer {
    [k: string]: Weapons | Keepsakes | Companions | Mirror | Pact;
}
function createContext<T>() {
    return React.createContext<[T, (data:T) => void]>([{} as T, {} as (data:T) => void]);
};
function createDataProvider<T extends DataContainer>(category: string, context: React.Context<[T, (data:T) => void]>) {
    const defaultValue: T = {
        [category]: data[category],
    } as T;

    const DataProvider: React.FC = (props) => {    
        const [state, setState] = React.useState(defaultValue);

        const updateData = (data: T) => {
            try {
                localForage.setItem(category, data[category].toStorableData());
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

export const DataProvider: React.FC = (props) => {
    return (
        <KeepsakesDataProvider>
            <WeaponsDataProvider>
                <CompanionsDataProvider>
                    <MirrorDataProvider>
                        <PactDataProvider {...props}>
                        </PactDataProvider>
                    </MirrorDataProvider>
                </CompanionsDataProvider>
            </WeaponsDataProvider>
        </KeepsakesDataProvider>
    );
}