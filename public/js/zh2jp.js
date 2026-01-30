var p2k = void 0
async function zh2jp( string ) {
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