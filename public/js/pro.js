var input = document.getElementById("input")
var output = document.getElementById("output")
var voice = document.getElementById("voice")
var speed = document.getElementById("speed")
var volume = document.getElementById("volum")
var effect = document.getElementById("effect")
var playBtn = document.getElementById("play")
var download = document.getElementById("download")
var convert = document.getElementById("convert")
var filename = document.getElementById("filename")
var convertZh = document.getElementById("convert-zh")
var save = document.getElementById("savetext")
var number = document.getElementById( "convert-number" )
var counter = document.getElementById( "count" )

var cache = {text: void 0}
var ctx = new AudioContext()
var zh = /[\u4e00-\u9fa5]/
yukuuri.api = "/:aqtk/yukumo.mp3"
try {
    input.value = localStorage.getItem("input_text")
    output.value = localStorage.getItem("output_text")
} catch(e) {
    Qmsg.warn("您的浏览器似乎不支持localStorage")
    Qmsg.info("这通常不会影响正常使用，详见控制台")
    throw e
}

// 弃用
function readFile(file) {
    return new Promise(res => {
        var reader = new FileReader()
        reader.onload = () => res(reader.result)
        reader.readAsArrayBuffer(file)
    })
}

async function koe(kanji) {
    return await (
        await fetch(
            "koe.txt?boyomi=true&kanji=" + encodeURIComponent(kanji)
        )
    ).text()
}

// 弃用
async function say(text, voice = YukumoVoice.f1) {
    if(cache.url === voice.format(text)) {
        return cache.audio
    } else {
        var source = await readFile( await aquestalk.fetchAudio(text, voice) )
        cache.audio = ctx.decodeAudioData(source)
        cache.url = voice.format(text)
        return cache.audio
    }
}

// 弃用
function play(buffer) {
    var source = ctx.createBufferSource()
    source.buffer = buffer
    source.connect(ctx.destination)
    return source.start()
}

function intchecker(int) {
    var spd = parseInt(int || 100)
    if( spd >= 10 && spd <= 200 ) {
        return spd
    } else {
        throw "请输入一个合法的数字"
    }
}

function createVoice() {
    var sclected = YukumoVoices[voice.value]
    var voc = new YukumoVoice(sclected.typ)
    voc.aqtk = sclected.aqtk
    voc.spd = intchecker(speed.value)
    voc.volume = intchecker(volume.value)
    voc.effect = effect.value
    return voc
}

input.oninput = function() {
    counter.textContent = input.value.length
}

convert.onclick = async function() {
    try {
        var text = zh.test(input.value) ? await zh2jp(input.value, number.checked) : input.value
        output.value = await koe(text)
    } catch(e) {
        Qmsg.error(e.toString())
        console.error(e)
    }
}

convertZh.onclick = async function() {
    try {
        var text = zh.test(input.value) ? await zh2jp(input.value, number.checked) : input.value
        output.value = text
    } catch(e) {
        Qmsg.error(e.toString())
        console.error(e)
    }
}

playBtn.onclick = async function() {
    try {
        var msg = Qmsg.loading("正在获取ING")
        var voc = createVoice()
        await aquestalk.playAudio(
            zh.test(input.value) ? await zh2jp(input.value, number.checked) : input.value,
            voc)
        msg.close()
    } catch(e) {
        Qmsg.error(e.toString())
        console.error(e)
    }
}

download.onclick = async function() {
    try {
        var voc = createVoice()
        await aquestalk.downloadAudio(
           zh.test(input.value) ? await zh2jp(input.value, number.checked) : input.value
        , filename.value || "yukumo.wav", voc)
    } catch(e) {
        Qmsg.error(e.toString())
        console.error(e)
    }
}

save.onclick = function() {
    localStorage.setItem("input_text", input.value)
    localStorage.setItem("output_text", output.value)
    Qmsg.success("保存成功")
}

Qmsg.success("页面加载完成")