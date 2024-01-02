"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTTParser = void 0;
class MTTParser {
    constructor() {
        this.nestedKey = {};
        this.countryArray = [
            "th",
            "sc",
            "tc",
            "vn",
            "en",
            "hi",
            "es",
            "fr",
            "pt",
            "ru",
            "ja",
            "ko",
        ];
    }
    // Use Recursion and iterate
    loopTranslationJson(obj) {
        for (let key in obj) {
            if (typeof obj[key] === "object") {
                if (Array.isArray(obj[key])) {
                    // loop through array
                    for (let i = 0; i < obj[key].length; i++) {
                        this.loopTranslationJson(obj[key][i]);
                    }
                }
                else {
                    // call function recursively
                    this.loopTranslationJson(obj[key]);
                }
            }
            else {
                console.log(key + ": " + obj[key]);
            }
        }
    }
    flattenObject(obj, parentKey = "") {
        let result = {};
        for (const key in obj) {
            if (this.countryArray.includes(key)) {
                if (this.isNested(obj)) {
                    const newKey = parentKey ? `${parentKey}.${key}` : key;
                    if (typeof obj[key] === "object" && obj !== null) {
                        const flattened = this.flattenObject(obj[key], newKey);
                        result = Object.assign(Object.assign({}, result), flattened);
                    }
                    else {
                        result[parentKey] = this.getSingleJSONObj(obj);
                        // this.nestedKey[parentKey] = this.getSingleJSONObj(obj);
                    }
                }
                else {
                    result[parentKey] = obj;
                }
                continue;
            }
            const newKey = parentKey ? `${parentKey}.${key}` : key;
            if (typeof obj[key] === "object" && obj !== null) {
                const flattened = this.flattenObject(obj[key], newKey);
                result = Object.assign(Object.assign({}, result), flattened);
            }
        }
        return result;
    }
    isNested(obj) {
        const isNested = Object.keys(obj).some(function (key) {
            return obj[key] && typeof obj[key] === "object";
        });
        return isNested;
    }
    getSingleJSONObj(obj) {
        let list = {};
        for (const key in obj) {
            if (typeof obj[key] !== "object" && obj[key] !== null) {
                list[key] = (obj[key]);
            }
        }
        return list;
    }
}
exports.MTTParser = MTTParser;
//# sourceMappingURL=MTTParser.js.map