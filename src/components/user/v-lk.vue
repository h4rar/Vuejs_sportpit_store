<template>
  <div class="v-lk">
    <div class="div1">
      <p class="subheader2">Изменить данные</p>
      <form class="info" @submit.prevent="update_user">
        <div class="center_div">
          <p class="subheader3 left">Login</p>
        </div>
        <input class="text" required :value="LK.username" @input="loginInput($event.target.value)">
        <div class="center_div">
          <p class="subheader3 left">Имя</p>
        </div>
        <input class="text" required :value="LK.firstName" @input="firstNameInput($event.target.value)">
        <div class="center_div">
          <p class="subheader3 left">Фамилия</p>
        </div>
        <input class="text" required :value="LK.lastName" @input="lastNameInput($event.target.value)">
        <div class="center_div">
          <p class="subheader3 left">E-mail</p>
        </div>
        <input class="text" required :value="LK.email" @input="emailInput($event.target.value)" type="email">
        <div class="center_div">
          <p class="subheader3 left">Телефон</p>
        </div>
        <input class="text" required :value="LK.phone" @input="phoneInput($event.target.value)">
        <div>
          <button class="btn_in subheader3" type="submit">Изменить</button>
        </div>
      </form>

    </div>
    <div class="div2">
      <p class="subheader2">Добавить адрес</p>
      <form class="info" @submit.prevent="add_address">
        <div class="center_div">
          <p class="subheader3 left">Улица</p>
        </div>
        <input class="text" required v-model="street">
        <div class="center_div">
          <p class="subheader3 left">Дом</p>
        </div>
        <input class="text" required v-model="house">
        <div class="center_div">
          <p class="subheader3 left">Квартира</p>
        </div>
        <input class="text" required v-model="room">
        <div class="center_div">
          <p class="subheader3 left">Индекс</p>
        </div>
        <input class="text" required v-model="index">
        <div>
          <button class="btn_in subheader3" type="submit">Добавить</button>
        </div>
      </form>
    </div>

    <div class="address">
      <p class="subheader2">Мои адреса</p>
        <div class="v-address__list">
          <vLkAddressItem
              v-for="(address,index)  in LK.address"
              :key="address.id"
              v-bind:address_data="address"
              @deleteAddress="deleteAddress(index)"
          />
        </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vLkAddressItem from "@/components/user/v-lk-address-item";

export default {
  name: "v-lk",
  components: {
    vLkAddressItem
  },
  data() {
    return {
      user: {
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      },
      street: "",
      house: "",
      room: "",
      index: "",
    }
  },

  computed: {
    ...mapGetters([
      "LK",
    ]),
  },
  methods: {
    ...mapActions([
      'GET_LK_FROM_API',
      'DELETE_ADDRESS',
      'UPDATE_PATH'
    ]),
    deleteAddress(index) {
      this.DELETE_ADDRESS(index)
    },
    update_user: function () {
      this.$store.dispatch('update_user', this.user)
          // .then(() => this.$router.push('/login'))
          .catch(err => console.log(err))
    },
    loginInput(value) {
      this.user.username = value;
    },
    firstNameInput(value) {
      this.user.firstName = value;
    },
    lastNameInput(value) {
      this.user.lastName = value;
    },
    emailInput(value) {
      this.user.email = value;
    },
    phoneInput(value) {
      this.user.phone = value;
    },
    add_address: function () {
      let data = {
        street: this.street,
        house: this.house,
        room: this.room,
        index: this.index,
      }
      this.$store.dispatch('add_address', data)
          .catch(err => console.log(err))

      this.street = ""
      this.house = ""
      this.room = ""
      this.index = ""
    },
    go_my_orders() {
      this.UPDATE_PATH("Мои заказы")
    }
  },

  mounted() {
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.UPDATE_PATH("Личный кабинет")
    this.GET_LK_FROM_API()
  },
}
</script>

<style scoped lang="scss">
//.v-address__list {
//  display: inline-list-item;
//  width: 800px;
//  position: relative;
//}

.div1, .div2 {
  display: inline-block;
  margin-left: 100px;
  width: 250px;
  height: 420px;
  //background: #ff846b;
}

.left {
  text-align: left;
}

input {
  width: 250px;
  height: 30px;
  border: none;
  border-radius: $radius;
  background: $gray
}

p {
  margin-top: 15px;
  margin-bottom: 0;
}

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
.address{
  width: 700px;
  height: 200px;
  padding-top: 10px;
  display: inline-block;
}
.div1{
  margin-left: 150px;
}
</style>