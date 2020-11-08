import * as React from 'react';
import { DataContext, defaultData } from '../data';
import KeepsakeDisplayCase from './KeepsakeDisplayCase';
import WeaponsDisplay from './WeaponsDisplay';
import RunButton from './RunButton';

const DataProvider: React.FC = (props) => {
    const dataValue = React.useState(defaultData);

    return <DataContext.Provider value={dataValue} {...props} />
}

export const App: React.FC = (props) => {
    return <div>
        <DataProvider>
            <WeaponsDisplay></WeaponsDisplay>
            <KeepsakeDisplayCase></KeepsakeDisplayCase>
            <RunButton></RunButton>
        </DataProvider>
    </div>;
}