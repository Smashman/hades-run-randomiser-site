import * as React from 'react';
import { Weapon, WeaponAspect } from '../weapons';
import { DataContext } from '../data';
import style from '../scss/weapons.scss';
import { aspect as aspectButton } from '../scss/levelControl.scss';
import { LevelControlButtons } from './LevelControl';
import classnames from 'classnames';
import { unknownIcon } from '../img/misc';

const WeaponsDisplay: React.FC = () => {
    const [data, setData] = React.useContext(DataContext);
    const {weapons} = data;
    React.useEffect(() => {console.log('weapons')});

    const updateWeapons = () => setData((state) => ({...state, weapons}));

    return (
        <div className={style.weapons}>
            {weapons.items.map((weapon, index) => <WeaponOptions weapon={weapon} update={updateWeapons} key={`${weapon.shortName}`}></WeaponOptions>)}
        </div>
    )
};

interface WeaponOptionsProps {
    weapon: Weapon;
    update: () => void;
}

const WeaponOptions: React.FC<WeaponOptionsProps> = (props) => {
    const {weapon, update} = props;

    const unlock = () => {
        weapon.unlock();
        update();
    };
    const lock = () => {
        weapon.lock()
        update();
    };
    return (<div className={classnames(style.weapon, {[style.canBeLocked]: weapon.canBeLocked, [style.isLocked]: !weapon.isUnlocked})} onClick={!weapon.isUnlocked ? unlock : () => {}}>
        <div className={style.weaponHeader} onClick={weapon.isUnlocked ? lock : () => {}}>
            <div className={style.weaponName}>{weapon.isUnlocked ? weapon.name : '[Locked]'}</div>
            <div className={style.weaponTitle}>{weapon.isUnlocked ? `The ${weapon.title}` : 'You have not yet unlocked this weapon'}</div>
        </div>
        <div>{weapon.aspects.map((aspect, index) => <WeaponAspectOptions aspect={aspect} weapon={weapon} update={update} key={`${weapon.shortName}Aspect${index}`}></WeaponAspectOptions>)}</div>
    </div>);
};

interface WeaponAspectOptionsProps {
    aspect: WeaponAspect;
    weapon: Weapon;
    update: () => void;
}

const WeaponAspectOptions: React.FC<WeaponAspectOptionsProps> = (props) => {
    const {aspect, weapon, update} = props;

    const isHiddenAndLocked = () => !weapon.isUnlocked || !aspect.isUnlocked && aspect.isHidden;
    const levelText = (aspect: WeaponAspect, weapon: Weapon) => {
        const level = aspect.level;
        const levelText = `Lv.${level.value}`;

        if (!weapon.isUnlocked) {
            return '';
        }

        if (level.isMaxLevel()) {
            return 'MAX';
        }
        else if (aspect.isUnlocked) {
            return levelText;
        }
        else {
            return '';
        }
    }

    return (
        <div className={classnames(style.aspect, {[style.aspectLocked]: !weapon.isUnlocked || !aspect.isUnlocked})}>
            <div className={style.aspectFrame}>
                <img className={style.aspectIcon} src={!isHiddenAndLocked() ? aspect.icon : unknownIcon} />
            </div>
            <div className={style.aspectRight}>
                <div className={style.aspectName}>{`Aspect of ${!isHiddenAndLocked() ? aspect.name : '  ?  ?  ?'}`}</div>
                <div className={style.aspectLevel}>
                    <div className={style.aspectLevelText}>{ levelText(aspect, weapon) }</div>
                    <div className={style.aspectLevelButtons}>
                        <LevelControlButtons level={aspect.level} className={aspectButton} disabled={!weapon.isUnlocked} onLevelChange={update} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeaponsDisplay;