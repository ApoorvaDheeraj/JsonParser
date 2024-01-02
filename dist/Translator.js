"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translate = void 0;
const LangData_1 = require("./LangData");
let LANGUAGE = 'en';
function Translate(key) {
    if (typeof key == 'string') {
        const keys = key.split('.');
        let res = LangData_1.Translation;
        try {
            keys.forEach(k => {
                res = res[k];
            });
            let result = res[LANGUAGE];
            return result ? result : "";
        }
        catch (e) {
            return key;
        }
    }
    else {
        let result = key[LANGUAGE];
        return result ? result : "";
    }
}
exports.Translate = Translate;
//# sourceMappingURL=Translator.js.map