import * as React from 'react';
import { Weapon, WeaponAspect } from '../weapons';
import { DataContext } from '../data';
import style, { weapon } from '../scss/weapons.scss';
import LevelControl from './LevelControl';
import classnames from 'classnames';
import { normaliseToImagePath } from '../utils';
import { imgPath, unknownIconPath } from '../paths';

const WeaponsDisplay: React.FC = () => {
    const [data, setData] = React.useContext(DataContext);
    const {weapons} = data;
    React.useEffect(() => {console.log('weapons')});

    const updateWeapons = () => setData((state) => ({...state, weapons}));
    
    const toggleLock = (weapon: Weapon) => {
        return () => {
            if (weapon.canBeLocked) {
                weapon.isUnlocked ? weapon.lock() : weapon.unlock();
                updateWeapons()
            }
        }
    }

    return (
        <div className={style.weapons}>
            {weapons.items.map((weapon, index) => <WeaponOptions weapon={weapon} toggleLock={toggleLock(weapon)} update={updateWeapons} key={`${weapon.shortName}`}></WeaponOptions>)}
        </div>
    )
};

interface WeaponOptionsProps {
    weapon: Weapon;
    toggleLock: () => void;
    update: () => void;
}

const WeaponOptions: React.FC<WeaponOptionsProps> = (props) => {
    const {weapon, toggleLock, update} = props;
    return (<div className={classnames(style.weapon, {[style.canBeLocked]: weapon.canBeLocked})}>
        <div className={style.weaponName} onClick={toggleLock}>{weapon.isUnlocked ? weapon.name : '[Locked]'}</div>
        <div className={style.weaponTitle}>{weapon.isUnlocked ? `The ${weapon.title}` : 'You have not yet unlocked this weapon'}</div>
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

    const unlock = () => {
        aspect.unlock();
        update();
    };

    const isHiddenAndLocked = () => !weapon.isUnlocked || aspect.isHidden && !aspect.isUnlocked;

    const iconPath = `${imgPath}/weapon/${weapon.shortName}/${normaliseToImagePath(aspect.name)}.png`;
    const hiddenIconPath = unknownIconPath;

    return (
        <div className={classnames(style.aspect, {[style.aspectLocked]: !weapon.isUnlocked || !aspect.isUnlocked})} onClick={unlock}>
            <div className={style.aspectFrame}>
                <img className={style.aspectIcon} src={!isHiddenAndLocked() ? iconPath : hiddenIconPath} />
            </div>
            <div className={style.aspectText}>
                <div className={style.aspectName}>{`Aspect of ${!isHiddenAndLocked() ? aspect.name : '  ?  ?  ?'}`}</div>
            </div>
            {/* <LevelControl level={aspect.level} onLevelChange={update}></LevelControl> */}
        </div>
    );
};

export default WeaponsDisplay;