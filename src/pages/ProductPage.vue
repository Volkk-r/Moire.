 <template>
  <main class="content container" v-if="productLoadingFailed">Ошибка загрузки</main>
  <main class="content container" v-else-if="productLoading">Идет загрузка товара...</main>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'main'}" class="breadcrumbs__link">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link tag="a" :to="{name: 'main'}" class="breadcrumbs__link">
            {{ productsData.category.title }}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{ productsData.title }}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img width="570" height="570" :src="activeColorImage" :alt="productsData.title">
        </div>
        <ul class="pics__list">
          <li class="pics__item" v-for="color in productsData.colors" :key="color.color.id" @click.prevent="changeProductColor(color.color.id)">
            <a href="" class="pics__link" :class="{'pics__link--current': color.color.id === productColor}">
              <img width="98" height="98" :src="getGalleryImage(color)" :alt="productsData.title">
            </a>
          </li>
        </ul>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{ productsData.id }}</span>
        <h2 class="item__title">
          {{ productsData.title }}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST">
            <FormCounter :count.sync="amount"/>
            <div class="item__row">
              <fieldset class="form__block">
                <legend class="form__legend">Цвет</legend>
                <ul class="colors colors--black">
                  <li class="colors__item" v-for="color in productsData.colors" :key="color.color.id">
                    <label class="colors__label">
                      <input class="colors__radio sr-only" type="radio" name="color-item" :value="color.color.id" v-model.number="productColor">
                      <span class="colors__value" :style="{backgroundColor: color.color.code}">
                      </span>
                    </label>
                  </li>
                </ul>
              </fieldset>

              <fieldset class="form__block">
                <legend class="form__legend">Размер</legend>
                <label class="form__label form__label--small form__label--select">
                  <select class="form__select" type="text" name="category" v-model.number="productSize">
                    <!-- <option value="0" >Размер</option> -->
                    <option :value="size.id" v-for="size in productsData.sizes" :key="size.title">{{ size.title }}</option>
                  </select>
                </label>
              </fieldset>
            </div>

            <button class="item__button button button--primery" type="submit" @click.prevent="addToCart">
              В корзину
            </button>
          </form>
          <div v-if="productAdded">Товар добавлен в корзину</div>
          <div v-else-if="productAddSending">Товар добавляется в корзину</div>
          <div v-else-if="productAddFail.colorId">{{ productAddFail.colorId }}</div>
          <div v-else-if="productAddFail.sizeId">{{ productAddFail.sizeId }}</div>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Информация о товаре
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Доставка и возврат
            </a>
          </li>
        </ul>

        <div class="item__content">
          <h3>Состав:</h3>

          <p>
            60% хлопок<br>
            30% полиэстер<br>
          </p>

          <h3>Уход:</h3>

          <p>
            Машинная стирка при макс. 30ºC короткий отжим<br>
            Гладить при макс. 110ºC<br>
            Не использовать машинную сушку<br>
            Отбеливать запрещено<br>
            Не подвергать химчистке<br>
          </p>

        </div>
      </div>
    </section>
  </main>
</template>

<script>
import { API_BASE_URL } from '@/config'
import axios from 'axios'
import FormCounter from '@/components/FormCounter'
import { mapActions } from 'vuex'

export default {
  components: {
    FormCounter
  },
  data () {
    return {
      productsData: null,
      amount: 1,
      productColor: 0,
      productSize: 0,
      productLoading: false,
      productLoadingFailed: false,
      productAdded: false,
      productAddSending: false,
      productAddFail: {}
    }
  },
  methods: {
    ...mapActions(['addProductToCart']),
    // Функция для добавления товара в корзину
    addToCart () {
      this.productAddFail = null
      this.productAdded = false
      this.productAddSending = true
      this.addProductToCart({ productId: Number(this.$route.params.id), quantity: this.amount, colorId: this.productColor, sizeId: this.productSize })
        .then(() => {
          this.productAddSending = false
          this.productAdded = true
        })
        .catch(response => {
          this.productAddSending = false
          this.productAddFail = response.response.data.error.request
        })
    },
    // Функция для загрузки данных о товаре
    loadProducts () {
      this.productLoading = true
      this.productLoadingFailed = false
      axios.get(API_BASE_URL + `/api/products/${this.$route.params.id}`)
        .then(response => {
          this.productsData = response.data
          this.productColor = this.productsData.colors[0].color.id
          this.productSize = this.productsData.sizes[0].id
        })
        .catch(() => { this.productLoadingFailed = true })
        .then(() => { this.productLoading = false })
    },
    // Функция для получения изображения галереи для определенного цвета товара
    getGalleryImage (color) {
      return color.gallery.length > 0 ? color.gallery[0].file.url : ''
    },
    // Функция для изменения выбранного цвета товара
    changeProductColor (colorId) {
      this.productColor = colorId
      const selectedColor = this.productsData.colors.find(color => color.color.id === colorId)
      this.activeColorImage = selectedColor.gallery.length > 0 ? selectedColor.gallery[0].file.url : ''
    }
  },
  computed: {
    // Вычисляемое свойство для активного изображения цвета товара
    activeColorImage () {
      const selectedColor = this.productsData.colors.find(color => color.color.id === this.productColor)
      return selectedColor ? selectedColor.gallery[0].file.url : ''
    }
  },
  created () {
    this.loadProducts()
  }
}
</script>
