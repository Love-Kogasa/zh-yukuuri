// ?type=f1e&speed=100&volume=100&pitch=100&accent=100&lmd=100&fsc=100&kanji=Hello

class YukumoVoice {
  aqtk = "aqtk10"
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
  
  static getUrl( string, voice = YukumoVoice.f1, api = "https://www.yukumo.net/api/v2/:aqtk/koe.mp3" ) {
    return api.replace( ":aqtk", voice.aqtk ) + voice.format( string )
  }
}

var AquesTalk10 = YukumoVoice
var AQTK_VOICE10 = YukumoVoice

class AquesTalk1 {
  aqtk = "aqtk1"
  constructor( typ, spd ) {
    this.typ = typ || "f1"
    this.spd = spd || 100
  }
  format( string ) {
    return `?type=${this.typ}&speed=${this.spd}&kanji=${encodeURIComponent( string )}`
  }
  
  static dvd = new AquesTalk1( "dvd" )
  static f1 = new AquesTalk1( "f1" )
  static f2 = new AquesTalk1( "f2" )
  static imd1 = new AquesTalk1( "imd1" )
  static jgr = new AquesTalk1( "jgr" )
  static m1 = new AquesTalk1( "m1" )
  static m2 = new AquesTalk1( "m2" )
  static r1 = new AquesTalk1( "r1" )
}

var AQTK_VOICE1 = AquesTalk1

var YukumoVoices = {

  // Aqtk10
  "f1@10": YukumoVoice.f1,
  "f2@10": YukumoVoice.f2,
  "f3@10": YukumoVoice.f3,
  "m1@10": YukumoVoice.m1,
  "m2@10": YukumoVoice.m2,
  "r1@10": YukumoVoice.r1,
  "r1@10": YukumoVoice.r1,
  
  // Aqtk1
  "f1@1": AquesTalk1.f1,
  "f2@1": AquesTalk1.f2,
  "dvd@1": AquesTalk1.dvd,
  "imd1@1": AquesTalk1.imd1,
  "jgr@1": AquesTalk1.jgr,
  "m1@1": AquesTalk1.m1,
  "m2@1": AquesTalk1.m2,
  "r1@1": AquesTalk1.r1
}

if( typeof module === "object" )
  module.exports = {
    YukumoVoice,
    AquesTalk10,
    AQTK_VOICE10,
    AquesTalk1,
    AQTK_VOICE1,
    YukumoVoices
  }