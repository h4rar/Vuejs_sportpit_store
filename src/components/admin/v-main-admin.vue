<template>
  <div class="v-main-admin">
    <router-link :to="{name: 'orders-admin'}">
      <li>Посмотрть список заказов</li>
    </router-link>
    <hr>
    <p>Добавить новый товар</p>
    <form id="uploadForm" name="uploadForm" enctype="multipart/form-data">
      <label>Название</label>
      <input type="text" id="name" name="name"><br>
      <label>Цена</label>
      <input type="text" id="price" name="price"><br>
      <label>Количество</label>
      <input type="text" id="quantity" name="quantity"><br>
      <label>Описание</label>
      <input type="text" id="description" name="description"><br>
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
      <input type=button value="Добавить товар" @click="this.uploadFiles">
    </form>
    <hr>
    <p>Добавить категорию</p>
    <form class="register" @submit.prevent="addCategory">
      <label>Название</label>
      <input required v-model="name">
      <button type="submit">Добавить категорию</button>
    </form>

  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from "vuex";

export default {
  name: "v-main-admin",
  data() {
    return {
      name: "",
    }
  },

  computed: {
    ...mapGetters([
      "CATEGORIES",
    ]),
  },

    methods: {
      addCategory() {
        let name = this.name
        this.$store.dispatch('add_new_category', {name})
      },


      uploadFiles() {
        const data = new FormData(document.getElementById('uploadForm'))
        var imagefile = document.querySelector('#file')
        data.append('pic', imagefile.files[0])
        axios.post('https://api-sportpit.herokuapp.com/api/admin/products', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
            .then(response => {
              console.log(response)
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