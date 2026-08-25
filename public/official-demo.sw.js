/*
 * # Request (Official Demo)
 *
 * ## Kanji2Koe
 * GET https://www.a-quest.com/demo/kanji2koe_rd2.php?engine=aqtk10&str=baka
 *
 * ## Koe2wav
 * GET https://www.a-quest.com/demo/koe2wav_rd2.php?engine=aqtk10&phont=f3&speed=100&koe=%E3%83%90%27%E3%82%AB
*/
const baseURL = "/official-demo/"

function createParams(obj) {
  return "?" + Object.keys(obj).map(key => key + "=" + encodeURIComponent(obj[key])).join("&")
}

function parseURL(url) {
  var engine = url.match(/\/([^\/]+)\/koe\.wav/)[1]
  var param = Object.fromEntries(new URL(url).searchParams)
  return {engine, speed: param.speed, phont: param.type, kanji: param.kanji}
}

function catchError(respond) {
  if(respond.slice(0,4) === "ERR:")
    return {error: 1, reason: respond.slice(5), body: respond}
  return {error: 0, body: respond}
}

async function kanji2koe(string) {
  const baseURL = "https://www.a-quest.com/demo/kanji2koe_rd2.php?engine=aqtk10&str="
  var koe = await (await fetch(baseURL + encodeURIComponent(string), {referrerPolicy: "no-referrer"})).text()
  with(catchError(koe)) if(error) throw new Error(reason)
  return koe
}

async function koe2wav(engine, phont, speed, koe) {
  const baseURL = "https://www.a-quest.com/demo/koe2wav_rd2.php"
  var response = await fetch(baseURL + createParams({engine, phont, speed, koe}), {referrerPolicy: "no-referrer"})
  if(parseInt(response.headers["content-length"]) <= 100)
    with(catchError(await response.clone().text()))
      if(error) throw new Error(reason)
  return response
}

self.addEventListener("fetch", (event) => {
  var req = event.request
  console.log("Passed")
  if(new URL(req.url).pathname.startsWith(baseURL)) {
    var {engine, speed, phont, kanji} = parseURL(req.url)
    event.respondWith((async () => {
      var koe = await kanji2koe(kanji)
      return await koe2wav(engine, phont, speed, koe)
    })())
  } else return;
})

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
})