<template>
  <main class="content container">
    <div class="content__top">
      <div class="content__row">
        <h1 class="content__title">
          Каталог
        </h1>
        <span class="content__info" v-if="productsData">
          Количество товаров: {{ productsData.pagination.total }}
        </span>
      </div>
    </div>

    <div class="content__catalog">
      <!-- Компонент ProductFilter с привязкой данных -->
      <ProductFilter
        :min-price.sync="minPrice"
        :max-price.sync="maxPrice"
        :color-id.sync="colorIds"
        :material-id.sync="materialIds"
        :season-id.sync="seasonIds"
        :category-id.sync="categoryId"
      />
      <section class="catalog">
        <!-- Условная отрисовка элементов при загрузке товаров или при ошибке загрузки -->
        <div v-if="productsLoading">Загрузка товаров... </div>
        <div v-if="productsLoadingFailed">Произошла ошибка при загрузки товаров <button @click.prevent="updateAllProducts">Попробовать ещё раз</button></div>
        <!-- Передача списка товаров в компонент ProductList -->
        <ProductList :products="productsData.items" v-if="productsData" />
        <!-- Компонент пагинации для переключения страниц -->
        <BasePagination v-model="page" :total="total" :per-page="limit"/>
      </section>
    </div>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config'
import axios from 'axios'
import BasePagination from '@/components/BasePagination.vue'
import ProductList from '@/components/ProductList.vue'
import ProductFilter from '@/components/ProductFilter.vue'

export default {
  components: {
    BasePagination,
    ProductList,
    ProductFilter
  },
  data () {
    return {
      page: 1,
      total: null,
      limit: 9,

      minPrice: 0,
      maxPrice: 0,
      categoryId: 0,
      colorIds: [],
      materialIds: [],
      seasonIds: [],

      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false
    }
  },
  computed: {
    countProducts () {
      return this.productsData ? this.productsData.pagination.total : 0
    }
  },
  methods: {
    updateAllProducts () {
      this.productsLoading = true
      this.productsLoadingFailed = false
      clearTimeout(this.loadProducts)
      this.loadProducts = setTimeout(() => {
        axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.limit,
            categoryId: this.categoryId,
            materialIds: this.materialIds,
            seasonIds: this.seasonIds,
            colorIds: this.colorIds,
            minPrice: this.minPrice,
            maxPrice: this.maxPrice
          }
        }).then(responce => {
          this.productsData = responce.data
          this.total = responce.data.pagination.pages
        }).catch(() => (this.productsLoadingFailed = true))
          .then(() => {
            this.productsLoading = false
          })
      }, 0)
    }
  },
  created () {
    this.updateAllProducts()
  },
  watch: {
    page () {
      this.updateAllProducts()
    },
    minPrice () {
      this.updateAllProducts()
    },
    maxPrice () {
      this.updateAllProducts()
    },
    colorIds () {
      this.updateAllProducts()
    },
    categoryId () {
      this.updateAllProducts()
    },
    materialIds () {
      this.updateAllProducts()
    },
    seasonIds () {
      this.updateAllProducts()
    }
  }
}
</script>
