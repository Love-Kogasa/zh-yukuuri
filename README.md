# ZH-YukumO
基于 www.yukumo.net 的非官方油库里合成器  
本站使用 www.yukumo.net 作为API，在 www.yukumo.net 的基础上提供了中文支持  
有条件请去支持一下 www.yukumo.net 的创作者Yuichi大佬哦)  

## 前端使用
> 在使用时需要注意相关的 [使用规约](https://www.yukumo.net/#/about)  
> 您可以在非商用场景下随意使用  

整这个项目是因为我心血来潮突然想到然后翻到了油库里合成器用的api了  
如果您想在前端使用音频，可以在more选项里选择下载，或者生成h5代码复制到前端html或者markdown中，它会在加载完成后自动播放  
至于中文的支持，本项目使用的是ltool的一个工具

对于更复杂的项目，您可以使用我为本项目写的一个js库  
使用script标签引入
```html
<script src="https://cdn.jsdelivr.net/gh/Love-Kogasa/zh-yukuuri/yukumo/core.js"></script>
<script src="https://cdn.jsdelivr.net/gh/Love-Kogasa/zh-yukuuri/yukumo/browser.js"></script>
```
**本项目提供的js与aquestalk库不一样！**  
使用示例
```js
yukuuri.createAudio( "Hello" ) // 返回一个Audio对象
yukuuri.playAudio( "Hello" ) // 在前端播放语音Hello，返回一个返回audio元素的promise
```
跨域使用(如果您有足够的后端访问权限，您应该使用 [node-aquestalk10](https://www.npmjs.com/package/node-aquestalk10)，本项目仅建议在前端和serverless服务上使用)  
一些函数需要跨域才能用
```js
yukuuri.downloadAudio( "Hello", "fileName.mp3" ) // 下载音频文件
yukuuri.fetchAudio( "Hello" ) // 获取音频文件，返回的是File对象
```
对此，您可以使用本项目的vercel.json(如果您使用vercel)  
设置url地址为/yukuuri.mp3
```js
yukuuri.api = "/yukuuri.mp3"
```
对于中文支持，您可以使用本仓库的js/zh2jp.js  
它也依赖于本项目的vercel.json  
```js
zh2jp( "中文字符" ) // 返回一个返回同读音的日语的Promise
```
如果您想要定义语速等内容，您可以使用YukumoVoice(因为使用了www.yukumo.net作为api，所以被命名为YukumoVoice，您也可以用AQTK_VOICE来访问此类)来创建一个音频对象
```js
var voice = new YukumoVoice()
voice.speed = 120 // 设置速度
// ...
yukuuri.playAudio( "Hello", voice )
```
内置语音预设(与aquestalk相同)
```js
// ...
  static f1 = new YukumoVoice("f1e", 100, 100, 100, 100, 100, 100)
  static f2 = new YukumoVoice("f2e", 100, 100,  77, 150, 100, 100)
  static f3 = new YukumoVoice("f1e", 80, 100, 100, 100,  61, 148)
  static m1 = new YukumoVoice("m1e", 100, 100, 30, 100, 100, 100)
  static m2 = new YukumoVoice("m1e", 105, 100, 45, 130, 120, 100)
  static r1 = new YukumoVoice("m1e", 100, 100,  30,  20, 190, 100)
  static r2 = new YukumoVoice("f2e",  70, 100,  50,  50,  50, 180)
// ...

// 使用
yukuuri.playAudio( "Hello", YukumoVoice.f1 )
```

暂无w/如果不全敬请期待)  