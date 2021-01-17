<template>
  <div class="v-cart">
    <h1>Корзина</h1>
    <p v-if="!cart_data.length">Ваша корзина пуста</p>
    <v-cart-item
        v-for="(item,index) in cart_data"
        :key="item.id"
        :cart_item_data="item"
        @deleteFromCart="deleteFromCart(index)"
        @decrement="decrement(index)"
        @increment="increment(index)"
    />
    <div v-if="cart_data.length" class="v-cart__total">
      <p class="total__name">Итого:</p>
      <p>{{ cartTotalConst }} р.</p>
    </div>

    <div>
      <input type="radio" value="Бесплатная_доставка" v-model="dataVersionDelivery">
      <label>Бесплатная доставка</label>
      <br>
      <input type="radio" value="Самовывоз" v-model="dataVersionDelivery">
      <label>Самовывоз магазин ''Атлетера'' г.Томск ул.Котовского, 26</label>
      <br>
    </div>

    <div>
      <select v-model="dataAddress">
        <option  v-for="ad in LK.address"
                :key="ad.id"
            v-bind:value="ad.id">ул. {{ ad.street }}, д.{{ ad.house }}, кв.{{ ad.room }}</option>
      </select>
    </div>

    <div>
      <input type="radio" value="Наличный" v-model="dataPaymentMethod">
      <label>Наличный расчет</label>
      <br>
      <input type="radio" value="Банковской_картой" v-model="dataPaymentMethod">
      <label>Оплата банковской картой</label>
      <br>
      <input type="radio" value="Онлайн" v-model="dataPaymentMethod">
      <label>Онлайн оплата</label>
    </div>

    <button @click="create_order">Оформить</button>
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
      'GET_ORDERS_FROM_API'
    ]),
    increment(index) {
      this.INCREMENT_CART_ITEM(index)
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
  &__total {
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    padding: $padding*3;
    display: flex;
    justify-content: center;
  }

  .total__name {
    margin-right: $margin * 2;
  }
}
</style>