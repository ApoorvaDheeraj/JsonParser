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
exports.LangController = exports.LangModel = exports.LANGUAGE_TYPE = void 0;
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
class LangModel {
    constructor(ch, en, vi, th, pt, fr, es, ja, ko) {
        this.zh_CN = ch;
        this.en_US = en;
        this.vi_VN = vi;
        this.th_PH = th;
        this.pt_BR = pt;
        this.fr_CA = fr;
        this.es_MX = es;
        this.ja_JP = ja;
        this.ko_KR = ko;
    }
}
exports.LangModel = LangModel;
class LangController {
    constructor() {
        this.mapOfMaps = new Map();
    }
    // Method to add a key-value pair to the inner map
    addToMap(key1, lang) {
        // Ensure that the outer map has the key1 entry
        if (!this.mapOfMaps.has(key1)) {
            this.mapOfMaps.set(key1, lang);
        }
    }
    // Method to get the value from the inner map
    getValueFromMap(key1, key2) {
        const innerMap = this.mapOfMaps.get(key1);
        return innerMap;
    }
    createMasterJsonFile() {
        const masterString = JSON.stringify(Object.fromEntries(this.mapOfMaps), null, 4);
        const fileName = "res/MasterLangJson.json";
        fs.writeFile(fileName, masterString, "utf-8", (error) => {
            if (error) {
                console.log("Error" + JSON.stringify(error));
            }
            else {
                console.log("Master Json File Write Successfully");
            }
        });
        // console.log(masterString);
    }
    writeKeysForJson(objArray, fileName) {
        const keyArrayStr = JSON.stringify(objArray, null, 4);
        fs.writeFile(fileName, keyArrayStr, "utf-8", (err) => {
            if (err) {
                console.error("Error writing to file:", err);
            }
            else {
                console.log(`Content has been written to ${fileName}`);
            }
        });
    }
}
exports.LangController = LangController;
//# sourceMappingURL=LanguaggeUtil.js.map