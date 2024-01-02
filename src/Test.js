function flattenJSON(obj, parentKey = "") {
    let result = {};

    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            // Recursively call flattenJSON for nested objects
            if(obj[key] === "json"){
                console.log(obj[key]);
            }
            let nestedObj = flattenJSON(obj[key], `${parentKey}${key}_`);
            result = { ...result, ...nestedObj };
        } else {
            // Construct flattened key and assign the value
            result[`${parentKey}${key}`] = obj[key];
        }
    }

    return result;
}

function extractLanguageData(obj) {
    let languageData = {};

    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            // Extract language code and assign the value
            let [lang, messageKey] = key.split('_');
            if (!languageData[lang]) {
                languageData[lang] = {};
            }
            languageData[lang][messageKey] = obj[key];
        }
    }

    return languageData;
}

// Provided JSON
const lotteryJSON = {
    "LOTTERY": {
        "CONGRATULATION_SELF": {
            "th": "ยินดีด้วย! คุณชนะรางวัล %s",
            "sc": "恭喜您获得%s",
            "tc": "恭喜您获得%s",
            "vn": "Xin chúc mừng! Bạn đã thắng %s",
            "en": "Congratulations! You won the %s",
            "hi": "",
            "es": "¡Felicitaciones! Ganó el %s",
            "fr": "Félicitations! Vous avez gagné le %s",
            "pt": "Parabéns! Você ganhou o %s",
            "ru": "Поздравляем! Вы выиграли %s",
            "ja": "おめでとうございます。あなたは %s を獲得しました",
            "ko": "축하합니다! %s을(를) 획득했습니다"
        },
        "CONGRATULATION_OTHER": {
            "th": "ขอแสดงความยินดีกับ %sID%s ในการชนะรางวัล %s",
            "sc": "恭喜您获得%s",
            "tc": "恭喜您获得%s",
            "vn": "Xin chúc mừng! Bạn đã thắng %s",
            "en": "Congratulations! You won the %s",
            "hi": "",
            "es": "¡Felicitaciones! Ganó el %s",
            "fr": "Félicitations! Vous avez gagné le %s",
            "pt": "Parabéns! Você ganhou o %s",
            "ru": "Поздравляем! Вы выиграли %s",
            "ja": "おめでとうございます。あなたは %s を獲得しました",
            "ko": "축하합니다! %s을(를) 획득했습니다"
        }
    }
};

// Flatten the JSON
const flattenedJSON = flattenJSON(lotteryJSON);

// Extract language data
const languageDataJSON = extractLanguageData(flattenedJSON);

// Output the results
console.log("Flattened JSON:", flattenedJSON);
console.log("Language Data JSON:", languageDataJSON);
