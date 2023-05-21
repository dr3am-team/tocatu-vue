import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
  state: () => {
    return { isLogin: false, user: { username: '', permissions: [] } }
  },

  actions: {
    logoutStore() {
      console.log('logout')
      this.isLogin = false
      this.user = { username: '', permissions: [] }
    },
    loginStore(user) {
      this.isLogin = true
      this.user = user
    },
    havePermissions(access) {
      return this.user.permissions.filter((p) => p == access).length > 0 ? true : false
    }
  }
})
