<template>
  <div class="v-contacts">
    <div class="info">
      <p class="subheader2 name">Интернет магазин спортивного питпния "Атлетера"</p>
      <p class="text">(3822) 57-68-20</p>
      <p class="text">+7-913-827-68-20</p>
      <p class="text">Пн - Вс c 1100 до 1900</p>
      <p class="text">Наличный расчет, VISA, Mastercard</p>
      <p class="subheader2">г.Томск ул.Котовского,26</p>
    </div>

    <img class="__image" src="../assets/map.png" alt="cart">
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "v-contacts",
  methods:{
    ...mapActions([
      'UPDATE_PATH'
    ]),
  },
  mounted() {
    this.UPDATE_PATH("Контакты")
  }
}
</script>

<style scoped>
.v-contacts {
  display: inline-block;
}

.info {
  position: relative;
  text-align: left;
}

.name {
  margin-top: 0;
}
</style>