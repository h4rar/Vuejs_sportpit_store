import Vue from "vue"
import Vuex from "vuex"
import axios from "axios";

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        one_product: {},
        categories: [],
        cart: [],
        status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        lk: {},
        path: {
            name: "Главная"
        },
        orders: [],
    },
    mutations: {
        SET_PRODUCTS_TO_STATE: (state, product) => {
            state.products = product;
        },
        SET_PATH_TO_STATE: (state, name) => {
            state.path.name = name;
        },
        SET_LK_TO_STATE: (state, lk) => {
            state.lk = lk;
        },
        SET_ORDERS_TO_STATE: (state, orders) => {
            state.orders = orders;
        },
        SET_CATEGORIES_TO_STATE: (state, category) => {
            state.categories = category;
        },
        SET_ONE_PRODUCT_TO_STATE: (state, product) => {
            state.one_product = product;
        },
        SET_CART: (state, product) => {
            if (state.cart.length) {
                let isProductExist = false;
                state.cart.map(function (item) {
                    if (item.id === product.id) {
                        isProductExist = true;
                        item.quantity++
                    }
                })
                if (!isProductExist) {
                    state.cart.push(product);
                }
            } else {
                state.cart.push(product);
            }
        },
        ADD_ADDRESS: (state, address) => {
            state.lk.address.push(address);
        },
        nothing: () => {
        },
        // ADD_COMMENTS: (state, comments) => {
        //     state.lk.address.push(comments);
        // },
        ADD_NEW_ORDER: (state, order) => {
            state.orders.push(order);
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1);
        },
        INCREMENT: (state, index) => {
            state.cart[index].quantity++;
        },
        DECREMENT: (state, index) => {
            if (state.cart[index].quantity > 1) {
                state.cart[index].quantity--;
            }
        },
        DELETE_adresss: (state, index) => {
            state.lk.address[index].basicStatus = "DELETED"
        },
        auth_request(state) {
            state.status = 'loading'
        },
        auth_success(state, token, user) {
            state.status = 'success'
            state.token = token
            state.user = user;
        },
        auth_error(state) {
            state.status = 'error'
        },
        logout(state) {
            state.status = ''
            state.token = ''
        },
    },
    actions: {
        GET_PRODUCTS_FROM_API({commit}) {
            return axios("https://api-sportpit.herokuapp.com/api/products", {
                method: "GET"
            })
                .then((products) => {
                    commit("SET_PRODUCTS_TO_STATE", products.data.content);
                    return products;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        SEARCH({commit}, searchInfo) {
            let path = "https://api-sportpit.herokuapp.com/api/products"
            if (searchInfo.category !== undefined) {
                let s = "?category=" + searchInfo.category;
                path += s;
            }
            if (searchInfo.searchText !== undefined) {
                let s = "&search=" + searchInfo.searchText;
                path += s;
            }
            return axios(path, {method: "GET"})
                .then((products) => {
                    commit("SET_PRODUCTS_TO_STATE", products.data.content);
                    return products;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_LK_FROM_API({commit}) {
            return axios("https://api-sportpit.herokuapp.com/api/users/lk", {
                method: "GET",
            })
                .then((products) => {
                    commit("SET_LK_TO_STATE", products.data);
                    return products.data;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_ORDERS_FROM_API({commit}) {
            return axios("https://api-sportpit.herokuapp.com/api/users/orders", {
                method: "GET",
            })
                .then((orders) => {
                    commit("SET_ORDERS_TO_STATE", orders.data.content);
                    return orders.data.content;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_CATEGORIES_FROM_API({commit}) {
            return axios("https://api-sportpit.herokuapp.com/api/categories", {
                method: "GET"
            })
                .then((categories) => {
                    commit("SET_CATEGORIES_TO_STATE", categories.data.categories);
                    return categories;
                })
                .catch((error) => {
                    console.log(error);
                    return error;
                })
        },
        GET_ONE_PRODUCT_FROM_API({commit}, index) {
            return new Promise(() => {
                axios("https://api-sportpit.herokuapp.com/api/products/" + index, {method: "GET"})
                    .then((product) => {
                        commit("SET_ONE_PRODUCT_TO_STATE", product.data);
                        return product.data;
                    })
                    .catch((error) => {
                        console.log(error);
                        return error;
                    })
            })
        },
        ADD_TO_CART({commit}, product) {
            commit("SET_CART", product);
        },
        UPDATE_PATH({commit}, name) {
            commit("SET_PATH_TO_STATE", name);
        },
        DELETE_FROM_CART({commit}, index) {
            commit("REMOVE_FROM_CART", index);
        },
        DELETE_ADDRESS({commit}, index) {
            commit("DELETE_adresss", index);
        },
        INCREMENT_CART_ITEM({commit}, index) {
            commit("INCREMENT", index);
        },
        DECREMENT_CART_ITEM({commit}, index) {
            commit("DECREMENT", index);
        },
        login({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'https://api-sportpit.herokuapp.com/api/login', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token
                        const user = resp
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        commit('auth_success', token, user)
                        resolve(resp)
                        return resp;
                    })
                    .catch(err => {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        update_user({commit}, info) {
            return new Promise(() => {
                commit('auth_request')
                axios({url: 'https://api-sportpit.herokuapp.com/api/users/', data: info, method: 'PATCH'})
                    .then(resp => {
                        commit("SET_LK_TO_STATE", resp.data);
                        return resp;
                    })
                    .catch(error => {
                        console.log(error);
                        return error;
                    })
            })
        },
        add_address({commit}, info) {
            return new Promise(() => {
                axios({url: 'https://api-sportpit.herokuapp.com/api/address', data: info, method: 'POST'})
                    .then(resp => {
                        commit("ADD_ADDRESS", resp.data);
                        return resp;
                    })
                    .catch(error => {
                        console.log(error);
                        return error;
                    })
            })
        },
        add_comments({commit}, info) {
            return new Promise(() => {
                axios({url: 'https://api-sportpit.herokuapp.com/api/products/comments', data: info, method: 'POST'})
                    .then(resp => {
                        commit();
                        return resp;
                    })
                    .catch(error => {
                        console.log(error);
                        return error;
                    })
            })
        },
        CREATE_NEW_ORDER({commit}, info) {
            return new Promise(() => {
                axios({url: 'https://api-sportpit.herokuapp.com/api/cart/to-order', data: info, method: 'POST'})
                    .then(resp => {
                        commit("ADD_NEW_ORDER", resp.data);
                        return resp;
                    })
                    .catch(error => {
                        console.log(error);
                        return error;
                    })
            })
        },
        logout({commit}) {
            return new Promise((resolve) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        register({commit}, user) {
            return new Promise((resolve, reject) => {
                commit('auth_request')
                axios({url: 'https://api-sportpit.herokuapp.com/api/register', data: user, method: 'POST'})
                    .then(resp => {
                        const token = resp.data.token
                        // const user = resp.data.username
                        localStorage.setItem('token', token)
                        // axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        // commit('auth_success', token, user)
                        resolve(resp)
                    })
                    .catch(err => {
                        commit('auth_error', err)
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        }
    },
    getters: {
        PRODUCTS(state) {
            return state.products;
        },
        PRODUCT(state) {
            return state.one_product;
        },
        ORDERS(state) {
            return state.orders;
        },
        LK(state) {
            return state.lk;
        },
        TOKEN(state) {
            return state.token;
        },
        PATH(state) {
            return state.path;
        },
        CATEGORIES(state) {
            return state.categories;
        },
        CART(state) {
            return state.cart;
        },
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
    },
});

export default store;