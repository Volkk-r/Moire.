<template>
  <!--
    Выводим метку для формы и элементы слота,
    отображаемое значение и сообщение об ошибке (если есть).
  -->
  <label class="form__label">
    <slot></slot>
    <span class="form__value">{{ title }}</span>
    <span class="form__error" v-if="error">{{ error }}</span>
  </label>
</template>

<script>
export default {
  props: {
    title: String, // Пропс `title` для отображения заголовка
    error: String // Пропс `error` для отображения сообщения об ошибке
  }
}
</script>
