<template>
<div class="v-orders-admin">
  <vAdminOrdersItem
      v-for="(order,index) in ORDERS_ADMIN"
      :key="order.id"
      v-bind:order_data="order"
      v-bind:i="index"
  />


<!--<p>{{ORDERS_ADMIN}}</p>-->
</div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vAdminOrdersItem from "@/components/admin/orders/v-admin-orders-item";

export default {
  name: "v-orders-admin",
  components: {
    vAdminOrdersItem
  },
  methods:{
    ...mapActions([
      'GET_ORDERS_ADMIN',
    ]),
  },
  computed:{
    ...mapGetters([
      'ORDERS_ADMIN'
    ]),
  },
  mounted() {
    this.GET_ORDERS_ADMIN()
  }
}
</script>


<style scoped>

</style>