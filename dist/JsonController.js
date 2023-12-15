"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
const JsonParser_1 = require("./JsonParser");
const LanguaggeUtil_1 = require("./LanguaggeUtil");
const langFileArray = ["stringCH.json", "stringVN.json", "stringTH.json", "stringPT.json", "stringFR.json", "stringES.json", "stringJP.json", "stringKO.json"];
const countryCode = ["ch", "vn", "th", "pt", "fr", "es", "jp", "ko"];
let jsonParserRecord = new Map();
// Create EN instance of the JsonParser
const enJsonParser = new JsonParser_1.JsonParser("stringEN.json");
jsonParserRecord.set("en", enJsonParser);
const enKeyItr = enJsonParser.getResultMap().keys();
const langInstanch = new LanguaggeUtil_1.LangController();
// Fill JsonParser Object with key value pair
let fileArrayIndex = 0;
countryCode.forEach(function (value) {
    jsonParserRecord.set(value, new JsonParser_1.JsonParser(langFileArray.at(fileArrayIndex)));
    fileArrayIndex++;
});
for (const keyValue of enKeyItr) {
    // console.log(`Value for ${keyValue} = ${jsonParser.getResultMap().get(keyValue)}`);
    const enValueForKey = (_a = jsonParserRecord.get("en")) === null || _a === void 0 ? void 0 : _a.getValueForKey(keyValue);
    const zhValueForKey = (_b = jsonParserRecord.get("ch")) === null || _b === void 0 ? void 0 : _b.getValueForKey(keyValue);
    const vnValueForKey = (_c = jsonParserRecord.get("vn")) === null || _c === void 0 ? void 0 : _c.getValueForKey(keyValue);
    const thValueForKey = (_d = jsonParserRecord.get("th")) === null || _d === void 0 ? void 0 : _d.getValueForKey(keyValue);
    const ptValueForKey = (_e = jsonParserRecord.get("pt")) === null || _e === void 0 ? void 0 : _e.getValueForKey(keyValue);
    const frValueForKey = (_f = jsonParserRecord.get("fr")) === null || _f === void 0 ? void 0 : _f.getValueForKey(keyValue);
    const esValueForKey = (_g = jsonParserRecord.get("es")) === null || _g === void 0 ? void 0 : _g.getValueForKey(keyValue);
    const jpValueForKey = (_h = jsonParserRecord.get("jp")) === null || _h === void 0 ? void 0 : _h.getValueForKey(keyValue);
    const koValueForKey = (_j = jsonParserRecord.get("ko")) === null || _j === void 0 ? void 0 : _j.getValueForKey(keyValue);
    // console.log(
    //   `Value for Key ${keyValue} = ${enValueForKey}, ${zhValueForKey}, ${vnValueForKey},${thValueForKey},${ptValueForKey},${frValueForKey},${esValueForKey},${jpValueForKey},${koValueForKey},`
    // );
    langInstanch.addToMap(keyValue, new LanguaggeUtil_1.LangModel(zhValueForKey, enValueForKey, vnValueForKey, thValueForKey, ptValueForKey, frValueForKey, esValueForKey, jpValueForKey, koValueForKey));
}
langInstanch.createMasterJsonFile();
// Fill JsonParser Object with key value pair
let missingArrayIndex = 0;
countryCode.forEach(function (value) {
    var _a;
    (_a = jsonParserRecord.get(value)) === null || _a === void 0 ? void 0 : _a.missingKeyForLangFile();
    fileArrayIndex++;
});
// enJsonParser.getResultMap().forEach((value: string, key: string) => {
//   // langInstanch.addToMap(key, new LangModel(value, "" , ""));
// });
//# sourceMappingURL=JsonController.js.map