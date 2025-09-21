var api = "/cn2jp.php"
function zh2jp( string ) {
  return new Promise( (res, rej) => {
    fetch( api, {
      method: "POST",
      body: `contents=${encodeURIComponent(string)}}&option=1&optionext=zenkaku`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then( res => res.text() )
    .then( text => {
      // 沿用我上一个油库里用的正则
      res(text.match( /\<div class\=(\'|\")finalresult(\'|\")\>(.*?)\<\/div\>/ )[3].replace(/<span.*?>.*?<\/span>/g, ""))
      // 正则就正则吧，更简单一些
      
      /* 我想用iframe解析HTML来着，这样更安全，但是没有成功，手机开发打不开控制台(
      var url = URL.createObjectURL( blob )
      var iframe = document.createElement( "iframe" )
      iframe.src = url
      iframe.addEventListener( "load", () => {
        alert( iframe.src)
        var result = iframe.contentDocument.getElementsByClassName( "finalresult" )[0]
        res( result.textContent )
        iframe.remove()
        URL.revokeObjectURL( url )
      })*/
    }).catch(rej)
  })
}