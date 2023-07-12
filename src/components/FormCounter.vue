<template>
  <!--
    Компонент для управления счетчиком количества товара.
    Используется div с классами "item__row" и "item__row--center".
  -->
  <div class="item__row item__row--center">
    <!--
      Кнопка уменьшения количества товара.
      Используется элемент button с атрибутом aria-label и обработчиком события click.
      На кнопку навешивается условие (amount > 1), при котором значение amount уменьшается на 1.
    -->
    <div class="form__counter">
      <button type="button" aria-label="Убрать один товар" @click.prevent="(amount > 1) ? amount-- : 0">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <!--
        Поле ввода количества товара.
        Используется элемент input с атрибутом type="text" и директивой v-model.number для связывания с переменной amount.
      -->
      <input type="text" v-model.number="amount" name="count">

      <!--
        Кнопка увеличения количества товара.
        Используется элемент button с атрибутом aria-label и обработчиком события click.
        При нажатии на кнопку значение amount увеличивается на 1.
      -->
      <button type="button" aria-label="Добавить один товар" @click.prevent="amount++">
        <svg width="12" height="12" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    count: Number // Количество товара
  },
  name: 'FormCounter', // Имя компонента
  computed: {
    amount: {
      get () {
        return this.count
      },
      set (value) {
        if (typeof value === 'string' || value < 1) {
          value = 1
        }
        this.$emit('update:count', value)
      }
    }
  }
}
</script>
