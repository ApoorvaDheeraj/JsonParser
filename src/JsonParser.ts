import { assert } from "console";
import * as fs from "fs";


export enum LANGUAGE_TYPE {
  /** Hindi, Traditional Chinese - Chinese (S) */
  zh_CN = "zh_CN",

  /** English (US) */
  en_US = "en_US",

  /** Vietnamese */
  vi_VN = "vi_VN",

  /** Thai (Thailand) */
  th_PH = "th_PH",

  /** Arabic (Saudi Arabia) */
  ar_SA = "ar_SA",

  /** Hindi (India) */
  hi_IN = "hi_IN",

  /** Portuguese (Brazil) */
  pt_BR = "pt_BR",

  /** French (Canada) */
  fr_CA = "fr_CA",

  /** Spanish (Mexico) */
  es_MX = "es_MX",

  /** Nihongo (Japan) */
  ja_JP = "ja_JP",

  /** Korean */
  ko_KR = "ko_KR",

}
export class JsonParser {
  private jsonData: Record<string, Record<string, Record<string, string>>>;

  // Declration for Without String
  // private jsonData: Record<string, Record<string, string>>;

  private resultMap = new Map<string, string>();
  private missingKeyArray: string[] = [];
  private keysArray: string[] = [];
  private fileName: string;
  private writeFileName: string;
  private LANG_FILE_PATH: string = "res/langFiles/";

  constructor(fileName: string) {
    this.writeFileName = this.getFileName(fileName);
    this.fileName = fileName;
    this.readJsonFile();
    // Initilize map with Json String File
    this.createMap();
  }

  private getFileName(localFileName: string): string {
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

  private assignKeysForArray() {
    this.keysArray = Array.from(this.resultMap.keys());
  }
  public getKeysArray(): string[] {
    return this.keysArray;
  }

  private writeMapToFile() {
    const finalString = JSON.stringify(Object.fromEntries(this.resultMap), null, 4);
    const filePath = "res/formatted/" + this.writeFileName;
    fs.writeFile(filePath, finalString, "utf-8", (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log(`Content has been written to ${filePath}`);
      }
    });
  }

  private readJsonFile() {
    const filePath = this.LANG_FILE_PATH + this.fileName;
    const data = fs.readFileSync(filePath, "utf8");
    this.jsonData = JSON.parse(data);
  }

  // Create and Write Map to File
  private createMap() {
    if (!this.jsonData) console.log(`Unable to read Json Data for file ${this.fileName}`);

    assert(this.jsonData);

    this.resultMap = new Map<string, string>();

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
    } else {
      console.log(`Json Map for ${this.fileName} is Empty`);
    }
  }

  getResultMap(): Map<string, string> {
    return this.resultMap;
  }

  getValueForKey(key: string): string {
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
      } else {
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
      } else {
        console.log(`Content has been written to ${filePath}`);
      }
    });
  }
}
