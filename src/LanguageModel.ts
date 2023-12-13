interface LangModel{
    th:string,
    vn:string,
    en:string,
    ch:string
}

export class LangParentKey implements LangModel{
    th: string;
    vn: string;
    en: string;
    ch: string;
    constructor(th:string, vn:string, en:string, ch:string){
        this.th = th; this.vn = vn, this.en = en, this.ch = ch;
    }
}

export class ParseJson extends LangParentKey{

    constructor(langObj: LangParentKey){
        super(langObj.th, langObj.ch, langObj.en, langObj.vn)
    }
    
    printObject(){
        console.log(JSON.stringify(this));
    }
   
}