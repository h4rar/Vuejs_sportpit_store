<template>
  <div class="v-one-product">
    <!--    <p>{{PRODUCT.commentDto.length}}</p>-->
    <div class="ticket">
      <img class="__image" :src=" require('../../../assets/' + 'test_pic.png')" alt="img">
      <div class="info">
        <p class="h4h4 name">{{ PRODUCT.name }}</p>
        <p class="text category">{{ PRODUCT.category }}</p>
        <p class="subheader1">Цена: <b>{{ PRODUCT.price }} р.</b></p>
        <button @click="addToCard"
                class="subheader2_italic btn">
          Добавить в корзину
        </button>
      </div>
    </div>

    <div class="tabs">
      <input type="radio" name="tab-btn" id="tab-btn-1" value="" checked>
      <label for="tab-btn-1" class="subheader2">Описание</label>
      <input type="radio" name="tab-btn" id="tab-btn-2" value="">
      <label for="tab-btn-2" class="subheader2">Комментарии</label>

      <div id="content-1">
        {{ PRODUCT.description }}
      </div>
      <div id="content-2">
        <form class="new_comment" @submit.prevent="new_comment">
          <input required v-model="comment">
          <button type="submit">Отпрравить</button>
        </form>

        <div>
          <vCommentItem
              v-for="comment  in PRODUCT.commentDto"
              :key="comment.id"
              v-bind:comment_data="comment"
          />
        </div>

      </div>
    </div>

    <input type="hidden" v-model="product">
    <input type="hidden" v-model="componentKey">
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import vCommentItem from "@/components/catalog/product/v-comment-item";

export default {
  name: "v-one-product",
  components: {
    vCommentItem
  },
  data() {
    return {
      description: true,
      commentDto: false,
      comment: "",
      ck: 0
    }
  },
  computed: {
    ...mapGetters([
      "PRODUCT",
    ]),
    componentKey() {
      let e = this.ck + 1
      return e
    },
    product() {
      if (this.$route.query.product) {
        this.GET_ONE_PRODUCT_FROM_API(this.$route.query.product)
      }
      return this.$route.query.product
    }
  },
  methods: {
    ...mapActions([
      'GET_ONE_PRODUCT_FROM_API',
      'ADD_TO_CART',
      'add_comments'
    ]),
    forceRerender() {
      this.componentKey += 1;
    },
    addToCard() {
      this.ADD_TO_CART(this.PRODUCT);
    },
    new_comment: function () {
      let data = {
        text: this.comment,
        id: this.PRODUCT.id
      }


      this.$store.dispatch("add_comments", data)
      this.GET_ONE_PRODUCT_FROM_API(this.PRODUCT.id)
      this.GET_ONE_PRODUCT_FROM_API(this.PRODUCT.id)
          .then(function () {
            this.forceRerender()
          });

      //     .then(() => {
      //   // this.$store.dispatch("getCountryList");
      //   console.log("add_comments")
      // });

      // this.$store.dispatch('add_comments', data)
      //     .then(function () {
      //       console.log("add_comments")
      //       // this.GET_ONE_PRODUCT_FROM_API(this.$route.query.product)
      //       //     .then(function () {
      //       //       console.log(this.forceRerender())
      //       //       this.forceRerender()
      //       //     });
      //     });
    }
  },
}
</script>

<style scoped lang="scss">
.v-one-product {
}

.name {
  margin-top: 25px;
}

.ticket {
  float: left !important;
  display: inline-block;
  margin-left: 25px;
  width: 957px;
  height: 288px;
  padding-bottom: 35px;
}

.info {
  display: inline-block;
  float: right;
  text-align: left;
  margin-right: 200px;
}

.__image {
  float: left;
  margin-left: 110px;
  width: 288px;
  height: 288px;
}

.category {
  margin: 0;
}


*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  font-size: 16px;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

.tabs {
  text-align: justify;
  float: right !important;
  display: inline-block;
  font-size: 0;
  width: 900px;
  margin-left: 10px;
  margin-top: 28px;
  margin-right: 50px;
}

.tabs > input[type="radio"] {
  display: none;
}

.tabs > div {
  /* скрыть контент по умолчанию */
  display: none;
  border: 1px solid #e0e0e0;
  padding: 10px 15px;
  font-size: 16px;
}

/* отобразить контент, связанный с вабранной радиокнопкой (input type="radio") */
#tab-btn-1:checked ~ #content-1,
#tab-btn-2:checked ~ #content-2, {
  display: block;
}

.tabs > label {
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  padding: 2px 8px;
  font-size: 16px;
  line-height: 1.5;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
  cursor: pointer;
  position: relative;
  top: 1px;
}

.tabs > label:not(:first-of-type) {
  border-left: none;
}

.tabs > input[type="radio"]:checked + label {
  background-color: #fff;
  border-bottom: 1px solid #fff;
}
</style>