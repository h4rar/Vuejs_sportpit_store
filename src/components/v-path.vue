<template>
  <div class="v-path">
    <p class="subheader2 path">{{ PATH.name }}</p>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "v-path",

  computed: {
    ...mapGetters([
      "PATH"
    ]),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    }
  },
}
</script>


<style scoped lang="scss">
.path{
  text-align: left;
  margin-left: 300px;
}

</style>