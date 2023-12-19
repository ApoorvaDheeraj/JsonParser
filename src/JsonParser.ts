import { assert } from "console";
import * as fs from "fs";

export class JsonParser {
  private jsonData: Record<string, Record<string, Record<string, string>>>;

  // Declration for Without String
  // private jsonData: Record<string, Record<string, string>>;

  private resultMap = new Map<string, string>();
  private missingKeyArray: string[] = [];
  private keysArray: string[] = [];
  private fileName: string;
  private LANG_FILE_PATH:string = "res/langFiles/"

  constructor(fileName: string) {
    this.fileName = fileName;
    this.readJsonFile();
    // Initilize map with Json String File
    this.createMap();
  }
  private assignKeysForArray(){
    this.keysArray = Array.from(this.resultMap.keys());
  }
  public getKeysArray():string[]{
    return this.keysArray;
  }

  private writeMapToFile() {
    const finalString = JSON.stringify(Object.fromEntries(this.resultMap), null, 4);
    const filePath = "res/formatted/" + this.fileName;
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

    // this.writeMapToFile();
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

  missingKeyForLangFile(){
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

  writeKeysForJson(){
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
