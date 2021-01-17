<template>
  <div class="v-category-item">
    <a class="v-category-item subheader2" @click="categoryNameClick">{{ category_data.name }}</a>
  </div>
</template>

<script>
export default {
  name: "v-category-item",
  props: {
    category_data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    categoryNameClick() {
      this.$emit('categoryNameClick')
    },
  },
}
</script>

<style scoped lang="scss">
.v-category-item {
  width: 200px;
}

.v-category-item a {
  text-align: left;
  margin-left: 12px;
  background-color: $white;
  color: $blue;
  display: block;
  padding: 8px;
  text-decoration: none;
  cursor: pointer;
}

.v-category-item :hover {
  background-color: $gray;
}
</style>