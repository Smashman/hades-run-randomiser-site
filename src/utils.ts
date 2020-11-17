export const getRandomItemFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];
export const fillArray = <T>(length: number, fillValue: T) => Array.from<T>({length: length}).fill(fillValue);

export interface Options {
    enabled?: boolean;
}

export interface StorableItemData {
    isUnlocked: boolean;
}

export abstract class Item {
    isUnlocked: boolean = false;

    unlock() {
        this.isUnlocked = true;
    }

    lock() {
        this.isUnlocked = false;
    }

    toStorableData(): StorableItemData {
        return {
            isUnlocked: this.isUnlocked
        };
    }

    fromStoredData(storedData: StorableItemData) {
        this.isUnlocked = storedData.isUnlocked;
    }
}

export interface StorableItemListData<T extends StorableItemData> {
    items: T[];
}

export abstract class ItemList<T extends Item> {
    items: T[] = [];

    addItem(item: T) {
        this.items = [...this.items, item];
        return this;
    }

    addItems(items: T[]) {
        items.forEach(item => this.addItem(item));
        return this;
    }

    get unlocked() {
        return this.items.filter(item => item.isUnlocked);
    }
 
    unlockAll() {
        this.items.forEach(item => item.unlock());
    }

    getRandom(): T {
        return getRandomItemFromArray(this.unlocked) ?? null;
    }

    toStorableData(): StorableItemListData<StorableItemData> {
        return { items: this.items.map(item => item.toStorableData()) };
    }

    fromStoredData(storedData: StorableItemListData<StorableItemData>) {
        storedData.items.map((data, index) => {
            this.items[index].fromStoredData(data);
        });
    }
}

export class Level {
    constructor(protected _value: number, readonly min: number, readonly max: number, readonly onChange?: (level: number) => void) {}

    set value(setTo: number) {
        const previousValue = this._value;
        if (setTo >= this.max) {
            this._value = this.max;
        }
        else if (setTo <= this.min) {
            this._value = this.min;
        }
        else {
            this._value = setTo;
        }
        if (this.onChange && previousValue !== this._value) {
            this.onChange(this._value);
        }
    }

    get value() {
        return this._value;
    }

    isMinLevel(): boolean {
        return this.value <= this.min;
    }

    isMaxLevel(): boolean {
        return this.value >= this.max;
    }

    setMaxLevel(): void {
        this.value = this.max;
    }

    addValue(change: number): number {
        this.value = this.value + change;
        return this.value;
    }

    increment(): number {
        return this.addValue(1);
    }

    decrement(): number {
        return this.addValue(-1);
    }
}