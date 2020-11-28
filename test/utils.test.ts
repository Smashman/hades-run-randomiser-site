import { fillArray, getRandomItemFromArray, Item, ItemList, Level, Resource } from '../src/utils';

describe('getRandomItemFromArray', () => {
    const array = [1, 2, 3, 4, 5];

    it('should call Math.random', () => {
        const Mathrandom = jest.spyOn(global.Math, 'random');

        getRandomItemFromArray(array);

        expect(Mathrandom).toBeCalled();
    });

    it('should get the expected value when Math.random is mocked', () => {
        jest.spyOn(global.Math, 'random').mockReturnValue(0.5);

        const randomValue = getRandomItemFromArray(array);
        expect(randomValue).toBe(3);

        jest.spyOn(global.Math, 'random').mockRestore();
    });
});

describe('fillArray', () => {
    it('should return expected array', () => {
        const expectedArray = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

        const filledArray = fillArray(10, 2);

        expect(filledArray).toStrictEqual(expectedArray);
    })
});

describe('Item and ItemList classes', () => {
    class TestItem extends Item {};

    class TestItemList extends ItemList<TestItem>{};

    describe('Item', () => {
        it('should create the expected Item class', () => {
            const item = new TestItem();

            expect(item).toMatchSnapshot();
        });

        it('should return true for isUnlocked after unlock is called', () => {
            const item = new TestItem();

            item.unlock();    
            expect(item.isUnlocked).toBe(true);
        });

        it('should return false for isUnlocked after lock is called', () => {
            const item = new TestItem();

            item.unlock();    
            expect(item.isUnlocked).toBe(true);

            item.lock();    
            expect(item.isUnlocked).toBe(false);
        });

        describe('toStorableData', () => {
            it('should return expected storable data', () => {
                const item = new TestItem();
        
                expect(item.toStorableData()).toMatchSnapshot();
            });

            it('should return expected storable data when unlocked', () => {
                const item = new TestItem();
                item.unlock();
        
                expect(item.toStorableData()).toMatchSnapshot();
            });
        });

        describe('fromStoredData', () => {
            it('should return expected Item instance after loading from stored data', () => {
                const item = new TestItem();
                item.fromStoredData({
                    isUnlocked: true,
                });

                expect(item).toMatchSnapshot();
            });
        });
    });

    describe('ItemList', () => {
        it('should create expected ItemList class instance', () => {
            const itemList = new TestItemList();

            expect(itemList).toMatchSnapshot();
            expect(itemList.items).toHaveLength(0);
        });

        it('should add item to list', () => {
            const item1 = new TestItem();
            const itemList = new TestItemList().addItem(item1);
            
            expect(itemList.items).toContain(item1);
            expect(itemList.items).toHaveLength(1);
        });

        it('should add items to list', () => {
            const item1 = new TestItem();
            const item2 = new TestItem();
            const itemList = new TestItemList().addItems([item1, item2]);
            
            expect(itemList.items).toContain(item1);
            expect(itemList.items).toContain(item2);
            expect(itemList.items).toHaveLength(2);
        });

        it('should set isUnlocked to true in all items in list when unlockAll is called', () => {
            const item1 = new TestItem();
            const item2 = new TestItem();
            const itemList = new TestItemList().addItems([item1, item2]);
            
            expect(item1.isUnlocked).toBe(false);
            expect(item2.isUnlocked).toBe(false);

            itemList.unlockAll();
            
            expect(item1.isUnlocked).toBe(true);
            expect(item2.isUnlocked).toBe(true);
        });

        it('should return only unlocked items with unlocked', () => {
            const item1 = new TestItem();
            const item2 = new TestItem();
            const item3 = new TestItem();
            const itemList = new TestItemList().addItems([item1, item2, item3]);

            expect(itemList.unlocked).toStrictEqual([]);

            item2.unlock();

            expect(itemList.unlocked).toStrictEqual([item2]);
        });

        describe('getRandom', () => {
            let Mathrandom: jest.SpyInstance;

            let item1: TestItem;
            let item2: TestItem;
            let item3: TestItem;
            let itemList: TestItemList;

            beforeEach(() => {
                Mathrandom = jest.spyOn(global.Math, 'random').mockReturnValue(0.5);;

                item1 = new TestItem(),
                item2 = new TestItem(),
                item3 = new TestItem(),
                itemList = new TestItemList().addItems([item1, item2, item3]);
            });

            it('should return null if no items are unlocked', () => {
                const randomItem = itemList.getRandom();
    
                expect(randomItem).toBe(null);
            });

            it('should return expected value', () => {
                itemList.unlockAll();
                const randomItem = itemList.getRandom();
    
                expect(randomItem).toBe(item2);
            });
        });

        describe('toStorableData', () => {
            it('should return expected storable data', () => {
                const item1 = new TestItem();
                const item2 = new TestItem();
                const itemList = new TestItemList().addItems([item1, item2]);
        
                expect(itemList.toStorableData()).toMatchSnapshot();
            });

            it('should return expected storable data when unlocked', () => {
                const item1 = new TestItem();
                const item2 = new TestItem();
                const itemList = new TestItemList().addItems([item1, item2]);
                item1.unlock();
        
                expect(itemList.toStorableData()).toMatchSnapshot();
            });
        });

        describe('fromStoredData', () => {
            it('should return expected Item instance after loading from stored data', () => {
                const item1 = new TestItem();
                const item2 = new TestItem();
                const itemList = new TestItemList().addItems([item1, item2]);
                itemList.fromStoredData({
                    items: [
                        {isUnlocked: true},
                        {isUnlocked: false},
                    ],
                });

                expect(itemList).toMatchSnapshot();
            });
        });
    });
});

