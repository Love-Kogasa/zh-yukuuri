// ?type=f1e&speed=100&volume=100&pitch=100&accent=100&lmd=100&fsc=100&kanji=Hello

class YukumoVoice {
  constructor( typ = "f1e", spd = 100, vol = 100, pit = 100, acc = 100, lmd = 100, fsc = 100 ) {
    this.type = typ
    this.speed = spd
    this.volume = vol
    this.pitch = pit
    this.accent = acc
    this.lmd = lmd
    this.fsc = fsc
  }
  format( string ) {
    return `?type=${this.type}&speed=${this.speed}&volume=${this.volume}&pitch=${this.pitch}&accent=${this.accent}&lmd=${this.lmd}&fsc=${this.fsc}&kanji=${encodeURIComponent( string )}`
  }
  
  static f1 = new YukumoVoice("f1e", 100, 100, 100, 100, 100, 100)
  static f2 = new YukumoVoice("f2e", 100, 100,  77, 150, 100, 100)
  static f3 = new YukumoVoice("f1e", 80, 100, 100, 100,  61, 148)
  static m1 = new YukumoVoice("m1e", 100, 100, 30, 100, 100, 100)
  static m2 = new YukumoVoice("m1e", 105, 100, 45, 130, 120, 100)
  static r1 = new YukumoVoice("m1e", 100, 100,  30,  20, 190, 100)
  static r2 = new YukumoVoice("f2e",  70, 100,  50,  50,  50, 180)
  
  static getUrl( string, voice = YukumoVoice.f1, api = "https://www.yukumo.net/api/v2/aqtk10/koe.mp3" ) {
    return api + voice.format( string )
  }
}

var AQTK_VOICE = YukumoVoice

if( typeof module === "object" )
  module.exports = {YukumoVoice, AQTK_VOICE}