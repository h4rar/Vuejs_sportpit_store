<template>
  <div class="v-update-product">
    <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">
      <label>Название</label>
      <input type="text" :value="PRODUCT.name" id="name" name="name"><br>
      <label>Цена</label>

      <input type="text" :value="PRODUCT.price" id="price" name="price"><br>
      <div>
        <label>Акция</label>
        <select id="saleStatus" name="saleStatus">
          <option
              v-bind:value="SALE"> {{ SALE }}
          </option>
          <option
              v-bind:value="NOT_SALE"> {{ NOT_SALE }}
          </option>
        </select>
      </div>
      <label>Старая цена</label>
      <input type="text" id="oldPrice" name="oldPrice"><br>

      <label>Количество</label>
      <input type="text" :value="PRODUCT.quantity" id="quantity" name="quantity"><br>
      <label>Описание</label>
      <input type="text" :value="PRODUCT.description" id="description" name="description"><br>
      <div>
        <label>Категория</label>
        <select id="categoryId" name="categoryId">
          <option v-for="c in CATEGORIES"
                  :key="c.id"
                  v-bind:value="c.id"> {{ c.name }}
          </option>
        </select>
      </div>
      <label>Изображение</label>
      <input type="file" id="file" name="file" multiple><br>
      <input type=button value="Изменить" @click="this.uploadFiles">
    </form>
  </div>
</template>

<script>
import axios from "axios";
import {mapGetters} from "vuex";

export default {
  name: "v-update-product",
  data(){
    return{
      SALE: "SALE",
      NOT_SALE: "NOT_SALE",
    }
  },
  computed: {
    ...mapGetters([
      "CATEGORIES",
      "PRODUCT"
    ]),
  },

  mounted() {
  },
  methods: {
    uploadFiles() {
      const data = new FormData(document.getElementById('uploadForm'))

      var imagefile = document.querySelector('#file')
      console.log(imagefile.files[0]!==undefined)
      if(imagefile.files[0]!==undefined){
        data.append('pic', imagefile.files[0])
      }
      axios.patch('https://api-sportpit.herokuapp.com/api/admin/products/'+this.PRODUCT.id, data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
          .then(response => {
            console.log(response)
            this.$router.push('/')
            this.$router.go()
          })
          .catch(error => {
            console.log(error.response)
          })
    }
  }
}
</script>

<style scoped>

</style>