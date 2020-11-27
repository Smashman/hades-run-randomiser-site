import * as React from 'react';
import { data } from '../data';
import { WeaponsDataProvider, KeepsakesDataProvider, CompanionsDataProvider, MirrorDataProvider, PactDataProvider, DataProvider } from './Data';
import KeepsakeDisplayCase from './KeepsakeDisplayCase';
import WeaponsDisplay from './WeaponsDisplay';
import RunResults from './RunResults';
import * as style from '../scss/style.scss';
import { getRandomItemFromArray } from '../utils';
import cx from 'classnames';

const loadingMessages = [
    "Reheating lava",
    "Waking up Hypnos",
    "Sharpening scythe",
    "Regrowing Hydra heads",
    "Giving Theseus a pep talk",
    "Bribing Charon",
    "Taking Ares to anger management",
    "Feeding butterflies",
    "Oiling chariot wheels",
    "Petting Cerberus",
    "Cheering up Orpheus",
    "Flattering Aphrodite",
    "Uncorking Ambrosia",
    "Reconvening the court",
    "Demoralising shades",
    "Polishing gemstones",
    "Staring into the roiling abyss",
    "Mixing hangover cures",
    "Restringing bow",
    "Cracking whip",
    "Thanking my good shade",
    "Filing paperwork",
    "Racing Hermes",
    "Dodging arrows",
    "Protecting Dusa",
    "Forging lightning bolts",
    "Denying claims",
];

export const App: React.FC = (props) => {
    const [loaded, setLoaded] = React.useState(false);

    data.loadData()
        // .then(() => new Promise(resolve => setTimeout(resolve, 1500)))
        .then(() => setLoaded(true));

    if (!loaded) {
        return (<div className={cx(style.app, style.loading)}>
            <div className={style.spinner}></div>
            <span>{ getRandomItemFromArray(loadingMessages) }</span>
        </div>);
    }

    return <div className={style.app}>
        <WeaponsDataProvider>
            <WeaponsDisplay></WeaponsDisplay>
        </WeaponsDataProvider>
        <KeepsakesDataProvider>
            <KeepsakeDisplayCase></KeepsakeDisplayCase>
        </KeepsakesDataProvider>
        <DataProvider>
            <RunResults></RunResults>
        </DataProvider>
    </div>;
}