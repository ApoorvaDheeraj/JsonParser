export class MTTParser {

    // Use Recursion and iterate
  public loopTranslationJson(obj: Record<string, any>): void {
    for (let key in obj) {
      if (typeof obj[key] === "object") {
        if (Array.isArray(obj[key])) {
          // loop through array
          for (let i = 0; i < obj[key].length; i++) {
            this.loopTranslationJson(obj[key][i]);
          }
        } else {
          // call function recursively
          this.loopTranslationJson(obj[key]);
        }
      } else {
        console.log(key + ": " + obj[key]);
      }
    }
  }
}
