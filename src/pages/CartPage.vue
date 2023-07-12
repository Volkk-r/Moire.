<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          Количество товаров: {{ AllAmount }}
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <!-- Итерация по каждому товару в корзине и создание компонента CartItem -->
            <CartItem v-for="product in this.$store.state.cartProductsData" :key="product.id" :product="product"/>
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ totalPrice }} ₽</span>
          </p>

          <!-- Переход к странице оформления заказа с помощью router-link -->
          <router-link tag="button" :to="{name: 'order'}" class="cart__button button button--primery" type="submit" :disabled="!AllAmount">
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem'
import { mapGetters, mapState } from 'vuex'

export default {
  components: {
    CartItem // Импорт компонента CartItem
  },
  computed: {
    // Использование mapGetters для получения вычисляемых свойств из хранилища
    ...mapGetters({ totalPrice: 'cartTotalPrice', AllAmount: 'cartAllAmount' }),
    // Использование mapState для получения состояния из хранилища
    ...mapState({ cartProductLoading: 'cartProductLoading', cartProductLoadingFailed: 'cartProductLoadingFailed' })
  }
}
</script>
