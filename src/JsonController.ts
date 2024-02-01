import { FormattedMTT_Translation } from "./FormattedMTTLang";
import { JsonParser } from "./JsonParser";
import { Translation } from "./LangData";
import { LangModel, LangController } from "./LanguaggeUtil";
import { MTTLocController } from "./MTTLocController";
import { MTTParser } from "./MTTParser";
import { Translate } from "./Translator";

const langFileArray = ["stringCH.json", "stringVN.json", "stringTH.json", "stringPT.json", "stringFR.json", "stringES.json", "stringJP.json", "stringKO.json"];
const countryCode = ["ch", "vn", "th", "pt", "fr", "es", "jp", "ko"];
let jsonParserRecord = new Map<string, JsonParser>();

// Create EN instance of the JsonParser
const enJsonParser = new JsonParser("stringEN.json");
jsonParserRecord.set("en", enJsonParser);

const enKeyItr = enJsonParser.getResultMap().keys();
enJsonParser.writeKeysForJson();

const langInstanch = new LangController();

// Fill JsonParser Object with key value pair
let fileArrayIndex = 0;
countryCode.forEach(function (value) {
  const jsonParserObj = new JsonParser(langFileArray.at(fileArrayIndex)!);
  jsonParserRecord.set(value, jsonParserObj);
  fileArrayIndex++;

  jsonParserObj.writeKeysForJson();

});

// let missing = a1.filter(item => a2.indexOf(item) < 0);
// console.log(missing);
// let missingKey = enJsonParser.getKeysArray().filter(value => (jsonParserRecord.get("es")?.getKeysArray().indexOf(value)!) < 0)
let missingKey = jsonParserRecord.get("vn")?.getKeysArray().filter(value => (enJsonParser.getKeysArray().indexOf(value)!) < 0)
console.log(JSON.stringify(missingKey, null, 4));

for (const keyValue of enKeyItr) {
  // console.log(`Value for ${keyValue} = ${jsonParser.getResultMap().get(keyValue)}`);
  const enValueForKey = jsonParserRecord.get("en")?.getValueForKey(keyValue);
  const zhValueForKey = jsonParserRecord.get("ch")?.getValueForKey(keyValue);
  const vnValueForKey = jsonParserRecord.get("vn")?.getValueForKey(keyValue);
  const thValueForKey = jsonParserRecord.get("th")?.getValueForKey(keyValue);
  const ptValueForKey = jsonParserRecord.get("pt")?.getValueForKey(keyValue);
  const frValueForKey = jsonParserRecord.get("fr")?.getValueForKey(keyValue);
  const esValueForKey = jsonParserRecord.get("es")?.getValueForKey(keyValue);
  const jpValueForKey = jsonParserRecord.get("jp")?.getValueForKey(keyValue);
  const koValueForKey = jsonParserRecord.get("ko")?.getValueForKey(keyValue);

  // console.log(
  //   `Value for Key ${keyValue} = ${enValueForKey}, ${zhValueForKey}, ${vnValueForKey},${thValueForKey},${ptValueForKey},${frValueForKey},${esValueForKey},${jpValueForKey},${koValueForKey},`
  // );

  // langInstanch.addToMap(keyValue, new LangModel(zhValueForKey,enValueForKey,vnValueForKey,thValueForKey,ptValueForKey,frValueForKey,esValueForKey,jpValueForKey,koValueForKey));
}

// Create Master Lang file for String.EN ... JSONS
// langInstanch.createMasterJsonFile();

// Fill JsonParser Object with key value pair
countryCode.forEach(function (value) {
  // jsonParserRecord.get(value)?.missingKeyForLangFile();
  fileArrayIndex++;
});



const mttParserObj = new MTTParser();
// let result = mttParserObj.flattenObject(Translation);

// langInstanch.writeKeysForJson(result, "res/mtt/flattenMTT_Translation.json");

// Iterate Array and Write File
const langArray:string[] = ["tc", "ru", "sc","en", "es", "fr", "ja", "ko", "vn", "th", "hi", ]
for(const langKey in langArray){
  let mttResult = MTTLocController.getInstance().loadLocStringsFromResources(langArray[langKey]);
  // langInstanch.writeKeysForJson(mttResult, `res/mtt/${langArray[langKey]}.json`);
}
