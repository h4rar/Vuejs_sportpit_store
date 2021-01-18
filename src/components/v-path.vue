<template>
  <div class="v-path">
    <p class="subheader2 path" v-if="PATH.name==='Личный кабинет'">
      <router-link
          class="l"
          :to="{name: 'lk'}"
      >Личный кабинет
      </router-link>
      <router-link
          class="l"
          :to="{name: 'orders'}"
      >Мои заказы
      </router-link>
    </p>
    <p v-else class="subheader2 path">{{ PATH.name }}</p>
      <input type="hidden" v-model="update">
  </div>

</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "v-path",
  data() {
    return {
      t: 0,
      isActive: true
    }
  },

  computed: {
    ...mapGetters([
      "PATH"
    ]),
    update() {
      return this.t + 1
    },
  },
  methods: {
    orderClick() {
      this.isActive = !this.isActive
    }
  }
}
</script>


<style scoped lang="scss">
.path {
  text-align: left;
  margin-left: 300px;
}

.l {
  text-decoration: none;
  color: $blue;
  margin: $margin;
  padding: $margin;
  //background: $gray;
}

.active {
  background: $gray;
}
</style>