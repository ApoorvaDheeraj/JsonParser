import * as fs from 'fs';
import { JsonParser } from './JsonParser';
import {LangModel, LangParser} from './LanguageModel'

const data = fs.readFileSync('res/stringCH.json', 'utf8');

  // Create an instance of the JsonParser
const jsonParser = new JsonParser(data);
jsonParser.writeMapToFile();

  // Example usage:
  const langInstanch = new LangParser();
  // Adding values to the map of maps


jsonParser.getResultMap().forEach((value:string, key:string)=>{
    langInstanch.addToMap(key, new LangModel(value, value));
});

langInstanch.writeJsonForFile();
  

  
  

