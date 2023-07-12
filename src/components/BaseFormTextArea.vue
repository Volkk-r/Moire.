<template>
  <!--
    Используем компонент BaseFormField для обертки элемента формы,
    передаем ему свойства title и error для отображения заголовка и сообщения об ошибке.
  -->
  <BaseFormField :title="title" :error="error">
    <!--
      Используем элемент textarea для ввода многострочного текста в форму.
      Классы "form__input" и "form__input--area" применяются для стилизации элемента.
      Используем директиву v-model для связывания значения с данным компонентом.
      Placeholder устанавливается из свойства placeholder.
    -->
    <textarea class="form__input form__input--area" v-model="dataValue" :placeholder="placeholder"></textarea>
  </BaseFormField>
</template>

<script>
import BaseFormField from '@/components/BaseFormField.vue'

export default {
  props: {
    title: String, // Заголовок или метка для элемента формы
    error: String, // Сообщение об ошибке для элемента формы
    placeholder: String, // Значение для placeholder элемента textarea
    value: String // Значение элемента textarea
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
