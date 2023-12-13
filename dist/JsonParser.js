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
exports.JsonParser = void 0;
const fs = __importStar(require("fs"));
class JsonParser {
    constructor(jsonString) {
        // Declration for Without String 
        // private jsonData: Record<string, Record<string, string>>;
        this.resultMap = new Map();
        this.jsonData = JSON.parse(jsonString);
    }
    createMap() {
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
    }
    writeMapToFile() {
        this.createMap();
        // this.resultMap.forEach((value, key) => {
        //     console.log(`${key} : ${value}`);
        //   });
        const finalString = JSON.stringify(Object.fromEntries(this.resultMap), null, 4);
        const filePath = "res/master.json";
        fs.writeFile(filePath, finalString, 'utf-8', (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            }
            else {
                console.log(`Content has been written to ${filePath}`);
            }
        });
    }
}
exports.JsonParser = JsonParser;
//# sourceMappingURL=JsonParser.js.map