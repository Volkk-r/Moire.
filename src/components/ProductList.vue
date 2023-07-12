<template>
  <ul class="catalog__list">
    <!-- Итерация по каждому товару и создание компонента ProductItem -->
    <ProductItem v-for="product in products" :key="product.title" :product="product" />
  </ul>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
  components: {
    ProductItem // Импорт компонента ProductItem
  },
  props: {
    products: Array // Параметр, передающий массив товаров
  }
}
</script>
