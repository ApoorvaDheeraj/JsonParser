"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
Object.defineProperty(exports, "__esModule", { value: true });
const JsonParser_1 = require("./JsonParser");
const LangData_1 = require("./LangData");
const LanguaggeUtil_1 = require("./LanguaggeUtil");
const MTTParser_1 = require("./MTTParser");
const langFileArray = ["stringCH.json", "stringVN.json", "stringTH.json", "stringPT.json", "stringFR.json", "stringES.json", "stringJP.json", "stringKO.json"];
const countryCode = ["ch", "vn", "th", "pt", "fr", "es", "jp", "ko"];
let jsonParserRecord = new Map();
// Create EN instance of the JsonParser
const enJsonParser = new JsonParser_1.JsonParser("stringEN.json");
jsonParserRecord.set("en", enJsonParser);
const enKeyItr = enJsonParser.getResultMap().keys();
enJsonParser.writeKeysForJson();
const langInstanch = new LanguaggeUtil_1.LangController();
// Fill JsonParser Object with key value pair
let fileArrayIndex = 0;
countryCode.forEach(function (value) {
    const jsonParserObj = new JsonParser_1.JsonParser(langFileArray.at(fileArrayIndex));
    jsonParserRecord.set(value, jsonParserObj);
    fileArrayIndex++;
    // jsonParserObj.writeKeysForJson();
});
// let missing = a1.filter(item => a2.indexOf(item) < 0);
// console.log(missing);
// let missingKey = enJsonParser.getKeysArray().filter(value => (jsonParserRecord.get("es")?.getKeysArray().indexOf(value)!) < 0)
let missingKey = (_a = jsonParserRecord.get("vn")) === null || _a === void 0 ? void 0 : _a.getKeysArray().filter(value => (enJsonParser.getKeysArray().indexOf(value)) < 0);
console.log(JSON.stringify(missingKey, null, 4));
for (const keyValue of enKeyItr) {
    // console.log(`Value for ${keyValue} = ${jsonParser.getResultMap().get(keyValue)}`);
    const enValueForKey = (_b = jsonParserRecord.get("en")) === null || _b === void 0 ? void 0 : _b.getValueForKey(keyValue);
    const zhValueForKey = (_c = jsonParserRecord.get("ch")) === null || _c === void 0 ? void 0 : _c.getValueForKey(keyValue);
    const vnValueForKey = (_d = jsonParserRecord.get("vn")) === null || _d === void 0 ? void 0 : _d.getValueForKey(keyValue);
    const thValueForKey = (_e = jsonParserRecord.get("th")) === null || _e === void 0 ? void 0 : _e.getValueForKey(keyValue);
    const ptValueForKey = (_f = jsonParserRecord.get("pt")) === null || _f === void 0 ? void 0 : _f.getValueForKey(keyValue);
    const frValueForKey = (_g = jsonParserRecord.get("fr")) === null || _g === void 0 ? void 0 : _g.getValueForKey(keyValue);
    const esValueForKey = (_h = jsonParserRecord.get("es")) === null || _h === void 0 ? void 0 : _h.getValueForKey(keyValue);
    const jpValueForKey = (_j = jsonParserRecord.get("jp")) === null || _j === void 0 ? void 0 : _j.getValueForKey(keyValue);
    const koValueForKey = (_k = jsonParserRecord.get("ko")) === null || _k === void 0 ? void 0 : _k.getValueForKey(keyValue);
    // console.log(
    //   `Value for Key ${keyValue} = ${enValueForKey}, ${zhValueForKey}, ${vnValueForKey},${thValueForKey},${ptValueForKey},${frValueForKey},${esValueForKey},${jpValueForKey},${koValueForKey},`
    // );
    // langInstanch.addToMap(keyValue, new LangModel(zhValueForKey,enValueForKey,vnValueForKey,thValueForKey,ptValueForKey,frValueForKey,esValueForKey,jpValueForKey,koValueForKey));
}
// langInstanch.createMasterJsonFile();
// Fill JsonParser Object with key value pair
countryCode.forEach(function (value) {
    // jsonParserRecord.get(value)?.missingKeyForLangFile();
    fileArrayIndex++;
});
const mttParserObj = new MTTParser_1.MTTParser();
mttParserObj.loopTranslationJson(LangData_1.Translation);
//# sourceMappingURL=JsonController.js.map