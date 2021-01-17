<template>
  <div class="v-my-orders">
    <div class="v-my-orders__list">
      <vMyOrdersItem
          v-for="order in ORDERS"
          :key="order.id"
          v-bind:order_data="order"
      />
    </div>
  </div>
</template>

<script>
import vMyOrdersItem from "@/components/order/v-orders-item";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "v-my-orders",
  components: {
    vMyOrdersItem
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters([
      "ORDERS"
    ]),
  },
  methods: {
    ...mapActions([
      'GET_ORDERS_FROM_API',
      'UPDATE_PATH'
    ]),
  },
  mounted() {
    this.UPDATE_PATH("Мои заказы")
    this.GET_ORDERS_FROM_API()
  },
}
</script>

<style scoped>

</style>