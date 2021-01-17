<template>
  <div class="v-catalog-item" >
<!--    <img class="v-catalog-item__image" src="../assets/test_pic.png" alt="img">-->
    <img class="v-catalog-item__image" :src=" require('../../assets/' + 'test_pic.png')" alt="img" @click="productClick">
    <p class="v-catalog-item__name subheader2">{{ product_data.name }}</p>
    <p class="v-catalog-item__category text">{{ product_data.category }}</p>
    <p class="v-catalog-item__price subheader1">{{ product_data.price }} р.</p>
    <button
        class="v-catalog-item__add_to_cart_btn btn"
        @click="addToCart">Купить
    </button>
  </div>
</template>

<script>

export default {
  name: "v-catalog-item",
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart",this.product_data)
    },
    productClick(){
      this.$emit("productClick",this.product_data.id)
    }
  }
}
</script>

<style scoped lang="scss">
.v-catalog-item:hover {
  box-shadow: 0 0 8px 0 dimgrey;
  border: 0;
  border-radius: $radius;
}
.v-catalog-item {
  position: relative;
  width: 295px;
  height: 400px;
  margin-bottom: $margin*2;

  &__image {
    /* image 2 */
    position: absolute;
    width: 180px;
    height: 180px;
    left: calc(50% - 180px / 2 - 0.5px);
    top: 54px;
    mix-blend-mode: darken;
  }

  &__name {
    /* BioTech BCAA + B6 */
    position: absolute;
    width: 189px;
    height: 32px;
    left: 25px;
    top: 286px;

    /* identical to box height, or 160% */
    display: flex;
    align-items: center;
    /* Blue100 */
    color: #2A2A33;
  }

  &__category {
    /* BCAA */
    position: absolute;
    width: 45px;
    height: 20px;
    left: 25px;
    top: 318px;

    /* identical to box height, or 125% */

    display: flex;
    align-items: center;
    letter-spacing: 0.02em;
    /* Blue100 */
    color: #2A2A33;
  }

  &__price {
    /* 100500 р. */
    position: absolute;
    width: 119px;
    height: 32px;
    left: 25px;
    top: 330px;

    /* identical to box height, or 133% */
    display: flex;
    align-items: center;

    /* Blue100 */
    color: #2A2A33;
  }

  &__add_to_cart_btn {
    position: absolute;
    left: calc(50% - 65px/2 + 78px);
    top: 355px;
  }
}
</style>