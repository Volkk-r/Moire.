<template>
  <!--
    Компонент отображает блок корзины с товарами и информацией о доставке и общей сумме.
    Используется элемент div с классом "cart__block".
  -->
  <div class="cart__block">
    <!--
      Список товаров в корзине.
      Используется элемент ul с классом "cart__orders".
      Каждый товар представлен элементом li с классом "cart__order" и вставляется с помощью директивы v-for.
      Ключ каждого элемента устанавливается в значение product.id.
    -->
    <ul class="cart__orders">
      <li class="cart__order" v-for="product in this.products.items" :key="product.id">
        <h3>{{ product.product.title }}</h3>
        <b>{{ product.product.price * product.quantity | NumberFormat }} ₽</b>
        <span>Артикул: {{ product.product.id }}</span>
      </li>
    </ul>

    <!--
      Информация о доставке и общей сумме.
      Используется элемент div с классом "cart__total".
      Используются директивы v-if и v-else для условного отображения текста в зависимости от условий.
      Используются вычисляемые свойства и фильтры для форматирования данных.
    -->
    <div class="cart__total">
      <p v-if="products.delivery === 1">Доставка: <b>бесплатно</b></p>
      <p v-else>Доставка: <b>1200 ₽</b></p>
      <p v-if="AllAmount != 0">Итого: <b>{{ AllAmount }}</b> товара на сумму <b>{{ products.totalPrice + 1200 | NumberFormat }} ₽</b></p>
      <p v-else>Итого: <b>{{ products.amount }}</b> товара на сумму <b>{{ products.totalPrice | NumberFormat }} ₽</b></p>
    </div>

    <!--
      Слот для вставки дополнительного контента.
    -->
    <slot />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import NumberFormat from '@/helpers/NumberFormat'

export default {
  props: {
    products: Object // Объект с информацией о товарах в корзине
  },
  filters: {
    NumberFormat // Фильтр для форматирования чисел
  },
  computed: {
    ...mapGetters({ AllAmount: 'cartAllAmount' }) // Вычисляемое свойство AllAmount с использованием геттера из Vuex
  }
}
</script>
