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

export class LangModel {
  zh_CN?: string;
  en_US?: string;
  vi_VN?: string;
  th_PH?: string;
  pt_BR?: string;
  fr_CA?: string;
  es_MX?: string;
  ja_JP?: string;
  ko_KR?: string;

  constructor(ch?: string, en?: string, vi?: string, th?: string, pt?: string, fr?: string, es?: string, ja?: string, ko?: string) {
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

export class LangController {
  // A map where keys are strings and values are maps
  mapOfMaps: Map<string, LangModel>;

  constructor() {
    this.mapOfMaps = new Map<string, LangModel>();
  }

  // Method to add a key-value pair to the inner map
  addToMap(key1: string, lang: LangModel): void {
    // Ensure that the outer map has the key1 entry
    if (!this.mapOfMaps.has(key1)) {
      this.mapOfMaps.set(key1, lang);
    }
  }

  // Method to get the value from the inner map
  getValueFromMap(key1: string, key2: string): LangModel | undefined {
    const innerMap = this.mapOfMaps.get(key1);
    return innerMap;
  }

  createMasterJsonFile() {
    const masterString = JSON.stringify(Object.fromEntries(this.mapOfMaps), null, 4);
    const fileName = "res/MasterLangJson.json";
    fs.writeFile(fileName, masterString, "utf-8", (error) => {
      if (error) {
        console.log("Error" + JSON.stringify(error));
      } else {
        console.log("Master Json File Write Successfully");
      }
    });

    // console.log(masterString);
  }
}
