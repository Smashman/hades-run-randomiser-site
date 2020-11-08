import * as React from 'react';
import { Keepsake } from '../keepsakes';
import style from '../scss/keepsakes.scss';
import { DataContext } from '../data';
import LevelControl from './LevelControl';

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
                            return keepsake ? <KeepsakeCubby keepsake={keepsake} unlock={unlockKeepsake(keepsake)} onLevelChange={levelChange()} key={key}></KeepsakeCubby> : <td key={key}></td>;
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
    onLevelChange: () => void;
}

const KeepsakeCubby: React.FC<KeepsakeProps> = ({keepsake, unlock, onLevelChange}) => {
    return (
        <td onClick={unlock}>
            { 
            !keepsake.isUnlocked ?
                <div>{ !keepsake.isHidden ? 'LOCKED' : 'HIDDEN'}</div> :
                (<div>
                    <div className={style.keepsakeName}>{keepsake.name}</div>
                    <LevelControl level={keepsake.level} onLevelChange={onLevelChange}/>
                    {/* <div> */}
                        {/* <button onClick={decrease}>-</button>{Array.from({length:keepsake.level}, (v, i) => <span key={`star${i}`}>⭐</span>)}<button onClick={increase}>+</button> */}
                    {/* </div> */}
                </div>)
            }
        </td>
    );
}

export default KeepsakeDisplayCase;