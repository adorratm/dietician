export default function({ $axios, redirect }) {
  $axios.create({
    baseURL: `${process.env.apiBaseUrl}`,
    json: true,
    withCredentials: false,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': true,
      'Content-type': 'application/json'
    },
    credentials: 'same-origin'
  })
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
