export const getRandomItemFromArray = <T>(array: T[]) => array[Math.floor(Math.random() * array.length)];
export const fillArray = <T>(length: number, fillValue: T) => Array.from<T>({length: length}).fill(fillValue);

export interface Options {
    enabled?: boolean;
}

export abstract class Item {
    isUnlocked: boolean = false;

    unlock() {
        this.isUnlocked = true;
    }
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
}