<template>
  <div class="v-cart">
    <p v-if="!cart_data.length" class="subheader2">Ваша корзина пуста</p>

    <div class="orders">
      <div class="v-orders__list">
        <v-cart-item
            v-for="(item,index) in cart_data"
            :key="item.id"
            :cart_item_data="item"
            @deleteFromCart="deleteFromCart(index)"
            @decrement="decrement(index)"
            @increment="increment(index)"
        />
      </div>
    </div>

    <div class="summ subheader2" v-if="cart_data.length">
      <p>Итого: {{ cartTotalConst }} р.</p>
    </div>

    <router-link class="link" v-if="!LK.address.length && cart_data.length" :to="{name: 'lk'}">
      <li @click="go('Личный кабинет')">Для оформления заказа необходимо <u>добавить адрес доставки</u></li>
    </router-link>


    <div v-if="cart_data.length && LK.address.length" class="inffo">
      <div  class="left">
        <p class="subheader2">Способ доставки</p>
        <input type="radio" value="Бесплатная_доставка" v-model="dataVersionDelivery">
        <label class="subheader3">Бесплатная доставка</label>
        <br>
        <input type="radio" value="Самовывоз" v-model="dataVersionDelivery">
        <label class="subheader3">Самовывоз магазин ''Атлетера'' г.Томск ул.Ленина, 30</label>
        <br>

        <p class="subheader2">Адрес доставки</p>
        <div>
          <select class="text" v-model="dataAddress">
            <option class="text" v-for="ad in LK.address"
                    :key="ad.id"
                    v-bind:value="ad.id">ул. {{ ad.street }}, д.{{ ad.house }}, кв.{{ ad.room }}
            </option>
          </select>
        </div>

        <div>
          <p class="subheader2">Способ оплаты</p>
          <input type="radio" value="Наличный" v-model="dataPaymentMethod">
          <label>Наличный расчет</label>
          <br>
          <input type="radio" value="Банковской_картой" v-model="dataPaymentMethod">
          <label>Оплата банковской картой</label>
          <br>
          <input type="radio" value="Онлайн" v-model="dataPaymentMethod">
          <label>Онлайн оплата</label>
        </div>

      </div>
    </div>
    <button class="btn subheader2 right" @click="create_order">Оформить заказ</button>
  </div>
</template>

<script>
import vCartItem from "./v-cart-item"
import {mapActions, mapGetters} from "vuex"

export default {
  name: "v-cart",
  components: {
    vCartItem
  },
  data() {
    return {
      dataPaymentMethod: "",
      dataVersionDelivery: "",
      dataAddress: ""
    }
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    ...mapGetters([
      "LK",
      "ORDERS"
    ]),
    cartTotalConst() {
      let result = []
      if (this.cart_data.length) {
        for (let item of this.cart_data) {
          result.push(item.price * item.quantity)
        }
        result = result.reduce(function (sum, el) {
          return sum + el;
        })
        return result;
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM",
      "CREATE_NEW_ORDER",
      'GET_LK_FROM_API',
      'GET_ORDERS_FROM_API',
      'UPDATE_PATH',
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
    },
    go: function (name) {
      this.UPDATE_PATH(name)
    },
    create_order: function () {
      let obj = {};
      for (let i = 0; i < this.cart_data.length; i++) {
        obj[this.cart_data[i].id] = this.cart_data[i].quantity;
      }
      let data = {
        mapProducts: obj,
        addressId: this.dataAddress,
        delivery: this.dataVersionDelivery,
        paymentMethod: this.dataPaymentMethod,
        allPrice: this.cartTotalConst
      }
      this.$store.dispatch('CREATE_NEW_ORDER', data)
      this.GET_ORDERS_FROM_API()
      this.$router.push('orders')
    },
    decrement(index) {
      this.DECREMENT_CART_ITEM(index)
    },
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    }
  },
  mounted() {
    this.GET_LK_FROM_API()
  }
}
</script>

<style scoped lang="scss">
.v-cart {
  .total__name {
    margin-right: $margin * 2;
  }
}
input[type='radio']:after {
  width: 13px;
  height: 13px;
  border-radius: 13px;
  top: -1px;
  left: -1px;
  position: relative;
  background-color: #d1d3d1;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 1px solid $gray;
}

input[type='radio']:checked:after {
  width: 13px;
  height: 13px;
  border-radius: 13px;
  top: -1px;
  left: -1px;
  position: relative;
  background-color: $red-bg;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 1px solid $gray;
}
.orders {
  width: 850px;
  //height: 200px;
  padding-top: 10px;
  display: inline-block;
}

.inffo {
  width: 500px;
  height: 800px;
  display: inline-block;
  float: left;
  margin-left: 110px;
}

.select {
  width: 500px;
  height: 800px;
  display: inline-block;
  float: left;
  margin-left: 110px;
}

.summ {
  text-align: right;
  margin-right: 265px;
}

.left {
  text-align: left;
  //margin-right: 265px;
}
.link {
  color: $red-bg-hover;
}

.subheader2{
  margin-bottom: 0;
}
.right{
  margin-top: 270px;
  text-align: right;
}

</style>