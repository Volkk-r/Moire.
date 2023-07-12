<template>
  <li class="catalog__item">

    <!-- Изображение товара -->
    <router-link tag="a" :to="{name: 'product', params: {id: product.id}}" class="catalog__pic">
      <img :src="changeProduct()" :alt="product.title">
    </router-link>

    <!-- Заголовок товара -->
    <h3 class="catalog__title">
      <router-link tag="a" :to="{name: 'product'}">
        {{ product.title }}
      </router-link>
    </h3>

    <!-- Цена товара -->
    <span class="catalog__price">
      {{ product.price | NumberFormat }} ₽
    </span>

    <!-- Цвета товара -->
    <ul class="colors colors--black">
      <li class="colors__item" v-for="(color, index) in product.colors" :key="color.color.code">
        <label class="colors__label">
          <input class="colors__radio sr-only" type="radio" name="color-1" :value="index" v-model.number="activeImage">
          <span class="colors__value" :style="{backgroundColor: color.color.code}">
          </span>
        </label>
      </li>
    </ul>
  </li>
</template>

<script>
import NumberFormat from '@/helpers/NumberFormat'

export default {
  data () {
    return {
      activeImage: 0 // Индекс активного изображения товара
    }
  },
  filters: {
    NumberFormat // Фильтр для форматирования чисел
  },
  props: {
    product: Object // Параметр, передающий объект товара
  },
  methods: {
    changeProduct () {
      if (this.product.id !== 14) {
        return this.product.colors[this.activeImage].gallery[0].file.url // Возвращает URL активного изображения товара
      } else {
        return this.product.colors[this.activeImage + 1].gallery[0].file.url // Возвращает URL активного изображения товара (для товара с id = 14)
      }
    }
  }
}
</script>
