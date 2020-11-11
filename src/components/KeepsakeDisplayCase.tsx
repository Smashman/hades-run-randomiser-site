import * as React from 'react';
import { Keepsake } from '../keepsakes';
import style from '../scss/keepsakes.scss';
import { DataContext } from '../data';
import LevelControl from './LevelControl';
import classnames from 'classnames';

const KeepsakeDisplayCase: React.FC = () => {
    const [data, setData] = React.useContext(DataContext);
    const {keepsakes} = data;
    React.useEffect(() => console.log('keepsake'));

    const updateKeepsakes = () => setData((state) => ({...state, keepsakes}));
    
    const unlockKeepsake = (keepsake: Keepsake) => {
        return () => {
            keepsake.unlock();
            updateKeepsakes()
        }
    }
    
    const lockKeepsake = (keepsake: Keepsake) => {
        return () => {
            keepsake.lock();
            updateKeepsakes()
        }
    }

    const levelChange = () => {
        return () => {
            updateKeepsakes();
        }
    }
    
    function* createRows<T>(arr: Array<T>, n: number) {
        for (let i = 0; i < arr.length; i += n) {
            const slice = arr.slice(i, i + n);
            yield [...slice, ...Array(n-slice.length)];
        }
    }

    const keepsakesByRow = [...createRows(keepsakes.items, 10)];

    return (<table className={style.displayCase}>
        <tbody>
        {
            keepsakesByRow.map((row, rowIndex) => {
                return (<tr key={`row${rowIndex}`}>
                    {
                        row.map((keepsake, itemIndex) => {
                            const key = `cubby${rowIndex}${itemIndex}`;
                            return keepsake ? <KeepsakeCubby keepsake={keepsake} unlock={unlockKeepsake(keepsake)} lock={lockKeepsake(keepsake)} onLevelChange={levelChange()} key={key}></KeepsakeCubby> : <td key={key}><div className={style.keepsakeCubby}></div></td>;
                        })
                    }
                </tr>);
            })
        }
        </tbody>
    </table>);
};

interface KeepsakeProps {
    keepsake: Keepsake;
    unlock: () => void;
    lock: () => void;
    onLevelChange: () => void;
}

const KeepsakeCubby: React.FC<KeepsakeProps> = ({keepsake, unlock, lock, onLevelChange}) => {
    const nameWithBreak = (name: string): JSX.Element | string => {
        const splitName = name.split(' ');
        return splitName.length === 2 ? <React.Fragment>{splitName[0]}<br/>{splitName[1]}</React.Fragment> : name;
    }
    const imagePath = (name: string) => name.replace(/[ -]/g, '_').toLowerCase();
    return (
        <td>
            <div className={classnames(style.keepsakeCubby, {[style.locked]: !keepsake.isUnlocked, [style.hidden]: keepsake.isHidden && !keepsake.isUnlocked})} onClick={!keepsake.isUnlocked ? unlock : () => {}}>
                <div className={style.keepsakeName}>{keepsake.isUnlocked ? nameWithBreak(keepsake.name) : keepsake.isHidden ? '[Hidden]' : '[Locked]'}</div>
                <div className={style.keepsakeBacking} onClick={keepsake.isUnlocked ? lock : () => {}}>
                    <img className={style.keepsakeIcon} src={`public/img/keepsake/${keepsake.isUnlocked ? imagePath(keepsake.name) : 'missing_keepsake'}.png`}/>
                </div>
                <LevelControl level={keepsake.level} onLevelChange={onLevelChange} disabled={!keepsake.isUnlocked}/>
            </div>
        </td>
    );
}

export default KeepsakeDisplayCase;