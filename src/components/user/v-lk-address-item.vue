<template>
  <div v-if="isValidStatus" class="v-lk-address">
    <p>ул.{{ address_data.street }}</p>
    <p>д. {{ address_data.house }}</p>
    <p>кв. {{ address_data.room }}</p>
    <p>индекс: {{ address_data.index }}</p>
    <button class="btn" @click="deleteAddress(address_data.id)">Удалить</button>
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
}
</style>