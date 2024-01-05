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
exports.MTTLocController = void 0;
const fs = __importStar(require("fs"));
class MTTLocController {
    static getInstance() {
        if (!MTTLocController.instance) {
            MTTLocController.instance = new MTTLocController();
        }
        return MTTLocController.instance;
    }
    constructor() {
        this.stringsTable = {};
    }
    getTranslatedString(key, language) {
        const stringObj = this.stringsTable[language];
        if (!stringObj) {
            return key;
        }
        const valueObj = stringObj[key];
        if (Array.isArray(valueObj)) {
            return valueObj.join("");
        }
        else {
            return valueObj;
        }
    }
    loadLocStringsFromResources(lang) {
        // const filePath = deps.getDeps().languageData[lang].i18nPath;
        // cc.resources.load(filePath, cc.JsonAsset, (error, asset: cc.JsonAsset) => {
        //     if (error) {
        //         cc.error(error.message || error);
        //         failureCallback?.();
        //         return;
        //     }
        //     if (!this.stringsTable[lang]) {
        //         this.stringsTable[lang] = {};
        //     }
        //     let locData: Object = asset.json["string"];
        //     for (let locKey of Object.keys(locData)) {
        //         if (typeof locData[locKey] == "string" || Array.isArray(locData[locKey])) {
        //             this.stringsTable[lang][locKey] = locData[locKey];
        //         } else {
        //             // TODO this assumes there's a value property in every string table, generalize this
        //             this.stringsTable[lang][locKey] = locData[locKey]["-value"];
        //         }
        //     }
        //     successCallback?.();
        // });
        let result = {};
        const filePath = "res/mtt/flattenMTT_Translation.json";
        const data = fs.readFileSync(filePath, "utf8");
        let parsedJson = JSON.parse(data);
        for (const key in parsedJson) {
            // console.log(parsedJson[key]);
            for (const child in parsedJson[key]) {
                if (child === lang) {
                    result[key] = parsedJson[key][child];
                }
            }
        }
        return result;
    }
}
exports.MTTLocController = MTTLocController;
//# sourceMappingURL=MTTLocController.js.map