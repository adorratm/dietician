function isEmpty(obj) {
  if (typeof obj == 'number') return false
  else if (typeof obj == 'string') return obj.length === 0
  else if (Array.isArray(obj)) return obj.length === 0
  else if (typeof obj == 'object')
    return obj == null || Object.keys(obj).length === 0
  else if (typeof obj == 'boolean') return false
  else return !obj
}

export default function ({ $axios, app, redirect}) {
  $axios.create({
    baseURL: `${process.env.apiBaseUrl}`,
    json: true,
    withCredentials: false,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers':
        'Origin, Content-Type, X-Auth-Token, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': true,
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
  })
  $axios.onRequest((config) => {
    if(app.$auth.strategy.token.status()._status === "UNKNOWN" || app.$auth.strategy.token.status()._status === false){
      app.$auth.strategy.token.reset()
      app.$auth.strategy.refreshToken.reset()
      app.$auth.$storage.removeUniversal('user')
      app.$auth.reset()
      setTimeout(function () {
        redirect("/login")
      }, 2000)
    }else{
      $axios.setToken(app.$auth.user.api_token, 'Bearer')
    }
    console.log('Making request to ' + config.url)
  })
  $axios.onError((error) => {
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        console.log(error)
      }
      if (code === 401 || code === 403) {
        app.$auth.strategy.token.reset()
        app.$auth.strategy.refreshToken.reset()
        app.$auth.$storage.removeUniversal('user')
        app.$auth.reset()
        app.$izitoast.error({
          title: 'Hata!',
          message:
            'Oturum Süreniz Doldu. İşlem Yapabilmek İçin Lütfen Tekrar Giriş Yapın. Anasayfaya Yönlendiriliyorsunuz.',
          position: 'topCenter',
          displayMode: 'once',
        })
        setTimeout(function () {
          redirect("/login")
        }, 2000)
      }
  })
}
