"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsonParser_1 = require("./JsonParser");
const LanguaggeUtil_1 = require("./LanguaggeUtil");
const langFileArray = ["stringCH.json", "stringEN.json", "stringVN.json", "stringTH.json", "stringPT.json", "stringFR.json", "stringES.json", "stringJP.json", "stringKO.json"];
// Create an instance of the JsonParser
let jsonParser;
// Example usage:
const langInstanch = new LanguaggeUtil_1.LangController();
langFileArray.forEach(function (value) {
    jsonParser = new JsonParser_1.JsonParser(value);
    // Adding values to the map of maps
    for (const keyValue of jsonParser.getResultMap().keys()) {
        // console.log(`Value for ${keyValue} = ${jsonParser.getResultMap().get(keyValue)}`);
        const value = jsonParser.getResultMap().get(keyValue) !== undefined ? jsonParser.getResultMap().get(keyValue) : "";
        langInstanch.addToMap(keyValue, new LanguaggeUtil_1.LangModel(value));
    }
    jsonParser.getResultMap().forEach((value, key) => {
        // langInstanch.addToMap(key, new LangModel(value, "" , ""));
    });
});
langInstanch.writeJsonToFile();
//# sourceMappingURL=JsonController.js.map