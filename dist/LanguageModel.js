"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseJson = exports.LangParentKey = void 0;
class LangParentKey {
    constructor(th, vn, en, ch) {
        this.th = th;
        this.vn = vn, this.en = en, this.ch = ch;
    }
}
exports.LangParentKey = LangParentKey;
class ParseJson extends LangParentKey {
    constructor(langObj) {
        super(langObj.th, langObj.ch, langObj.en, langObj.vn);
    }
    printObject() {
        console.log(JSON.stringify(this));
    }
}
exports.ParseJson = ParseJson;
//# sourceMappingURL=LanguageModel.js.map