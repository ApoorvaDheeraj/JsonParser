import { Translation } from "./LangData";


interface translationSet {
    [lang:string]:string;
}

let LANGUAGE = 'en';

export function Translate(key: translationSet | string):string {
    if(typeof key == 'string') {

        const keys = key.split('.');
        let res:any = Translation;
        try {
            keys.forEach(k => {
                res = res[k];
            });
            let result = res[LANGUAGE];
            return result ? result : "";
        }catch (e) {
            return key;
        }

    }else{
        let result = key[LANGUAGE];
        return result ? result : "";

    }

}