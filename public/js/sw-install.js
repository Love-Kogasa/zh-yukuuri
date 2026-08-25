(async function () {
  try {
    const status = await navigator.serviceWorker.register("/official-demo.sw.js")
    Qmsg.success("Service Worker 已激活")
  } catch(err) {
    Qmsg.error(err.toString())
  }
})()