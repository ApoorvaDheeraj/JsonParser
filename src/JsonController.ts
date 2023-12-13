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
  langInstanch.addToMap("key1", new LangModel("valueth", "valueVN"));
  langInstanch.addToMap("key2", new LangModel("valueth", "valueVN"));
  langInstanch.addToMap("key3", new LangModel("valueth", "valueVN"));
  langInstanch.addToMap("key4", new LangModel("valueth", "valueVN"));
  langInstanch.addToMap("key5", new LangModel("valueth", "valueVN"));

  langInstanch.writeJsonForFile();
  

  
  

