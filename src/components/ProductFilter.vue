<template>
  <aside class="filter">
    <form class="filter__form form" action="#" @submit.prevent="submit">
      <fieldset class="form__block">
        <legend class="form__legend">Цена</legend>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="min-price" v-model.number="currentPriceFrom">
          <span class="form__value">От</span>
        </label>
        <label class="form__label form__label--price">
          <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo">
          <span class="form__value">До</span>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Категория</legend>
        <label class="form__label form__label--select">
          <select class="form__select" type="text" name="category" v-model.number="currentCategoryID">
            <option value="0">Все категории</option>
            <option :value="category.id" v-for="category in categories" :key="category.id">
              {{ category.title }}</option>
          </select>
        </label>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Цвет</legend>
        <ul class="colors">
          <li class="colors__item" v-for="color in colors" :key='color.id'>
            <label class="colors__label">
              <input class="colors__radio sr-only" type="checkbox" name="color" :value="color.id"
              v-model="currentColorIDs" :id="color.id">
              <span class="colors__value" :style="{ backgroundColor: color.code }">
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Материал</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="material in materials" :key="material.title">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="material"
              :value="material.id" v-model="currentMaterialIDs">
              <span class="check-list__desc">
                {{ material.title }}
                <span>({{ material.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <fieldset class="form__block">
        <legend class="form__legend">Коллекция</legend>
        <ul class="check-list">
          <li class="check-list__item" v-for="season in seasons" :key="season.title">
            <label class="check-list__label">
              <input class="check-list__check sr-only" type="checkbox" name="collection"
              :value="season.id" v-model="currentSeasonIDs">
              <span class="check-list__desc">
                {{ season.title }}
                <span>({{ season.productsCount }})</span>
              </span>
            </label>
          </li>
        </ul>
      </fieldset>

      <button class="filter__submit button button--primery" type="submit">
        Применить
      </button>
      <button class="filter__reset button button--second" type="button" @click="reset" v-if="showReset">
        Сбросить
      </button>
    </form>
  </aside>
</template>

<script>
import { API_BASE_URL } from '@/config'
import axios from 'axios'
export default {
  props: {
    minPrice: Number,
    maxPrice: Number,
    colorId: Array,
    materialId: Array,
    seasonId: Array,
    categoryId: Number
  },
  data () {
    return {
      currentPriceFrom: 0,
      currentPriceTo: 12345,

      currentCategoryID: 0,
      currentColorIDs: [],
      currentMaterialIDs: [],
      currentSeasonIDs: [],

      categoriesData: 0,
      colorsData: [],
      materialsData: [],
      seasonsData: []
    }
  },
  computed: {
    showReset () {
      return (
        this.currentPriceFrom !== 0 ||
        this.currentPriceTo !== 12345 ||
        this.currentCategoryID !== 0 ||
        this.currentColorIDs.length > 0 ||
        this.currentMaterialIDs.length > 0 ||
        this.currentSeasonIDs.length > 0
      )
    },
    categories () {
      return this.categoriesData ? this.categoriesData.items : []
    },
    colors () {
      return this.colorsData ? this.colorsData.items : []
    },
    materials () {
      return this.materialsData ? this.materialsData.items : []
    },
    seasons () {
      return this.seasonsData ? this.seasonsData.items : []
    }
  },
  watch: {
    minPrice (value) {
      this.currentPriceFrom = value
    },
    maxPrice (value) {
      this.currentPriceTo = value
    },
    categoryId (value) {
      this.currentCategoryID = value
    },
    colorId (value) {
      this.currentColorIDs = value
    },
    materialId (value) {
      this.currentMaterialIDs = value
    },
    seasonId (value) {
      this.currentSeasonIDs = value
    }
  },
  methods: {
    loadCategories () { // eslint-disable-next-line
      axios.get(API_BASE_URL + '/api/productCategories')
        .then((response) => (this.categoriesData = response.data))
    },
    loadColors () { // eslint-disable-next-line
      axios.get(API_BASE_URL + '/api/colors')
        .then((response) => (this.colorsData = response.data))
    },
    loadMaterials () { // eslint-disable-next-line
      axios.get(API_BASE_URL + '/api/materials')
        .then((response) => (this.materialsData = response.data))
    },
    loadSeason () { // eslint-disable-next-line
      axios.get(API_BASE_URL + '/api/seasons')
        .then((response) => (this.seasonsData = response.data))
    },
    submit () {
      this.$emit('update:minPrice', this.currentPriceFrom)
      this.$emit('update:maxPrice', this.currentPriceTo)
      this.$emit('update:colorId', this.currentColorIDs)
      this.$emit('update:materialId', this.currentMaterialIDs)
      this.$emit('update:seasonId', this.currentSeasonIDs)
      this.$emit('update:categoryId', this.currentCategoryID)
    },
    reset () {
      this.currentPriceFrom = 0
      this.currentPriceTo = 12345
      this.currentCategoryID = 0
      this.currentColorIDs = []
      this.currentMaterialIDs = []
      this.currentSeasonIDs = []
      this.$emit('update:minPrice', 0)
      this.$emit('update:maxPrice', 0)
      this.$emit('update:colorId', [])
      this.$emit('update:materialId', [])
      this.$emit('update:seasonId', [])
      this.$emit('update:categoryId', 0)
    }
  },
  created () {
    this.loadCategories()
    this.loadColors()
    this.loadMaterials()
    this.loadSeason()
  }
}
</script>
