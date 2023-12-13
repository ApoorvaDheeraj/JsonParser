"use strict";
// 模拟一个TS版的HashMap(由于是泛型实现, 这里的HashMap<K,V>中的K和V可以是任意强类型)
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashMap = void 0;
/**
 * HashMap泛型实现
 */
class HashMap {
    constructor() {
        this._list = [];
        this.clear();
    }
    //通过key获取索引
    _getIndexByKey(key) {
        let count = this._list.length;
        for (let index = 0; index < count; ++index) {
            const element = this._list[index];
            if (element.key === key) {
                return index;
            }
        }
        return -1;
    }
    /**
     * 添加键值
     */
    add(key, value, replace = true) {
        let data = { key: key, value: value };
        let index = this._getIndexByKey(key);
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
    remove(key) {
        let index = this._getIndexByKey(key);
        if (index !== -1) {
            let data = this._list[index];
            this._list.splice(index, 1);
            return data;
        }
        return null;
    }
    /**
     * 是否存在键
     */
    has(key) {
        let index = this._getIndexByKey(key);
        return index !== -1;
    }
    /**
     * 通过key获取键值value
     * @param key
     */
    get(key) {
        let index = this._getIndexByKey(key);
        if (index !== -1) {
            let data = this._list[index];
            return data.value;
        }
        return null;
    }
    /**
     * 获取数据个数
     */
    get length() {
        return this._list.length;
    }
    /**
     * 遍历列表, callback(data, index)
     */
    forEachKeyValue(callback) {
        let count = this._list.length;
        for (let index = 0; index < count; ++index) {
            const element = this._list[index];
            let ret = callback(element, index);
            if (ret === "continue")
                continue;
            else if (ret === "break")
                break;
        }
    }
    /**
     * 遍历列表, callback(k, v, index)
     */
    forEach(callback) {
        let count = this._list.length;
        for (let index = 0; index < count; ++index) {
            const element = this._list[index];
            let ret = callback(element.key, element.value, index);
            if (ret === "continue")
                continue;
            else if (ret === "break")
                break;
        }
    }
    /**
     * 清空全部
     */
    clear() {
        this._list = [];
    }
}
exports.HashMap = HashMap;
//# sourceMappingURL=HashMap.js.map