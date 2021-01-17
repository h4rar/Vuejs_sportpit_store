<template>
  <div v-if="isValidStatus" class="v-lk-address">
    <p>{{ address_data.street }}</p>
    <p>{{ address_data.house }}</p>
    <p>{{ address_data.room }}</p>
    <p>{{ address_data.index }}</p>
    <button @click="deleteAddress(address_data.id)">Удалить</button>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import axios from "axios";

export default {
  name: "v-lk-address",
  data() {
    return {
      active: {
        a: "ACTIVE"
      }
    }
  },

  props: {
    address_data: {
      type: Object,
      default() {
        return [];
      }
    }
  },
  methods: {
    ...mapActions([
      'GET_LK_FROM_API'
    ]),
    deleteAddress(id) {
      axios({url: 'https://api-sportpit.herokuapp.com/api/address/' + id, method: 'DELETE'})
      this.$emit('deleteAddress')
    },
  },
  computed: {
    isValidStatus: function () {
      return this.address_data.basicStatus === this.active.a
    }
  }
}
</script>

<style scoped lang="scss">
.v-lk-address {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 8px 0 dimgrey;
  border: 0;
  border-radius: $radius;
}
</style>