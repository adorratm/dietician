/**
 * isEmpty
 * @param obj
 * @returns {boolean}
 */
function isEmpty(obj) {
  try {
    if (typeof obj == 'number') return false
    else if (typeof obj == 'string') return obj.length === 0
    else if (Array.isArray(obj)) return obj.length === 0
    else if (typeof obj == 'object')
      return obj == null || Object.keys(obj).length === 0
    else if (typeof obj == 'boolean') return false
    else return !obj
  }catch (e){
    console.log(e)
  }
}

export default function ({ $axios, app, redirect}) {
  $axios.create({
    baseURL: `${process.env.apiBaseUrl}`,
    json: true,
    withCredentials: false,
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE',
      'Access-Control-Allow-Credentials': true,
      'Content-type': 'application/json',
    },
    credentials: 'same-origin',
  })
  $axios.onRequest((config) => {
    if(!isEmpty(app.$auth.user) && !isEmpty(app.$auth.user.api_token)){
      if(app.$auth.strategy.token.status()._status === "UNKNOWN" || app.$auth.strategy.token.status()._status === false){
        let user = app.$auth.storage.getUniversal("user")
        app.$auth.strategy.token.reset()
        app.$auth.strategy.refreshToken.reset()
        app.$auth.$storage.removeUniversal('user')
        app.$auth.reset()
        setTimeout(function () {
          if(!isEmpty(user)){
            if(user.status === "admin"){
              redirect("/panel/login")
            }else if(user.status === "dietician"){
              redirect("/dietician-panel/login")
            }else{
              redirect("/login")
            }
          }else{
            redirect("/login")
          }
        }, 2000)
      }else{
        $axios.setToken(app.$auth.user.api_token, 'Bearer')
      }
    }
    console.log('Making request to ' + config.url)
  })
  $axios.onError((error) => {
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        console.log(error)
      }
      if (code === 401 || code === 403) {
        if(!isEmpty(app.$auth.user) && !isEmpty(app.$auth.user.api_token)){
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

      }
  })
}
