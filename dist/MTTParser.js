"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MTTParser = void 0;
class MTTParser {
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
}
exports.MTTParser = MTTParser;
//# sourceMappingURL=MTTParser.js.map