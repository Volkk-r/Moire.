import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { API_BASE_URL } from '@/config.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    CartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
    cartProductLoading: false,
    cartProductLoadingFailed: false,
    cartIndicator: false,
    orderInfoError: null
  },
  mutations: {
    // Обновление информации о заказе
    updateOrderInfo (state, orderInfo) {
      state.orderInfo = orderInfo
    },
    // Обновление количества товара в корзине
    updateCartProductAmount (state, { productId, amount }) {
      const item = state.CartProducts.find((newItem) => newItem.productId === productId)
      if (item) {
        item.amount = amount
      }
    },
    // Сброс корзины
    resetCart (state) {
      state.CartProducts = []
      state.cartProductsData = []
    },
    // Удаление товара из корзины
    deleteCartProduct (state, productId) {
      state.CartProducts = state.CartProducts.filter(item => item.id !== productId)
    },
    // Обновление ключа доступа пользователя
    updateUserAccessKey (state, accessKey) {
      state.userAccessKey = accessKey
    },
    // Обновление данных о товарах в корзине
    updateCartProductsData (state, items) {
      state.cartProductsData = items
    },
    // Синхронизация товаров в корзине
    syncCartProducts (state) {
      state.CartProducts = state.cartProductsData.map(item => ({
        productId: item.product.id,
        amount: item.quantity,
        color: item.color.color,
        size: item.size,
        id: item.id
      }))
    }
  },
  getters: {
    // Вычисление общей стоимости товаров в корзине
    cartTotalPrice (state, getters) {
      let amount = 0
      for (const product of state.cartProductsData) {
        amount += product.price * product.quantity
      }
      return amount
    },
    // Получение общего количества товаров в корзине
    cartAllAmount (state, getters) {
      return state.CartProducts.length
    }
  },
  actions: {
    // Загрузка информации о заказе
    loadOrderInfo (context, orderId) {
      return axios.get(API_BASE_URL + '/api/orders/' + orderId, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateOrderInfo', response.data)
        })
        .catch(() => {
          context.state.orderInfoError = true
        })
    },
    // Загрузка товаров в корзине
    loadCartProduct (context) {
      context.state.cartProductLoading = true
      clearTimeout(this.loadTimer)
      this.loadTimer = setTimeout(() => {
        return axios.get(API_BASE_URL + '/api/baskets', {
          params: {
            userAccessKey: context.state.userAccessKey
          }
        })
          .then(response => {
            if (!context.state.userAccessKey) {
              localStorage.setItem('userAccessKey', response.data.user.accessKey)
              context.commit('updateUserAccessKey', response.data.user.accessKey)
            }

            context.commit('updateCartProductsData', response.data.items)
            context.commit('syncCartProducts')
          })
          .catch(() => (context.state.cartProductLoadingFailed = true))
          .then(() => (context.state.cartProductLoading = false))
      })
    },
    // Добавление товара в корзину
    addProductToCart (context, { productId, quantity, colorId, sizeId }) {
      return axios.post(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        colorId: colorId,
        sizeId: sizeId,
        quantity: quantity
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
          context.commit('syncCartProducts')
        })
        .then(() => {
          context.state.cartIndicator = false
        })
    },
    // Обновление количества товара в корзине
    updateQuantityCart (context, { productId, quantity }) {
      context.commit('updateCartProductAmount', { productId, quantity })
      if (quantity < 1) return
      return axios.put(API_BASE_URL + '/api/baskets/products', {
        basketItemId: productId,
        quantity: quantity
      }, {
        params: {
          userAccessKey: context.state.userAccessKey
        }
      })
        .then(response => {
          context.commit('updateCartProductsData', response.data.items)
        })
        .catch(() => {
          context.commit('syncCartProducts')
        })
    },
    // Удаление товара из корзины
    deleteCartProduct (context, productId) {
      context.commit('deleteCartProduct', productId)
      return axios.delete(API_BASE_URL + `/api/baskets/products?userAccessKey=${context.state.userAccessKey}`, {
        data: {
          basketItemId: String(productId)
        }
      })
        // .catch(() => {
        //   context.commit('syncCartProducts')
        // })
        // .then(() => {
        //   context.state.сartProductsData = context.state.cartProducts.filter(item => item.id !== productId)
        // })
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items)
        })
    }
  }
})
