function isEmpty(obj) {
  if (typeof obj == "number") return false;
  else if (typeof obj == "string") return obj.length === 0;
  else if (Array.isArray(obj)) return obj.length === 0;
  else if (typeof obj == "object")
    return obj == null || Object.keys(obj).length === 0;
  else if (typeof obj == "boolean") return false;
  else return !obj;
}
export default function({ $axios,app ,redirect }) {

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
  if(!isEmpty(app.store.state.userData)){
    $axios.setToken(app.store.state.userData.api_token,"Bearer")
  }

  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
    if (code === 401) {
      app.$auth.reset();
      redirect('/login')
    }
  })
}
