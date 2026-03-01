class LibreTranslator {
    baseURL = "https://libretranslate.com/translate"
    apiKey = ""
    constructor(option = {}) {
        this.source = option.sourceLanguage || "auto"
        this.target = option.targetLanguage
    }
    async translate(text) {
        var response = await fetch(this.baseURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                q: text, source: this.source,
                target: this.target,
                format: "text",
                alternatives: 1,
                api_key: this.apiKey
            })
        })
        var {translatedText} = await response.json()
        return translatedText
    }
    
    static setup(target) {
        return new LibreTranslator({
            targetLanguage: target
        })
    }
}