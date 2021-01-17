<template>
  <div class="v-register">
    <div>
      <form class="register" @submit.prevent="register">
        <label>Login</label>
        <input required v-model="username">
        <label>Фамилия</label>
        <input required v-model="firstName">
        <label>Имя</label>
        <input required v-model="lastName">
        <label>E-mail</label>
        <input required v-model="email" type="email">
        <label>Телефон</label>
        <input required v-model="phone">
        <label>Password</label>
        <input required v-model="password" type="password"/>
        <button type="submit">Регистрация</button>
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
      firstName : "",
      lastName : "",
      email : "",
      phone : "",
      password : ""
    }
  },
  methods: {
    ...mapActions([
      'UPDATE_PATH'
    ]),
    register: function () {
      let data = {
        username: this.username,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        password: this.password,
      }
      this.$store.dispatch('register', data)
          .then(() => this.$router.push('/login'))
          .catch(err => console.log(err))
    }
  },
  mounted() {
    this.UPDATE_PATH("Регистрация")
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