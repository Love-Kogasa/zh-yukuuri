var aquestalk
var yukuuri = aquestalk = {
  api: "https://www.yukumo.net/api/v2/:aqtk/koe.mp3",
  createAudio( string, voice ) {
    var audio = new Audio()
    audio.src = YukumoVoice.getUrl( string, voice, this.api )
    return audio
  },
  downloadAudio( string, filename = "download.mp3", voice ) {
    var a = document.createElement( "a" )
    a.href = YukumoVoice.getUrl( string, voice, this.api )
    a.download = filename
    a.click()
    return a
  },
  playAudio( string, voice ) {
    return new Promise( res => {
      var audio = this.createAudio( string, voice )
      audio.addEventListener( "canplay", () => {
        audio.play()
        res( audio )
      })
    })
  },
  
  async fetchAudio( string, voice ) {
    if( this.api.includes( "://" ) )
      console.warn( "目标URL可能不支持跨域！" )
    var res = await fetch(YukumoVoice.getUrl( string, voice, this.api ))
    if( res.headers.get( "content-type" ).includes( "json" )) {
      return await res.json()
    } else {
      return new File( [await res.blob()], "yukuuri.mp3", {type: res.headers.get( "content-type" )} )
    }
  }
}