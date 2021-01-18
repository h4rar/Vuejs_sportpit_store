<template>
  <div class="v-cart-item">
    <img v-if="cart_item_data.picPath !== null" class="v-cart-item__image" :src="cart_item_data.picPath" alt="img">
    <img v-else class="v-cart-item__image" src="../../assets/test_pic.png" alt="img">
    <p>{{ cart_item_data.name }}</p>
    <span>
          <button class="quantity__btn" @click="decrementItem">-</button>
          {{ cart_item_data.quantity }}
          <button class="quantity__btn" @click="incrementItem">+</button>
    </span>
    <p>{{ cart_item_data.price }} р.</p>
    <button class="del__btn" @click="deleteFromCart">X</button>
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
  margin: $margin;
  padding-left: $padding*2;
  padding-right: $padding*2;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  background: $gray;
  border: 0;
  border-radius: $radius;

  &__image {
    max-width: 50px;
  }

  .quantity__btn {
    padding: $padding $padding*2;
    background: $gray2;
    color: $blue;
    border: 0;
    border-radius: $radius;
    outline: none;
    cursor: pointer;

    &:hover {
      background: $white;
    }
  }

  .del__btn {
    padding: $padding/2 $padding;
    background: $gray2;
    color: $blue;
    border: 0;
    border-radius: $radius;
    outline: none;
    cursor: pointer;

    &:hover {
      background: $red-bg;
      color: $white;
    }
  }
}

</style>