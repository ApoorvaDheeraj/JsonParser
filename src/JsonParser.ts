import * as fs from 'fs';

export class JsonParser {
    private jsonData: Record<string, Record<string, Record<string, string>>>;

    // Declration for Without String 
    // private jsonData: Record<string, Record<string, string>>;
    private resultMap = new Map<string, string>();
  
    constructor(jsonString: string) {
      this.jsonData = JSON.parse(jsonString);
    }
  
    private createMap() {
       this.resultMap = new Map<string, string>();

       // Parser with { string { key: { -value : "value "}}};
       for(const stringKey in this.jsonData){
        if(this.jsonData.hasOwnProperty(stringKey)){
            const nestedJsonObject = this.jsonData[stringKey];
            for(const nestedKey in nestedJsonObject){
                if(nestedJsonObject.hasOwnProperty(nestedKey)){
                    const valueObject = this.jsonData[stringKey][nestedKey];
                    for(const valueKey in valueObject){
                        if(valueObject.hasOwnProperty(valueKey)){
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
    }

    writeMapToFile(){
        this.createMap();

        // this.resultMap.forEach((value, key) => {
        //     console.log(`${key} : ${value}`);
        //   });

          const finalString = JSON.stringify(Object.fromEntries(this.resultMap), null, 4);
          const filePath = "res/master.json";
          fs.writeFile(filePath, finalString, 'utf-8', (err)=>{
            if (err) {
                console.error('Error writing to file:', err);
              } else {
                console.log(`Content has been written to ${filePath}`);
              }
          });
    }

    getResultMap():Map<string,string>{
        return this.resultMap;
    }
  }
