import * as React from 'react';
import { data } from '../data';
import { Weapons } from '../weapons';
import { Keepsakes } from '../keepsakes';
import { Companions } from '../companions';
import { Mirror } from '../mirror';
import { Pact } from '../pact';

interface WeaponsData {
    weapons: Weapons;
}
export const WeaponsContext = React.createContext<[WeaponsData, React.Dispatch<React.SetStateAction<WeaponsData>>]>([{} as WeaponsData, {} as React.Dispatch<React.SetStateAction<WeaponsData>>]);

interface KeepsakesData {
    keepsakes: Keepsakes;
}
export const KeepsakesContext = React.createContext<[KeepsakesData, React.Dispatch<React.SetStateAction<KeepsakesData>>]>([{} as KeepsakesData, {} as React.Dispatch<React.SetStateAction<KeepsakesData>>]);

interface CompanionsData {
    companions: Companions;
}
export const CompanionsContext = React.createContext<[CompanionsData, React.Dispatch<React.SetStateAction<CompanionsData>>]>([{} as CompanionsData, {} as React.Dispatch<React.SetStateAction<CompanionsData>>]);

interface MirrorData {
    mirror: Mirror;
}
export const MirrorContext = React.createContext<[MirrorData, React.Dispatch<React.SetStateAction<MirrorData>>]>([{} as MirrorData, {} as React.Dispatch<React.SetStateAction<MirrorData>>]);

interface PactData {
    pact: Pact;
}
export const PactContext = React.createContext<[PactData, React.Dispatch<React.SetStateAction<PactData>>]>([{} as PactData, {} as React.Dispatch<React.SetStateAction<PactData>>]);

export const WeaponsDataProvider: React.FC = (props) => {
    const weaponsState = React.useState({weapons: data.weapons});

    return <WeaponsContext.Provider value={weaponsState} {...props} />
}

export const KeepsakesDataProvider: React.FC = (props) => {
    const keepsakesState = React.useState({keepsakes: data.keepsakes});

    return <KeepsakesContext.Provider value={keepsakesState} {...props} />
}

export const CompanionsDataProvider: React.FC = (props) => {
    const companionsState = React.useState({companions: data.companions});

    return <CompanionsContext.Provider value={companionsState} {...props} />
}

export const MirrorDataProvider: React.FC = (props) => {
    const mirrorState = React.useState({mirror: data.mirror});

    return <MirrorContext.Provider value={mirrorState} {...props} />
}

export const PactDataProvider: React.FC = (props) => {
    const pactState = React.useState({pact: data.pact});

    return <PactContext.Provider value={pactState} {...props} />
}

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