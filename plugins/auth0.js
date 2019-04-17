import Auth0Lock from 'auth0-lock'
import nuxtConfig from '~/nuxt.config.js'
const config = nuxtConfig.auth0

class Auth0Util {
  showLock(container) {
    const lock = new Auth0Lock(
      config.clientID,
      config.domain,
      {
        container,
        closable: false,
        auth: {
          responseType: 'token_id_token',
          // Auth 0 で 認証 が 完了 し た 後 の リダイレクト 先 を 指定
          redirectUrl: this.getBaseUrl() + '/callback',
          params: {
            scope: 'openid profile email'
          }
        }
      })
    lock.show()
  }

  getBaseUrl() {
    return `${window.location.protocol}//${window.location.host}`
  }

  // getQueryParams() {
  //   return queryString.parse(location.hash)
  // }
}

export default (context, inject) => {
  inject('auth0', new Auth0Util)
}