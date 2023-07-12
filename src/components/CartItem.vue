<template>
  <!--
    Компонент отображает элемент товара в корзине.
    Используется элемент li с классами "cart__item" и "product".
  -->
  <li class="cart__item product">
    <!--
      Изображение товара.
      Используется элемент div с классом "product__pic".
      Изображение подставляется с помощью директивы :src и указывается ширина и высота.
    -->
    <div class="product__pic">
      <img :src="product.color.gallery[0].file.url" width="120" height="120" alt="Название товара">
    </div>

    <!--
      Название товара.
      Используется элемент h3 с классом "product__title".
      Название выводится через двойные фигурные скобки.
    -->
    <h3 class="product__title">
      {{ product.product.title }}
    </h3>

    <!--
      Информация о цвете товара.
      Используется элемент p с классами "product__info" и "product__info--color".
      Используется директива v-bind для установки стиля фона.
      Информация о цвете выводится через двойные фигурные скобки.
    -->
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{'backgroundColor': product.color.color.code}"></i>
        {{ product.color.color.title }}
      </span>
    </p>
    <!--
      Информация о размере товара.
      Используется элемент p с классами "product__info" и "product__info--size".
      Информация о размере выводится через двойные фигурные скобки.
    -->
    <p class="product__info product__info--size">
      Размер:
      <span>
        {{ product.size.title }}
      </span>
    </p>
    <!--
      Артикул товара.
      Используется элемент span с классом "product__code".
      Артикул выводится через двойные фигурные скобки.
    -->
    <span class="product__code">
      Артикул: {{ product.product.id }}
    </span>

    <!--
      Компонент FormCounter для управления количеством товара.
      Используется компонент FormCounter, передается пропс count с помощью директивы :count.sync.
    -->
    <FormCounter :count.sync="amount" />

    <!--
      Цена товара.
      Используется элемент b с классом "product__price".
      Цена выводится через двойные фигурные скобки.
    -->
    <b class="product__price">
      {{ product.price * product.quantity | NumberFormat }} ₽
    </b>

    <!--
      Кнопка удаления товара из корзины.
      Используется элемент button с классами "product__del" и "button-del".
      На кнопку навешивается обработчик события click с использованием директивы @click.prevent.
    -->
    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct(product.id)">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import FormCounter from '@/components/FormCounter.vue'
import NumberFormat from '@/helpers/NumberFormat'
import { mapActions } from 'vuex'

export default {
  props: {
    product: Object // Объект с информацией о товаре
  },
  components: {
    FormCounter // Используемый компонент FormCounter
  },
  filters: {
    NumberFormat // Фильтр для форматирования чисел
  },
  computed: {
    amount: {
      get () {
        return this.product.quantity
      },
      set (value) {
        this.$store.dispatch('updateQuantityCart', { productId: this.product.id, quantity: value })
      }
    }
  },
  methods: {
    ...mapActions({ deleteProduct: 'deleteCartProduct' }) // Используемые методы из Vuex
  }
}
</script>

<style>
.product__info--size {
  margin-left: 125px;
}
</style>
