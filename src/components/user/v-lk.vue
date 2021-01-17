<template>
  <div class="v-lk">
    <div>
      <form class="info" @submit.prevent="update_user">
        <label>Login</label>
        <input required :value="LK.username" @input="loginInput($event.target.value)">
        <label>Имя</label>
        <input required :value="LK.firstName" @input="firstNameInput($event.target.value)">
        <label>Фамилия</label>
        <input required :value="LK.lastName" @input="lastNameInput($event.target.value)">
        <label>E-mail</label>
        <input required :value="LK.email" @input="emailInput($event.target.value)" type="email">
        <label>Телефон</label>
        <input required :value="LK.phone" @input="phoneInput($event.target.value)">
        <button type="submit">Изменить</button>
      </form>
      <div class="v-address__list">
        <vLkAddressItem
            v-for="(address,index)  in LK.address"
            :key="address.id"
            v-bind:address_data="address"
            @deleteAddress="deleteAddress(index)"
        />
      </div>
      <form class="addAddress" @submit.prevent="add_address">
        <label>Улица</label>
        <input required v-model="street">
        <label>Дом</label>
        <input required v-model="house">
        <label>Квартира</label>
        <input required v-model="room">
        <label>Индекс</label>
        <input required v-model="index">
        <button type="submit">Добавить</button>
      </form>
    </div>
    <router-link :to="{name: 'orders'}">
      <div @click="go_my_orders">Мои заказы</div>
    </router-link>
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
    go_my_orders(){
      this.UPDATE_PATH("Мои заказы")
    }
  },

  mounted() {
    this.UPDATE_PATH("Личный кабинет")
    this.GET_LK_FROM_API()
  },
}
</script>

<style scoped lang="scss">
.v-address__list {
  display: inline-list-item;
  width: 800px;
  position: relative;
}
</style>