import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
    state: () => {
        return { isLogin: false, user: {nickname: '', permissions: [] } }
    },
    getters: {
        userInfo(){
            return this.user
        }
    },
    actions: {
        logoutStore() {
            console.log("logout")
            this.isLogin = false
            this.user = { nickname: '', permissions: [] }
        },
        loginStore(user) {
            this.isLogin = true
            this.user = user
            console.log(this.isLogin)
        },
        havePermissions(access) {        
            return this.user.permissions.filter(p => p == access).length > 0 ?  true: false
        },


    },
})