import { defineStore } from 'pinia'
export const useLoginStore = defineStore('login', {
    state: () => {
        return { isLogin: false, user: {nickname: '', permissions: [] } }
    },
    getters: {

    },
    actions: {
        logoutStore() {
            this.isLogin = false
        },
        loginStore() {
            this.isLogin = true
            console.log(this.isLogin)
        },
    },
})