<template>
  <div class="v-cart-item">
    <!--    <img :src=" require('../../assets/images/' + cart_item_data.image)" alt="cart">-->
    <img class="v-cart-item__image" :src=" require('../../assets/' + 'test_pic.png')" alt="cart">
    <!--    <img class="v-catalog-item__image" src="../assets/test_pic.png" alt="img">-->
    <div class="v-cart-item__info">
      <p>{{ cart_item_data.name }}</p>
      <p>{{ cart_item_data.price }}</p>
    </div>
    <div class="v-cart-item__quantity">
      <p>Количество</p>
      <span>
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{ cart_item_data.quantity }}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
    </div>
    <button @click="deleteFromCart">Удалить</button>
  </div>

</template>

<script>

export default {
  name: "v-cart-item",
  props: {
    cart_item_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    decrementItem() {
      this.$emit('decrement')
    },
    incrementItem() {
      this.$emit('increment')
    },
    deleteFromCart() {
      this.$emit('deleteFromCart')
    }
  },
  mounted() {
    this.$set(this.cart_item_data, 'quantity', 1)
  }
}
</script>

<style scoped lang="scss">
.v-cart-item {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 dimgrey;
  border: 0;
  border-radius: $radius;

  &__image {
    max-width: 50px;
  }

  .quantity__btn {
    cursor: pointer;
  }
}

</style>