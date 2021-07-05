export default function ( context ) {
  if (context.$auth.loggedIn && context.store.$auth.$storage.syncUniversal( "user" ).status === "admin"  ) {
    context.redirect( "/panel" )
  }
}
