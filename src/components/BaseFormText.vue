<template>
  <!--
    Используем компонент BaseFormField для обертки элемента формы,
    передаем ему свойства title и error для отображения заголовка и сообщения об ошибке.
  -->
  <BaseFormField :title="title" :error="error">
    <!--
      Используем элемент input для ввода данных в форму.
      Класс "form__input" применяется для стилизации элемента.
      Используем директиву v-model для связывания значения с данным компонентом.
      Placeholder устанавливается из свойства placeholder.
    -->
    <input class="form__input" v-model="dataValue" :placeholder="placeholder">
  </BaseFormField>
</template>

<script>
import BaseFormField from '@/components/BaseFormField.vue'

export default {
  props: {
    title: String, // Заголовок или метка для элемента формы
    error: String, // Сообщение об ошибке для элемента формы
    placeholder: String, // Значение для placeholder элемента input
    value: String // Значение элемента input
  },
  components: {
    BaseFormField // Импортируем компонент BaseFormField для использования
  },
  computed: {
    dataValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value) // Эмитируем событие input с новым значением
      }
    }
  }
}
</script>
