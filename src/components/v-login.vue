<template>
  <div class="v-login">
    <div class="center_div">
      <form @submit.prevent="login">
        <p class="subheader2 left">Login </p>
        <input class="subheader2" required v-model="username">
        <p class="subheader2 left">Password</p>
        <input class="subheader2" required v-model="password" type="password"/>
        <div>
          <button class="btn_in subheader2" type="submit">Войти</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "v-login",
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_PATH',
    ]),
    login: function () {
      let username = this.username
      let password = this.password

      this.$store.dispatch('login', {username, password})
          .then(() => this.$router.push('/'))
          .then(() => this.$router.go())
          .catch(err => console.log(err))
      this.UPDATE_PATH("Главная")
    }
  },
  mounted() {
    this.UPDATE_PATH("Вход в личный кабинет")
  },
}
</script>

<style scoped lang="scss">

.btn_in {
  margin-top: 15px;
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
}

.center_div{
  display: inline-block;

  width: 200px;
  height: 200px;
  //background: #ff846b;
}
.left{
  text-align: left;
}
input{
  width: 200px;
  height: 30px;
  border: none;
  border-radius: $radius;
  background: $gray
}
p{
  margin-top: 15px;
  margin-bottom: 0;
}
</style>