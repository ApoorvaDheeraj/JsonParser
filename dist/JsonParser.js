"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonParser = exports.LANGUAGE_TYPE = void 0;
const console_1 = require("console");
const fs = __importStar(require("fs"));
var LANGUAGE_TYPE;
(function (LANGUAGE_TYPE) {
    /** Hindi, Traditional Chinese - Chinese (S) */
    LANGUAGE_TYPE["zh_CN"] = "zh_CN";
    /** English (US) */
    LANGUAGE_TYPE["en_US"] = "en_US";
    /** Vietnamese */
    LANGUAGE_TYPE["vi_VN"] = "vi_VN";
    /** Thai (Thailand) */
    LANGUAGE_TYPE["th_PH"] = "th_PH";
    /** Arabic (Saudi Arabia) */
    LANGUAGE_TYPE["ar_SA"] = "ar_SA";
    /** Hindi (India) */
    LANGUAGE_TYPE["hi_IN"] = "hi_IN";
    /** Portuguese (Brazil) */
    LANGUAGE_TYPE["pt_BR"] = "pt_BR";
    /** French (Canada) */
    LANGUAGE_TYPE["fr_CA"] = "fr_CA";
    /** Spanish (Mexico) */
    LANGUAGE_TYPE["es_MX"] = "es_MX";
    /** Nihongo (Japan) */
    LANGUAGE_TYPE["ja_JP"] = "ja_JP";
    /** Korean */
    LANGUAGE_TYPE["ko_KR"] = "ko_KR";
})(LANGUAGE_TYPE || (exports.LANGUAGE_TYPE = LANGUAGE_TYPE = {}));
class JsonParser {
    constructor(fileName) {
        // Declration for Without String
        // private jsonData: Record<string, Record<string, string>>;
        this.resultMap = new Map();
        this.missingKeyArray = [];
        this.keysArray = [];
        this.LANG_FILE_PATH = "res/langFiles/";
        this.writeFileName = this.getFileName(fileName);
        this.fileName = fileName;
        this.readJsonFile();
        // Initilize map with Json String File
        this.createMap();
    }
    getFileName(localFileName) {
        switch (localFileName) {
            case "stringCH.json":
                return `${LANGUAGE_TYPE.zh_CN}.json`;
            case "stringEN.json":
                return `${LANGUAGE_TYPE.en_US}.json`;
            case "stringES.json":
                return `${LANGUAGE_TYPE.es_MX}.json`;
            case "stringFR.json":
                return `${LANGUAGE_TYPE.fr_CA}.json`;
            case "stringJP.json":
                return `${LANGUAGE_TYPE.ja_JP}.json`;
            case "stringKO.json":
                return `${LANGUAGE_TYPE.ko_KR}.json`;
            case "stringPT.json":
                return `${LANGUAGE_TYPE.pt_BR}.json`;
            case "stringTH.json":
                return `${LANGUAGE_TYPE.th_PH}.json`;
            case "stringVN.json":
                return `${LANGUAGE_TYPE.vi_VN}.json`;
        }
        return `LangCodeNotDefined.json`;
    }
    assignKeysForArray() {
        this.keysArray = Array.from(this.resultMap.keys());
    }
    getKeysArray() {
        return this.keysArray;
    }
    writeMapToFile() {
        const finalString = JSON.stringify(Object.fromEntries(this.resultMap), null, 4);
        const filePath = "res/formatted/" + this.writeFileName;
        fs.writeFile(filePath, finalString, "utf-8", (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            }
            else {
                console.log(`Content has been written to ${filePath}`);
            }
        });
    }
    readJsonFile() {
        const filePath = this.LANG_FILE_PATH + this.fileName;
        const data = fs.readFileSync(filePath, "utf8");
        this.jsonData = JSON.parse(data);
    }
    // Create and Write Map to File
    createMap() {
        if (!this.jsonData)
            console.log(`Unable to read Json Data for file ${this.fileName}`);
        (0, console_1.assert)(this.jsonData);
        this.resultMap = new Map();
        // Parser with { string { key: { -value : "value "}}};
        for (const stringKey in this.jsonData) {
            if (this.jsonData.hasOwnProperty(stringKey)) {
                const nestedJsonObject = this.jsonData[stringKey];
                for (const nestedKey in nestedJsonObject) {
                    if (nestedJsonObject.hasOwnProperty(nestedKey)) {
                        const valueObject = this.jsonData[stringKey][nestedKey];
                        for (const valueKey in valueObject) {
                            if (valueObject.hasOwnProperty(valueKey)) {
                                this.resultMap.set(nestedKey, valueObject[valueKey]);
                            }
                        }
                    }
                }
            }
        }
        // Parser with {  key: { -value : "value "}};
        //   for (const key in this.jsonData) {
        //     if (this.jsonData.hasOwnProperty(key)) {
        //       const innerObject = this.jsonData[key];
        //       for (const innerKey in innerObject) {
        //         if (innerObject.hasOwnProperty(innerKey)) {
        //           this.resultMap.set(key, innerObject[innerKey]);
        //         }
        //       }
        //     }
        //   }
        this.writeMapToFile();
        this.assignKeysForArray();
    }
    iterateCreatedMapForFile() {
        if (this.resultMap.size !== 0) {
            this.resultMap.forEach((value, key) => {
                console.log(`${key} : ${value}`);
            });
        }
        else {
            console.log(`Json Map for ${this.fileName} is Empty`);
        }
    }
    getResultMap() {
        return this.resultMap;
    }
    getValueForKey(key) {
        const value = this.resultMap.get(key);
        if (!value) {
            // add it to value not present for key => array
            this.missingKeyArray.push(key);
            return "";
        }
        return value;
    }
    missingKeyForLangFile() {
        const finalString = JSON.stringify(this.missingKeyArray, null, 4);
        const filePath = "res/missingKey/" + this.fileName;
        fs.writeFile(filePath, finalString, "utf-8", (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            }
            else {
                console.log(`Content has been written to ${filePath}`);
            }
        });
    }
    writeKeysForJson() {
        const keyArrayStr = JSON.stringify(this.keysArray, null, 4);
        const filePath = "res/keysJson/" + this.fileName;
        fs.writeFile(filePath, keyArrayStr, "utf-8", (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            }
            else {
                console.log(`Content has been written to ${filePath}`);
            }
        });
    }
}
exports.JsonParser = JsonParser;
//# sourceMappingURL=JsonParser.js.map