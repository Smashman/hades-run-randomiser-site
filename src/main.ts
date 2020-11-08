import * as React from 'react';
import './scss/style.scss';
import * as ReactDOM from 'react-dom';
import { Run, defaultRunOptions } from './run';
import { App } from './components/App';

const run = Run.generateRandomRun(defaultRunOptions);

console.log('run', run);
console.log('run.weapon', run.weapon);
console.log('run.weaponAspect', run.weaponAspect);
console.log('run.keepsake', run.keepsake);
console.log('run.companion', run.companion);
console.log('run.mirror', run.mirror);
console.log('run.pact', run.pact);

ReactDOM.render(
    React.createElement(App),
    document.getElementById('root'),
);