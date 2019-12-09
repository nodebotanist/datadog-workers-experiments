const DATADOG_APP_KEY = ""
const DATADOG_API_KEY = ""

addEventListener('fetch', event => {
  event.passThroughOnException()
  event.respondWith(handleRequest(event.request, event))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request, event) {
  try {
    response = await postCallEvent()
    return response
  } catch (error) {
    event.waitUntil(postErrorEvent(event, error))
    return new Response('The call event threw an error')
  }
}

async function postCallEvent() {
  return await fetch(`https://api.datadoghq.com/api/v1/events?api_key=${DATADOG_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'DD-APPLICATION-KEY': DATADOG_APP_KEY,
      'DD-API-KEY': DATADOG_API_KEY
    },
    body: JSON.stringify({
      title: 'WorkerCalled',
      text: 'This happened because a Worker was called!',
      priority: 'normal',
      alert_type: "info"
    })
  })
}

async function postErrorEvent(event, error) {
  return await fetch(`https://api.datadoghq.com/api/v1/events?api_key=${DATADOG_API_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'DD-APPLICATION-KEY': DATADOG_APP_KEY,
      'DD-API-KEY': DATADOG_API_KEY
    },
    body: JSON.stringify({
      title: 'LogCallError',
      text: error.toString(),
      priority: 'high',
      alert_type: "error"
    })
  })
}