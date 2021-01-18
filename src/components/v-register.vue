<template>
  <div class="v-register">
    <div>
      <div class="center_div">
        <form @submit.prevent="register">
          <p class="subheader2 left">Login</p>
          <input class="subheader2" required v-model="username">
          <p class="subheader2 left">Имя</p>
          <input class="subheader2" required v-model="firstName">
          <p class="subheader2 left">Фамилия</p>
          <input class="subheader2" v-model="lastName">
          <p class="subheader2 left">E-mail</p>
          <input class="subheader2" required v-model="email">
          <p class="subheader2 left">Телефон</p>
          <input class="subheader2" required v-model="phone">
          <p class="subheader2 left">Пароль</p>
          <input class="subheader2" required v-model="password" type="password">
          <div>
            <button class="btn_in subheader2" type="submit">Регистрация</button>
          </div>
        </form>
      </div>
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
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: ""
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

.center_div {
  display: inline-block;

  width: 200px;
  height: 200px;
  //background: #ff846b;
}

.left {
  text-align: left;
}

input {
  width: 200px;
  height: 30px;
  border: none;
  border-radius: $radius;
  background: $gray
}

p {
  margin-top: 15px;
  margin-bottom: 0;
}
</style>