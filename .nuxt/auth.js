import Middleware from './middleware'
import { Auth, authMiddleware, ExpiredAuthSessionError } from '~auth/runtime'

// Active schemes
import { RefreshScheme } from '~auth/runtime'

Middleware.auth = authMiddleware

export default function (ctx, inject) {
  // Options
  const options = {
  "resetOnError": false,
  "ignoreExceptions": false,
  "scopeKey": "scope",
  "rewriteRedirects": true,
  "fullPathRedirect": false,
  "watchLoggedIn": true,
  "redirect": false,
  "vuex": {
    "namespace": "auth"
  },
  "cookie": {
    "prefix": "auth.",
    "options": {
      "path": "/"
    }
  },
  "localStorage": {
    "prefix": "auth."
  },
  "defaultStrategy": "user"
}

  // Create a new Auth instance
  const $auth = new Auth(ctx, options)

  // Register strategies
  // user
  $auth.registerStrategy('user', new RefreshScheme($auth, {
  "token": {
    "property": "user.api_token",
    "required": true,
    "global": true,
    "type": "Bearer",
    "maxAge": 7200
  },
  "refreshToken": {
    "property": "user.api_token",
    "data": "user.api_token",
    "global": true,
    "type": "Bearer",
    "maxAge": 7200
  },
  "endpoints": {
    "login": {
      "url": "https://api.klinikdiyetisyen.com/api/users/login",
      "method": "post"
    },
    "refresh": {
      "url": "https://api.klinikdiyetisyen.com/api/users/login",
      "method": "post"
    },
    "logout": {
      "url": "https://api.klinikdiyetisyen.com/api/users/logout",
      "method": "post"
    },
    "user": {
      "url": "https://api.klinikdiyetisyen.com/api/users/profile",
      "method": "get",
      "autoFetch": true
    }
  },
  "autoLogout": true,
  "name": "user"
}))

  // dietician
  $auth.registerStrategy('dietician', new RefreshScheme($auth, {
  "token": {
    "property": "user.api_token",
    "required": true,
    "global": true,
    "type": "Bearer",
    "maxAge": 7200
  },
  "refreshToken": {
    "property": "user.api_token",
    "data": "user.api_token",
    "global": true,
    "type": "Bearer",
    "maxAge": 7200
  },
  "endpoints": {
    "login": {
      "url": "https://api.klinikdiyetisyen.com/api/dietician/login",
      "method": "post"
    },
    "refresh": {
      "url": "https://api.klinikdiyetisyen.com/api/dietician/login",
      "method": "post"
    },
    "logout": {
      "url": "https://api.klinikdiyetisyen.com/api/dietician/logout",
      "method": "post"
    },
    "user": {
      "url": "https://api.klinikdiyetisyen.com/api/dietician/profile",
      "method": "get",
      "autoFetch": true
    }
  },
  "autoLogout": true,
  "name": "dietician"
}))

  // admin
  $auth.registerStrategy('admin', new RefreshScheme($auth, {
  "token": {
    "property": "user.api_token",
    "required": true,
    "global": true,
    "type": "Bearer",
    "maxAge": 7200
  },
  "refreshToken": {
    "property": "user.api_token",
    "data": "user.api_token",
    "type": "Bearer",
    "global": true,
    "maxAge": 7200
  },
  "endpoints": {
    "login": {
      "url": "https://api.klinikdiyetisyen.com/api/panel/login",
      "method": "post"
    },
    "refresh": {
      "url": "https://api.klinikdiyetisyen.com/api/panel/login",
      "method": "post"
    },
    "logout": {
      "url": "https://api.klinikdiyetisyen.com/api/panel/logout",
      "method": "post"
    },
    "user": {
      "url": "https://api.klinikdiyetisyen.com/api/users/profile",
      "method": "get",
      "autoFetch": true
    }
  },
  "autoLogout": true,
  "name": "admin"
}))

  // Inject it to nuxt context as $auth
  inject('auth', $auth)
  ctx.$auth = $auth

  // Initialize auth
  return $auth.init().catch(error => {
    if (process.client) {
      // Don't console log expired auth session errors. This error is common, and expected to happen.
      // The error happens whenever the user does an ssr request (reload/initial navigation) with an expired refresh
      // token. We don't want to log this as an error.
      if (error instanceof ExpiredAuthSessionError) {
        return
      }

      console.error('[ERROR] [AUTH]', error)
    }
  })
}
