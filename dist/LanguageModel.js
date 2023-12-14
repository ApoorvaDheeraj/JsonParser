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
exports.LangParser = exports.LangModel = void 0;
const fs = __importStar(require("fs"));
class LangModel {
    constructor(ch, en, th) {
        this.ch = ch;
        this.en = en;
        this.th = th;
    }
}
exports.LangModel = LangModel;
class LangParser {
    constructor() {
        this.mapOfMaps = new Map();
    }
    // Method to add a key-value pair to the inner map
    addToMap(key1, lang) {
        // Ensure that the outer map has the key1 entry
        if (!this.mapOfMaps.has(key1)) {
            this.mapOfMaps.set(key1, lang);
        }
        // Get the inner map associated with key1
        const innerMap = this.mapOfMaps.get(key1);
        // Add the key-value pair to the inner map
        //   if (innerMap) {
        //     innerMap.set(key2, value);
        //   }
    }
    // Method to get the value from the inner map
    getValueFromMap(key1, key2) {
        const innerMap = this.mapOfMaps.get(key1);
        return innerMap;
    }
    writeJsonForFile() {
        const masterString = JSON.stringify(Object.fromEntries(this.mapOfMaps), null, 4);
        const fileName = "res/sample.json";
        fs.writeFile(fileName, masterString, 'utf-8', (error) => {
            if (error) {
                console.log("Error" + JSON.stringify(error));
            }
            else {
                console.log("File Write Successfully");
            }
        });
        console.log(masterString);
    }
}
exports.LangParser = LangParser;
//# sourceMappingURL=LanguageModel.js.map