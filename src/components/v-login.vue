<template>
  <div class="v-login">
    <div>
      <form class="login" @submit.prevent="login">
        <label>Login</label>
        <input required v-model="username">
        <label>Password</label>
        <input required v-model="password" type="password"/>
        <button type="submit">Login</button>
      </form>
    </div>


<!--    <div class="window">-->
<!--      <p class="input_text text">login:<br>-->
<!--          <input type="text" size="25">-->
<!--      </p>-->
<!--      <p class="text">password:<br>-->
<!--          <input type="password" size="25">-->
<!--      </p>-->
<!--      <button class="btn_in">-->
<!--        Войти-->
<!--      </button>-->
<!--    </div>-->

  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "v-login",
  data(){
    return {
      username : "",
      password : ""
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_PATH'
    ]),
    login: function () {
      let username = this.username
      let password = this.password
      this.$store.dispatch('login', { username, password })
          // .then(() => this.$router.go())
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
    }
  },
  mounted() {
    this.UPDATE_PATH("Вход в личный кабинет")
  },
}
</script>

<style scoped lang="scss">
.btn_in{
  padding: $padding $padding*2;
  background: $red-bg;
  color: #ffffff;
  border: 0;
  border-radius: $radius;
  outline: none;
  cursor: pointer;
  &:hover {
    background: $red-bg-hover;
  }


  .input_text{
    text-align: justify;
  }
}

</style>