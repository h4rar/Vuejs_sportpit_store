<template>
  <div class="v-catalog">
    <div class="v-catalog__list">
      <vCatalogItem
          v-for="product in PRODUCTS"
          :key="product.id"
          v-bind:product_data="product"
          @addToCart="addToCart"
          @productClick="productClick"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from "./v-catalog-item"
import {mapActions, mapGetters} from "vuex"

export default {
  name: "v-catalog",
  components: {
    vCatalogItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "PRODUCTS"
    ]),
  },
  methods: {
    ...mapActions([
      'GET_PRODUCTS_FROM_API',
      'ADD_TO_CART',
    ]),
    addToCart(data) {
      this.ADD_TO_CART(data);
    },
    productClick(id) {
      this.$router.push({name: 'one_product', query: {'product': id}})
    },
  },
  mounted() {
    this.GET_PRODUCTS_FROM_API()
  }
}
</script>

<style lang="scss">
.v-catalog {
  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: normal;
  }

  &__link_to_cart {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: $padding*2;
    border: solid 1px dimgray;
  }
}

</style>