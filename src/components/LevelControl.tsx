import * as React from 'react';
import { Level } from '../utils';
import style from '../scss/levelControl.scss';
import classnames from 'classnames';


interface LevelControlProps extends LevelControlStarsProps, Omit<LevelControlButtonsProps, 'className'> {
    buttonClassName?: string;
}

const LevelControl: React.FC<LevelControlProps> = ({level, disabled, buttonClassName, onLevelChange}) => {
    return <div className={classnames(style.levelControl, {[style.disabled]: disabled})}>
        <LevelControlStars level={level} disabled={disabled} />
        <LevelControlButtons level={level} disabled={disabled} className={buttonClassName} onLevelChange={onLevelChange} />
    </div>;
}

interface LevelControlStarsProps {
    level: Level;
    disabled?: boolean;
}

const LevelControlStars: React.FC<LevelControlStarsProps> = ({level, disabled}) => <div className={classnames(style.starContainer, {[style.disabled]: disabled})}>{Array.from({length:level.max}, (_v, i) => <div className={classnames(style.star, {[style.inactive]: i >= level.value})} key={`star${i}`}></div>)}</div>;

interface LevelControlButtonsProps {
    level: Level;
    className?: string;
    disabled?: boolean;
    onLevelChange: () => void;
}

export const LevelControlButtons: React.FC<LevelControlButtonsProps> = ({level, className, disabled, onLevelChange}) => {
    const levelChange = (changeFunc: () => void) => {
        return () => {
            changeFunc();
            onLevelChange();
        }
    }

    const decrement = level.decrement.bind(level);
    const increment = level.increment.bind(level);

    return (
        <div className={classnames(style.buttonContainer, {[style.disabled]: disabled})}>
            <button className={classnames(style.levelButton, [className])} onClick={levelChange(decrement)} disabled={disabled || level.isMinLevel()}>-</button>
            <button className={classnames(style.levelButton, [className])} onClick={levelChange(increment)} disabled={disabled || level.isMaxLevel()}>+</button>
        </div>
    );
};

export default LevelControl;