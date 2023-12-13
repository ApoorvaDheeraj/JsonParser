import * as fs from 'fs';
export class LangModel{
    th:string;
    vn:string;
    constructor(th:string, vn:string){
        this.th = th;
        this.vn = vn;
    }
}

export class LangParser {
    // A map where keys are strings and values are maps
    mapOfMaps: Map<string, LangModel>;
  
    constructor() {
      this.mapOfMaps = new Map<string, LangModel>();
    }
  
    // Method to add a key-value pair to the inner map
    addToMap(key1: string, lang : LangModel): void {
      // Ensure that the outer map has the key1 entry
      if (!this.mapOfMaps.has(key1)) {
        this.mapOfMaps.set(key1, lang);
      }
  
      // Get the inner map associated with key1
      const innerMap = this.mapOfMaps.get(key1);
  
      // Add the key-value pair to the inner map
    //   if (innerMap) {
    //     innerMap.set(key2, value);
    //   }
    }
  
    // Method to get the value from the inner map
    getValueFromMap(key1: string, key2: string): LangModel | undefined {
      const innerMap = this.mapOfMaps.get(key1);
        return innerMap ;
    }

    writeJsonForFile(){
        const masterString = JSON.stringify(Object.fromEntries(this.mapOfMaps), null, 4)

        const fileName = "res/sample.json";
        fs.writeFile(fileName, masterString, 'utf-8', (error)=>{
            if(error){
                console.log("Error" + JSON.stringify(error));
            }else{
                console.log("File Write Successfully");
            }   
        });

        console.log(masterString);
    }

}