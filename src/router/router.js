import Vue from 'vue'
import Router from 'vue-router'
import vCatalog from '../components/catalog/v-catalog'
import vLogin from '../components/v-login'
import vCart from '../components/cart/v-cart'
import vRegister from '../components/v-register'
import vLk from '../components/user/v-lk'
import vOneProduct from '../components/catalog/product/v-one-product'
import vMyOrders from '../components/order/v-my-orders'
import vContacts from '../components/v-contacts'
import vDelivery from '../components/v-delivery'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: vCatalog
        },
        {
            path: '/login',
            name: 'login',
            component: vLogin
        },
        {
            path: '/register',
            name: 'register',
            component: vRegister
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props:true
        },
        {
            path: '/lk',
            name: 'lk',
            component: vLk,
        },
        {
            path: '/product/',
            name: 'one_product',
            component: vOneProduct,
        },
        {
            path: '/orders/',
            name: 'orders',
            component: vMyOrders,
        },
        {
            path: '/contacts/',
            name: 'contacts',
            component: vContacts,
        },
        {
            path: '/delivery/',
            name: 'delivery',
            component: vDelivery,
        },

    ]
})

export default router;