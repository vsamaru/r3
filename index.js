import { handleEvent } from 'flareact'
import { processCronTrigger } from './src/functions/cronTrigger'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', (event) => {
  try {
 if (event.request.method === 'POST') return event.respondWith(raw(event.request))
    event.respondWith(
      handleEvent(event, require.context('./pages/', true, /\.js$/), DEBUG),
    )
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500 }))
  }
})

async function raw(re) {
  re = await re.json()
      var type = Object.keys(re)[1]
    re = re[type]
    re.type = type
    re.from = re.chat || re.from
    re.chat = re.from.id
    re.from = re.from.username || re.from.title || re.from.first_name
    re.in = []
    B = {
    "method": "sendMessage",
    "text": re,
    "chat_id": re.chat
}
    try {

    } catch (e) {
e = e.stack || e
B.text = e
    }
      return new Response(JSON.stringify(B,null,4), {
    headers: {
      'content-type': 'application/json'
    }
  })
}

addEventListener('scheduled', (event) => {
  event.waitUntil(processCronTrigger(event))
})
