import * as React from 'react';
import { Level } from '../utils';
import style from '../scss/levelControl.scss';
import classnames from 'classnames';

interface LevelControlProps {
    level: Level;
    disabled?: boolean;
    onLevelChange: () => void;
}

const LevelControl: React.FC<LevelControlProps> = ({level, disabled, onLevelChange}) => {
    
    const levelChange = (changeFunc: () => void) => {
        return () => {
            changeFunc();
            onLevelChange();
        }
    }

    const decrement = level.decrement.bind(level);
    const increment = level.increment.bind(level);

    return <div className={classnames(style.levelControl, {[style.disabled]: disabled})}>
        <div className={style.starContainer}>{Array.from({length:level.max}, (_v, i) => <div className={classnames(style.star, {[style.inactive]: i >= level.value})} key={`star${i}`}></div>)}</div>
        <div className={style.buttonContainer}>
            <button className={style.levelButton} onClick={levelChange(decrement)} disabled={disabled || level.isMinLevel()}>-</button>
            <button className={style.levelButton} onClick={levelChange(increment)} disabled={disabled || level.isMaxLevel()}>+</button>
        </div>
    </div>;
}

export default LevelControl;