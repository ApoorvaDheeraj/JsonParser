import * as fs from 'fs';
import { LangParentKey, ParseJson } from './LanguageModel';
import { JsonParser } from './JsonParser';

const data = fs.readFileSync('res/stringCH.json', 'utf8');

  // Create an instance of the JsonParser
const jsonParser = new JsonParser(data);
jsonParser.writeMapToFile();

let keyObjectArray = [];

const prObj = new ParseJson(new LangParentKey("Dkd", "kdkd", "kdkd", "kdkd"));
const prObj2 = new ParseJson(new LangParentKey("Dkd", "kdkd", "kdkd", "kdkd"));

keyObjectArray.push(prObj);
keyObjectArray.push(prObj2);

console.log(JSON.stringify(keyObjectArray));