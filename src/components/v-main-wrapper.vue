<template>
  <div class="v-main-wrapper">
    <div class="content">
      <div class="v-main-wrapper__login">
        <div class="__tel">+7(3822)25-54-51</div>
        <ul>
          <div v-if="isLoggedIn">
            <router-link class="auth" :to="{name: 'lk', params:{profile_profile: LK}}">
              <li @click="go('Личный кабинет')">Личный кабинет</li>
            </router-link>
            <router-link v-if="LK.role==='ROLE_ADMIN'" class="auth" :to="{name: 'admin'}">
              <li @click="go('Admin')" >Admin</li>
            </router-link>
            <li @click="logout">Выйти</li>
          </div>
          <div v-else>
            <router-link class="auth" :to="{name: 'login'}">
              <li @click="go('Вход в личный кабинет')">Вход</li>
            </router-link>
            <router-link class="auth" :to="{name: 'register'}">
              <li @click="go('Регистрация')" >Регистрация</li>
            </router-link>
          </div>
        </ul>
      </div>
      <div class="v-main-wrapper__menu">
        <router-link :to="{name: 'catalog'}">
          <div class="v-main-wrapper__link_to_catalog">
            <img @click="go_home" class="v-main-wrapper__logo" src="../assets/logo.png" alt="logo">
          </div>
        </router-link>
        <router-link class="v-main-wrapper__router-link" :to="{name: 'delivery'}">
          <div @click="go('Доставка/Оплата')" class="v-main-wrapper__link subheader2">ДОСТАВКА/ОПЛАТА</div>
        </router-link>
        <router-link class="v-main-wrapper__router-link" :to="{name: 'cart'}">
          <div @click="go('Акции')" class="v-main-wrapper__link subheader2">АКЦИИ</div>
        </router-link>
        <router-link class="v-main-wrapper__router-link" :to="{name: 'contacts'}">
          <div @click="go('Контакты')" class="v-main-wrapper__link subheader2">КОНТАКТЫ</div>
        </router-link>

        <router-link class="v-main-wrapper__router-link" :to="{name: 'cart', params:{cart_data: CART}}">
          <div @click="go('Корзина')" class="v-main-wrapper__link_to_cart subheader2">Корзина: {{ CART.length }}</div>
        </router-link>
      </div>
      <div class="div1">
        <vCategory></vCategory>
      </div>
      <div>
        <vPath :key="componentKey"></vPath>
        <input type="hidden" v-model="update">
      </div>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>


    </div>

    <div class="footer">
      <div class="footer">
        <div class="v-main-wrapper__bottom">
          <router-link class="v-main-wrapper__router-link" :to="{name: 'catalog'}">
            <div @click="go_home" class="v-main-wrapper__link_bottom subheader2">ГЛАВНАЯ</div>
          </router-link>
          <router-link class="v-main-wrapper__router-link" :to="{name: 'delivery'}">
            <div @click="go('Доставка/Оплата')" class="v-main-wrapper__link_bottom subheader2">ДОСТАВКА/ОПЛАТА</div>
          </router-link>
          <router-link class="v-main-wrapper__router-link" :to="{name: 'cart'}">
            <div @click="go('Акции')" class="v-main-wrapper__link_bottom subheader2">АКЦИИ</div>
          </router-link>
          <router-link class="v-main-wrapper__router-link" :to="{name: 'contacts'}">
            <div @click="go('Контакты')" class="v-main-wrapper__link_bottom subheader2">КОНТАКТЫ</div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import vCategory from "./category/v-category"
import vPath from "./v-path"

export default {
  name: 'v-main-wrapper',
  props: {},
  data() {
    return {
      componentKey: 0,
    }
  },
  computed: {
    ...mapGetters([
      "CART",
      "LK",
      "TOKEN"
    ]),
    isLoggedIn: function () {
      return this.$store.getters.isLoggedIn
    },
    update() {
      let newVar = this.t + 1;
      console.log(newVar)
      return newVar
    },
  },


  components: {
    vCategory,
    vPath
  },
  methods: {
    ...mapActions([
      'GET_LK_FROM_API',
      'UPDATE_PATH',
      'GET_PRODUCTS_FROM_API',
    ]),
    logout: function () {
      this.$store.dispatch('logout')
    },
    go_home: function () {
      this.UPDATE_PATH("Главная")
      this.GET_PRODUCTS_FROM_API()
    },
    go: function (name) {
      this.UPDATE_PATH(name)
    },
    forceRerender() {
      this.componentKey += 1;
    }
  },

  watch: {},
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.GET_LK_FROM_API()
      this.UPDATE_PATH("Главная")
      this.forceRerender()
    }
  },
}
</script>

<style lang="scss">
.div1 {
  float: left !important;
  display: inline-block;
}


.v-main-wrapper {
  max-width: 1280px;
  margin: 0 auto;

  &__link_to_cart {
    color: $white;
    padding: $padding;
    margin-right: 15px;
    background: $red-bg;
    border-radius: $radius;
    //border: solid 1px dimgray;

  }

  .auth {
    color: $gray;
  }

  &__router-link {
    text-decoration: none;
  }

  &__link {
    color: $blue;
  }

  &__link_to_catalog {
    padding-left: 17px;
  }

  &__logo {
    width: 135px;
    height: 36px;
  }

  &__login {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    width: 1280px;
    height: 33px;
    /* Blue100 */
    background: #2A2A33;
    color: $gray;
  }

  .__tel {
    margin-left: 23px;
  }

  li {
    display: inline-block;
    vertical-align: top;
    position: relative;
    text-decoration: none;
    margin-right: 15px;
    transition-property: background-color;
    transition-duration: 2s;
    list-style-type: none;
    cursor: pointer;
  }

  &__menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;

    width: 1280px;
    height: 60px;
    background: $gray;
  }

  .v-main-wrapper__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    width: 1280px;
    height: 60px;
    background: $blue;
  }

  .v-main-wrapper__link_bottom {
    margin-left: 90px;
    margin-right: 90px;
    color: $gray2;
  }


  .content {
    min-height: calc(100vh - 60px);
  }
}
</style>
