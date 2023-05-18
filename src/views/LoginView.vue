<template>
  <div>
    <label for="user">
      User: <input name="user" type="text" v-model="user.nickname" /> 
    </label>
    <label for="password">   
       Password: <input name="password" type="password" v-model="user.password"/> 
    </label>
    <button @click="login">Login</button>

    
  </div>
</template>

<script>
import { useLoginStore } from '../stores/login'
export default {
  components: { useLoginStore },
  setup() {
        const {loginStore} = useLoginStore();
        return { loginStore }
    },
    data() {
        return {
            user: { nickname: '', password: '' }
        }
    },
    methods: {
      login(){
        const {nickname, password} = this.user
      if(nickname == "ea" && password == "eaea"){
        this.loginStore({nickname: nickname, permissions: ['banda']})
        this.$router.push("/")
      }
      }
    }
}
</script>

<style></style>