describe('Level', () => {
    it('should create expected Level class instance', () => {
        const level = new Level(1, 1, 3);

        expect(level).toMatchSnapshot();
    });

    it('should get level', () => {
        const level = new Level(1, 1, 3);

        expect(level.value).toBe(1);
    });

    it('should set level', () => {
        const level = new Level(1, 1, 3);

        expect(level.value).toBe(1);

        level.value = 2;
        
        expect(level.value).toBe(2);
    });

    it('should set level to max if number set higher than max', () => {
        const level = new Level(1, 1, 3);

        level.value = 5;
        
        expect(level.value).toBe(3);
    });

    it('should set level to min if number set lower than min', () => {
        const level = new Level(1, 1, 3);

        level.value = 0;
        
        expect(level.value).toBe(1);
    });

    it('should return true for isMinLevel if level is min', () => {
        const level = new Level(1, 1, 3);

        expect(level.isMinLevel()).toBe(true);
    });

    it('should return false for isMinLevel if level is not min', () => {
        const level = new Level(3, 1, 3);

        expect(level.isMinLevel()).toBe(false);
    });

    it('should return false for isMinLevel if level is not max', () => {
        const level = new Level(1, 1, 3);

        expect(level.isMaxLevel()).toBe(false);
    });

    it('should return true for isMaxLevel if level is max', () => {
        const level = new Level(3, 1, 3);

        expect(level.isMaxLevel()).toBe(true);
    });

    it('should add value as expected when calling addValue', () => {
        const level = new Level(1, 1, 3);

        level.addValue(2);

        expect(level.value).toBe(3);
    });

    it('should be incremented as expected when calling increment', () => {
        const level = new Level(1, 1, 4);

        level.increment();

        expect(level.value).toBe(2);
    });

    it('should be decremented as expected when calling decrement', () => {
        const level = new Level(4, 1, 4);

        level.decrement();

        expect(level.value).toBe(3);
    });

    it('should call onChange with level value changed to', () => {
        const onChangeSpy = jest.fn();

        const level = new Level(1, 1, 4, onChangeSpy);

        level.value = 2;

        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(onChangeSpy).toHaveBeenCalledWith(2);
    });

    it('should not call onChange if level value has not changed', () => {
        const onChangeSpy = jest.fn();

        const level = new Level(1, 1, 4, onChangeSpy);

        level.value = 1;

        expect(onChangeSpy).toHaveBeenCalledTimes(0);
    });
});

describe('Resource', () => {
    let level: Level;
    beforeEach(() => {
        level = new Level(0, 0, 5);
    });

    it('should create expected Resource class instance', () => {
        const resource = new Resource([1, 1, 1, 1, 1], level);

        expect(resource).toMatchSnapshot();
    });

    it('should create expected Resource class instance with name', () => {
        const resource = new Resource([1, 1, 1, 1, 1], level, 'blood');

        expect(resource).toMatchSnapshot();
    });

    it('should calculated expected resource total value', () => {
        const resource = new Resource([1, 1, 1, 1, 1], level, 'blood');

        expect(resource.total).toBe(5);
    });

    it('should return expected spent value when level is 0', () => {
        const resource = new Resource([1, 1, 1, 1, 1], level, 'blood');

        expect(resource.spent).toBe(0);
    });

    it('should return expected required value when level is 0', () => {
        const resource = new Resource([1, 1, 1, 1, 1], level, 'blood');

        expect(resource.required).toBe(5);
    });

    it('should return expected spent value when level is 2', () => {
        level.value = 2;
        const resource = new Resource([1, 1, 1, 1, 1], level, 'blood');

        expect(resource.spent).toBe(2);
    });

    it('should return expected required value when level is 2', () => {
        level.value = 2;
        const resource = new Resource([1, 1, 1, 1, 1], level, 'blood');

        expect(resource.required).toBe(3);
    });
})