import * as fs from 'fs';
import { JsonParser } from './JsonParser';
import {LangModel, LangParser} from './LanguageModel'

const data = fs.readFileSync('res/stringCH.json', 'utf8');

  // Create an instance of the JsonParser
const jsonParser = new JsonParser(data);
jsonParser.writeMapToFile();

  const langInstanch = new LangParser();


jsonParser.getResultMap().forEach((value:string, key:string)=>{
    langInstanch.addToMap(key, new LangModel(value, "" , ""));
});

langInstanch.writeJsonForFile();
  

  
  

