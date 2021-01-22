<template>
  <div class="v-category">
    <div class="search">
      <input type="text" v-model="searchText" class="search-field" placeholder="Поиск">
      <button @click="search">
        <img src="https://image.flaticon.com/icons/svg/49/49116.svg" alt="" class="search-icon">
      </button>
    </div>
    <div class="v-category__list">
      <vCategoryItem
          v-for="(category,index)  in CATEGORIES"
          :key="category.id"
          v-bind:category_data="category"
          @categoryNameClick="categoryNameClick(index)"
      />
    </div>
  </div>
</template>

<script>
import vCategoryItem from "./v-category-item"
import {mapActions, mapGetters} from "vuex"

export default {
  name: "v-category",
  components: {
    vCategoryItem
  },
  data() {
    return {
      searchText: "",
      category: ""
    }
  },
  computed: {
    ...mapGetters([
      "CATEGORIES",
      "PATH"
    ]),
  },
  methods: {
    ...mapActions([
      'GET_CATEGORIES_FROM_API',
      'GET_PRODUCTS_FROM_API',
      "UPDATE_PATH",
    ]),
    search() {
      let searchText = this.searchText
      let category = this.PATH.name
      let sale = ""
      if (category==="Главная"){
        category=""
      }
      if (category==="Акции"){
        sale="SALE"
        category=""
      }
      this.$store.dispatch('SEARCH', {searchText, category, sale})
    },
    categoryNameClick(index) {
      let category = this.CATEGORIES[index].name
      this.UPDATE_PATH(category)
      let searchText = this.searchText
      this.$router.push('/')
      this.$store.dispatch('SEARCH', {searchText, category})
    },
  },
  mounted() {
    this.GET_CATEGORIES_FROM_API()
  },
}
</script>

<style scoped lang="scss">
.v-category__list {
}

.search {
  margin-left: 12px;
  margin-top: 15px;
  margin-bottom: 5px;
  display: inline-flex;
  height: 22px;
  background: $gray;
  border-radius: $radius;
  padding: 10px;
}

.search-icon {
  width: 20px;
  margin-right: 10px;
  order: -1;
}

.search-field {
  background: $gray;
  width: 150px;
  //height: 34px;
  border: 0;
}

.search-field:focus {
  outline: none;
}

button {
  background-color: Transparent;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
  overflow: hidden;
  outline: none;
}

.search-field:focus + .search-icon {
  /* стили для иконки при фокусе поля */
}

</style>