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
export default function ( context ) {
  try {
    if (!isEmpty(context.store.$auth.$storage.getUniversal( "user" )) && context.store.$auth.user !== false ) {
      if(process.client){
        window.location.href="/"
      }else{
        context.redirect( "/" )
      }

    }
  }catch (e) {
    console.log(e)
  }
}
