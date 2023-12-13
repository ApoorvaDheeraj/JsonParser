// 模拟一个TS版的HashMap(由于是泛型实现, 这里的HashMap<K,V>中的K和V可以是任意强类型)

/* 使用示例
let hashmap: HashMap<string, number> = new HashMap();
hashmap.add("test", 123);
console.log(hashmap.get("test"));
hashmap.remove("test");

// 遍历方法1
hashmap.forEachKeyValue((data: KeyValue<string, number>): any => {
    console.log("key = " + data.key + ", " + "value = " + data.value);
    //return "continue";
});

// 遍历方法2
hashmap.forEach((key: string, value: number): any => {
    console.log("key = " + key + ", " + "value = " + value);
    //return "break";
});
*/

export interface KeyValue<K, V> {
    key: K,
    value: V
}

/**
 * HashMap泛型实现
 */
export class HashMap<K, V> {

    private _list: KeyValue<K, V>[] = [];

    constructor() {
        this.clear();
    }

    //通过key获取索引
    private _getIndexByKey(key: K): number {
        let count: number = this._list.length;
        for (let index: number = 0; index < count; ++index) {
            const element: KeyValue<K, V> = this._list[index];
            if (element.key === key) {
                return index;
            }
        }
        return -1;
    }

    /**
     * 添加键值
     */
    public add(key: K, value: V, replace: boolean = true): void {
        let data: KeyValue<K, V> = { key: key, value: value };
        let index: number = this._getIndexByKey(key);
        if (index !== -1 && replace) {
            //已存在：刷新值
            this._list[index] = data;
        }
        else {
            //不存在：添加值
            this._list.push(data);
        }
    }

    /**
     * 删除键值
     */
    public remove(key: K): any {
        let index: number = this._getIndexByKey(key);
        if (index !== -1) {
            let data: KeyValue<K, V> = this._list[index];
            this._list.splice(index, 1);
            return data;
        }
        return null;
    }

    /**
     * 是否存在键
     */
    public has(key: K): boolean {
        let index: number = this._getIndexByKey(key);
        return index !== -1;
    }

    /**
     * 通过key获取键值value
     * @param key
     */
    public get(key: K): V {
        let index: number = this._getIndexByKey(key);
        if (index !== -1) {
            let data: KeyValue<K, V> = this._list[index];
            return data.value;
        }
        return null as any;
    }

    /**
     * 获取数据个数
     */
    public get length(): number {
        return this._list.length;
    }

    /**
     * 遍历列表, callback(data, index)
     */
    public forEachKeyValue(callback: (data: KeyValue<K, V>, i?: number) => any) {
        let count: number = this._list.length;
        for (let index: number = 0; index < count; ++index) {
            const element: KeyValue<K, V> = this._list[index];
            let ret = callback(element, index);
            if (ret === "continue") continue;
            else if (ret === "break") break;
        }
    }

    /**
     * 遍历列表, callback(k, v, index)
     */
    public forEach(callback: (key: K, value: V, i?: number) => any) {
        let count: number = this._list.length;
        for (let index: number = 0; index < count; ++index) {
            const element: KeyValue<K, V> = this._list[index];
            let ret = callback(element.key, element.value, index);
            if (ret === "continue") continue;
            else if (ret === "break") break;
        }
    }

    /**
     * 清空全部
     */
    public clear(): void {
        this._list = [];
    }
}