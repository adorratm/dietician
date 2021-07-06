function isEmpty(obj) {
  if (typeof obj == 'number') return false
  else if (typeof obj == 'string') return obj.length === 0
  else if (Array.isArray(obj)) return obj.length === 0
  else if (typeof obj == 'object')
    return obj == null || Object.keys(obj).length === 0
  else if (typeof obj == 'boolean') return false
  else return !obj
}
export default function ( context ) {
  if ( !context.auth.loggedIn ) {
    context.redirect( "/login?url=" + decodeURIComponent( context.route.fullPath ) )
  }
}
