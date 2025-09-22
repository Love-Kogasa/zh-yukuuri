var text = document.getElementById( "text" )
var play = document.getElementById( "play" )
var voice = document.getElementById( "voice" )
var zh = /[\u4e00-\u9fa5]/
yukuuri.api = "/:aqtk/yukumo.mp3"
var cache = {}
Qmsg.success( "页面加载完毕" )
Qmsg.info( "如果浏览器不播放音频请尝试更换浏览器" )

play.onclick = async function() {
  if( !text.value ) {
    Qmsg.error( "句子不能为空" )
    return;
  }
  if( !cache[text.value + voice.value] ) {
    var msg = Qmsg.loading( "正在获取音频，请不要多次点击")
    var audio = await yukuuri.playAudio(zh.test(text.value) ? (await zh2jp( text.value )).replace(/(?<=\S) (?=\S)/g, '') : text.value, YukumoVoices[voice.value])
    cache[ text.value + voice.value ] = audio
    msg.close()
  } else {
    cache[text.value + voice.value].currentTime = 0
    cache[text.value + voice.value].play()
  }
}

var result = document.getElementById( "result" )
var download = document.getElementById( "download" )
download.onclick = async () => {
  var txt = ""
  if( zh.test( text.value ) ) {
    var msg = Qmsg.loading( "正在将中文转换为日文" )
    txt = (await zh2jp( text.value )).replace(/(?<=\S) (?=\S)/g, '')
    msg.close()
  } else txt = text.value
  Qmsg.info( "下载会在(约)一分钟内弹出，请稍等" )
  yukuuri.downloadAudio( txt, "yukuuri.mp3", YukumoVoices[voice.value])
}

var link = document.getElementById( "link" )
link.onclick = async () => {
  if( !text.value ) {
    Qmsg.error( "句子不能为空" )
    return;
  }
  var txt = ""
  if( zh.test( text.value ) ) {
    var msg = Qmsg.loading( "正在将中文转换为日文" )
    txt = (await zh2jp( text.value )).replace(/(?<=\S) (?=\S)/g, '')
    msg.close()
  } else txt = text.value
  result.textContent = YukumoVoice.getUrl( txt, YukumoVoices[voice.value] )
}

var html = document.getElementById( "html" )
html.onclick = async () => {
  if( !text.value ) {
    Qmsg.error( "句子不能为空" )
    return;
  }
  var txt = ""
  if( zh.test( text.value ) ) {
    var msg = Qmsg.loading( "正在将中文转换为日文" )
    txt = (await zh2jp( text.value )).replace(/(?<=\S) (?=\S)/g, '')
    msg.close()
  } else txt = text.value
  result.textContent = "<audio autoplay src=\"" + YukumoVoice.getUrl( txt, YukumoVoices[voice.value] ) + "\">\n  您的浏览器不支持audio\n</audio>"
}

var base64 = document.getElementById( "base64" )
base64.onclick = async () => {
  var msg = Qmsg.loading( "正在获取并生成" )
  if( !text.value ) {
    Qmsg.error( "句子不能为空" )
    return;
  }
  var txt = ""
  if( zh.test( text.value ) ) {
    txt = (await zh2jp( text.value )).replace(/(?<=\S) (?=\S)/g, '')
  } else txt = text.value
  yukuuri.fetchAudio( txt, YukumoVoices[voice.value] )
  .then( file => {
    var reader = new FileReader()
    reader.onload = () => {
      result.textContent = reader.result
      msg.close()
    }
    reader.readAsDataURL( file )
  })
  .catch( err => {
    Qmsg.error( err.toString() )
    console.error( err )
    msg.close()
  })
}

var copy = document.getElementById( "copy" )
copy.onclick = async () => {
  try {
    await navigator.clipboard.writeText( result.textContent )
    Qmsg.success( "复制成功)" )
  } catch( err ) {
    Qmsg.error( "复制失败，请手动复制" )
  }
}