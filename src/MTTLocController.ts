export interface LocStrings {
    [locKey: string]: string | Array<string>;
}

export interface LocStringsTable {
    [language: string]: LocStrings;
}
import * as fs from "fs";

export class MTTLocController {
    private static instance: MTTLocController;
   

    private stringsTable: LocStringsTable; // Key: Language, Value: {[key: string]: text | text[]}

    static getInstance(): MTTLocController {
        if (!MTTLocController.instance) {
            MTTLocController.instance = new MTTLocController();
        }
        return MTTLocController.instance;
    }

    private constructor() {
        this.stringsTable = {};
    }

    getTranslatedString(key: string, language: string): string {
        const stringObj = this.stringsTable[language];

        if (!stringObj) {
            return key;
        }

        const valueObj = stringObj[key];
        if (Array.isArray(valueObj)) {
            return valueObj.join("");
        } else {
            return valueObj;
        }
    }

    loadLocStringsFromResources(lang: string):any {
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

        let result : any = {};
        const filePath = "res/mtt/flattenMTT_Translation.json";
        const data = fs.readFileSync(filePath, "utf8");
        let parsedJson = JSON.parse(data);
        for(const key in parsedJson){
            // console.log(parsedJson[key]);
            for(const child in parsedJson[key]){
               if(child === lang){
                result[key] = parsedJson[key][child];
               }
            }
           
        }
        return result;
    }
}