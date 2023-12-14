import { JsonParser } from "./JsonParser";
import { LangModel, LangController } from "./LanguaggeUtil";

const langFileArray = ["stringCH.json", "stringEN.json", "stringVN.json", "stringTH.json", "stringPT.json", "stringFR.json", "stringES.json", "stringJP.json", "stringKO.json"];
// Create an instance of the JsonParser

let jsonParser: JsonParser;

// Example usage:
const langInstanch = new LangController();

langFileArray.forEach(function (value) {
  jsonParser = new JsonParser(value);
  // Adding values to the map of maps

  for (const keyValue of jsonParser.getResultMap().keys()) {
    // console.log(`Value for ${keyValue} = ${jsonParser.getResultMap().get(keyValue)}`);
    const value = jsonParser.getResultMap().get(keyValue) !== undefined ? jsonParser.getResultMap().get(keyValue)! : "";
    langInstanch.addToMap(keyValue, new LangModel(value));
  }

  jsonParser.getResultMap().forEach((value: string, key: string) => {
    // langInstanch.addToMap(key, new LangModel(value, "" , ""));
  });
});

langInstanch.writeJsonToFile();
