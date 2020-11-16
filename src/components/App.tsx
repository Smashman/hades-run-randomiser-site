import * as React from 'react';
import { data } from '../data';
import { WeaponsDataProvider, KeepsakesDataProvider, CompanionsDataProvider, MirrorDataProvider, PactDataProvider, DataProvider } from './Data';
import KeepsakeDisplayCase from './KeepsakeDisplayCase';
import WeaponsDisplay from './WeaponsDisplay';
import RunButton from './RunButton';
import { app as appClass } from '../scss/style.scss';

export const App: React.FC = (props) => {
    const [loaded, setLoaded] = React.useState(false);

    data.loadData().then(() => setLoaded(true));

    if (!loaded) {
        // @TODO: Add a spinner or something
        return <div>Loading</div>;
    }

    return <div className={appClass}>
        <WeaponsDataProvider>
            <WeaponsDisplay></WeaponsDisplay>
        </WeaponsDataProvider>
        <KeepsakesDataProvider>
            <KeepsakeDisplayCase></KeepsakeDisplayCase>
        </KeepsakesDataProvider>
        <DataProvider>
            <RunButton></RunButton>
        </DataProvider>
    </div>;
}