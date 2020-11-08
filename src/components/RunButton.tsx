import * as React from 'react';
import { Run, defaultRunOptions } from '../run';

const RunButton: React.FC = () => {
    
    const generateRun = () => {
        console.log(Run.generateRandomRun(defaultRunOptions));
    }

    return <button onClick={generateRun}>Generate run</button>;
}

export default RunButton;