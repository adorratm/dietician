function isEmpty( obj ) {
  if ( typeof obj == "number" ) return false;
  else if ( typeof obj == "string" ) return obj.length === 0;
  else if ( Array.isArray( obj ) ) return obj.length === 0;
  else if ( typeof obj == "object" )
    return obj == null || Object.keys( obj ).length === 0;
  else if ( typeof obj == "boolean" ) return false;
  else return !obj;
};
export default function ( context ) {
  if ( ( isEmpty( context.store.$auth.$storage.syncUniversal( "user" ) ) || context.store.$auth.$storage.syncUniversal( "user" ).status !== "admin" ) ) {
    context.redirect( "/auth" )
  }
}
