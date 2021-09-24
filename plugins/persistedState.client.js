// ~/plugins/persistedState.client.js
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({
  isCompression: true
})
export default ({ store }) => {
  createPersistedState({
    overwrite:true,
    storage:{
      getItem:(key) => {
        return ls.get(key)
      },
      setItem:(key,value)=>{
        return ls.set(key,value)
      },
      removeItem:(key) =>{
        return ls.remove(key)
      }
    }
  })(store)
}
