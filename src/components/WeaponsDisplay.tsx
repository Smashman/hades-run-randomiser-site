import * as React from 'react';
import { Weapon, WeaponAspect } from '../weapons';
import { DataContext } from '../data';
import style from '../scss/weapons.scss';
import LevelControl from './LevelControl';

const WeaponsDisplay: React.FC = () => {
    const [data, setData] = React.useContext(DataContext);
    const {weapons} = data;
    React.useEffect(() => {console.log('weapons')});

    const updateWeapons = () => setData((state) => ({...state, weapons}));
    
    const unlockWeapon = (weapon: Weapon) => {
        return () => {
            weapon.unlock();
            updateWeapons()
        }
    }

    return (
        <div className={style.weapons}>
            {weapons.items.map((weapon) => <WeaponOptions weapon={weapon} unlock={unlockWeapon(weapon)} update={updateWeapons}></WeaponOptions>)}
        </div>
    )
};

interface WeaponOptionsProps {
    weapon: Weapon;
    unlock: () => void;
    update: () => void;
}

const WeaponOptions: React.FC<WeaponOptionsProps> = (props) => {
    const {weapon, unlock, update} = props;
    if (!weapon.isUnlocked) {
        return (<div className={style.weapon} onClick={unlock}>LOCKED</div>)
    }
    return (<div className={style.weapon}>
        <div className={style.weaponName}>{weapon.name}</div>
        <div className={style.weaponTitle}>{`The ${weapon.title}`}</div>
        <div>{weapon.aspects.map(weaponAspect => <WeaponAspectOptions weaponAspect={weaponAspect} update={update}></WeaponAspectOptions>)}</div>
    </div>);
};

interface WeaponAspectOptionsProps {
    weaponAspect: WeaponAspect;
    update: () => void;
}

const WeaponAspectOptions: React.FC<WeaponAspectOptionsProps> = (props) => {
    const {weaponAspect, update} = props;

    const unlock = () => {
        weaponAspect.unlock();
        update();
    };

    if (weaponAspect.isUnlocked) {
        return (
            <div className={style.aspect}>
                <div className={style.aspectName}>{weaponAspect.name}</div>
                <LevelControl level={weaponAspect.level} onLevelChange={update}></LevelControl>
            </div>
        );
    }
    else {
        return (
            <div className={style.aspect} onClick={unlock}>
                { weaponAspect.isHidden ? 'HIDDEN' : 'LOCKED' }
            </div>
        )
    }
};

export default WeaponsDisplay;