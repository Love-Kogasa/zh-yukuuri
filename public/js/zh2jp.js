var p2k = void 0
var converter = window.index.NumberToChineseWords
async function zh2jp( string, number ) {
    if(number) string = string.replace(/\-{0,1}\d+(\.\d+){0,1}/, matched => {
      try {
        return converter.toWords(Number (matched))
      } catch(e) {
        return matched
      }
    })
    if( !p2k ) {
        var msg = Qmsg.loading( "正在加载词典" )
        p2k = await PinyinToKana.loadDict( "https://cdn.jsdelivr.net/npm/pinyin-to-kana@1.0.0/mapping.tsv" )
        msg.close()
    }
    string = string.replaceAll( " ", "_" )
    return p2k.pinyinToKana(
        Pinyin.parse( string ).map( t => t.type === 2 ? t.target + " " : t.source ).join( "" )
    ).replaceAll("_", " ")
}