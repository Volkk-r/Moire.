<template>
  <!--
    Компонент отображает пагинацию каталога в виде списка страниц.
    Используется элемент ul с классами "catalog__pagination" и "pagination".
  -->
  <ul class="catalog__pagination pagination">
    <!--
      Элемент списка для предыдущей страницы.
      Используется элемент a для создания ссылки.
      Классы "pagination__item" и "pagination__link--arrow" применяются для стилизации элемента.
      @click.prevent привязывается к методу changePage для перехода на предыдущую страницу.
      Добавляется класс "pagination__link--disabled", если текущая страница равна 1.
    -->
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        aria-label="Предыдущая страница"
        @click.prevent="changePage(page - 1)"
        :class="{'pagination__link--disabled': page === 1}"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-left"></use>
        </svg>
      </a>
    </li>

    <!--
      Элементы списка для отображения номеров страниц.
      Используется директива v-for для создания элементов списка в соответствии с количеством страниц (total).
      Каждый элемент списка представлен элементом a для создания ссылки.
      Класс "pagination__item" применяется для стилизации элемента.
      @click.prevent привязывается к методу changePage для перехода на выбранную страницу.
      Добавляется класс "pagination__link--current", если текущая страница равна номеру страницы (list).
    -->
    <li class="pagination__item" v-for="list in total" :key="list">
      <a class="pagination__link" :class="{'pagination__link--current': list === page}" @click.prevent="changePage(list)">
        {{ list }}
      </a>
    </li>

    <!--
      Элемент списка для следующей страницы.
      Используется элемент a для создания ссылки.
      Классы "pagination__item" и "pagination__link--arrow" применяются для стилизации элемента.
      @click.prevent привязывается к методу changePage для перехода на следующую страницу.
      Добавляется класс "pagination__link--disabled", если текущая страница равна общему количеству страниц (total).
    -->
    <li class="pagination__item">
      <a
        class="pagination__link pagination__link--arrow"
        href="#"
        aria-label="Следующая страница"
        @click.prevent="changePage(page + 1)"
        :class="{'pagination__link--disabled': page === total}"
      >
        <svg width="8" height="14" fill="currentColor">
          <use xlink:href="#icon-arrow-right"></use>
        </svg>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  // Используется v-model для обработки модели страницы
  model: {
    prop: 'page',
    event: 'paginate'
  },
  props: {
    page: Number, // Текущая страница
    total: Number, // Общее количество страниц
    perPage: Number // Количество элементов на странице
  },
  methods: {
    changePage (page) {
      // Проверяем, что номер страницы находится в допустимом диапазоне
      if (page <= this.total && page > 0) {
        this.$emit('paginate', page) // Эмитируем событие 'paginate' с новым значением страницы
      }
    }
  },
  computed: {
    amountPages () {
      return Math.ceil(this.total / this.perPage) // Вычисляем общее количество страниц
    }
  }
}
</script>

<style>
  .pagination__item {
    cursor: pointer;
  }
</style>
