import * as React from 'react';
import { Level } from '../utils';
import style from '../scss/levelControl.scss';

interface LevelControlProps {
    level: Level;
    onLevelChange: () => void;
}

const LevelControl: React.FC<LevelControlProps> = ({level, onLevelChange}) => {
    
    const levelChange = (changeFunc: () => void) => {
        return () => {
            changeFunc();
            onLevelChange();
        }
    }

    const decrement = level.decrement.bind(level);
    const increment = level.increment.bind(level);

    return <div className={style.levelControl}>
        <button onClick={levelChange(decrement)}>-</button><div>{Array.from({length:level.value}, (v, i) => <span key={`star${i}`}>⭐</span>)}</div><button onClick={levelChange(increment)}>+</button>
    </div>;
}

export default LevelControl;