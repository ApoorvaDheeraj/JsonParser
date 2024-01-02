import { JsonParser } from "./JsonParser";
import { Translation } from "./LangData";

export class MTTParser {
  nestedKey: any = {};
  countryArray: string[] = [
    "th",
    "sc",
    "tc",
    "vn",
    "en",
    "hi",
    "es",
    "fr",
    "pt",
    "ru",
    "ja",
    "ko",
  ];

  // Use Recursion and iterate
  public loopTranslationJson(obj: Record<string, any>): void {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        if (Array.isArray(obj[key])) {
          // loop through array
          for (let i = 0; i < obj[key].length; i++) {
            this.loopTranslationJson(obj[key][i]);
          }
        } else {
          // call function recursively
          this.loopTranslationJson(obj[key]);
        }
      } else {
        console.log(key + ": " + obj[key]);
      }
    }
  }

  public flattenObject(obj: any, parentKey: string = ""): any {
    let result: any = {};
    for (const key in obj) {
      if (this.countryArray.includes(key)) {
        if (this.isNested(obj)) {
          const newKey = parentKey ? `${parentKey}.${key}` : key;
          if (typeof obj[key] === "object" && obj !== null) {
            const flattened = this.flattenObject(obj[key], newKey);
            result = { ...result, ...flattened };
          }else{
            result[parentKey] = this.getSingleJSONObj(obj);
            // this.nestedKey[parentKey] = this.getSingleJSONObj(obj);
          }
        } else {
          result[parentKey] = obj;
        }
        continue;
      }

      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof obj[key] === "object" && obj !== null) {
        const flattened = this.flattenObject(obj[key], newKey);
        result = { ...result, ...flattened };
      }
    }
    return result;
  }

  public isNested(obj: any): boolean {
    const isNested = Object.keys(obj).some(function (key) {
      return obj[key] && typeof obj[key] === "object";
    });
    return isNested;
  }

  public getSingleJSONObj(obj:any):any{
    let list: any = {};
    for(const key in obj){
      if(typeof obj[key] !== "object" && obj[key] !== null){
        list[key] = (obj[key]);
      }
    }
    return list;
  }
}
