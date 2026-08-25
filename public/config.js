// * config.js 可以用来自定义一些配置

// * 默认油库里API
// yukuuri.api = "https://www.yukumo.net/api/v2/:aqtk/koe.mp3"

// * 如果需要打包到本地应用请使用这些设置↑
// * 注意跨域问题

switch (new URL(location).searchParams.get("source")) {
  case "official":
    yukuuri.api = "/official-demo/:aqtk/koe.wav"
    break;
  case "yukumo":
    yukuuri.api = "/:aqtk/yukumo.mp3" // 写不写的吧，默认也是这个(，写了看着舒服点不是
    break;
  case "custom":
    yukuuri.api = prompt("Api 地址", "/:aqtk/yukumo.mp3")
    break;
}