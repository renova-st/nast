<template>
  <div ref="shift" :style="containerStyle" class="n-pagination">
    <div ref="content" :class="[ 'content-wrapper', { fixed: position.fixed, }, ]" :style="contentStyle">
      <div class="content">
        <div class="info">
          <template v-if="displayCountTemp">Search results: {{ countTemp }} (</template><!--
          -->Total count: {{ count }}<!--
          --><template v-if="displayCountTemp">)</template>
        </div>
        <div class="page">
          <n-button :disabled="value.page === 1" class="left" icon="angle-left" round @click="editPage(page - 1)" />
          <input ref="focusout" type="text" class="focusout-element" />
          <input :value="page" @change="pageInputChange" />
          <n-button :disabled="value.page === maxPage" class="right" icon="angle-right" round @click="editPage(page + 1)" />
        </div>
        <div class="tools">
          <n-button icon="cog" round flat @click="toolsClick" />
          <div v-if="toolsOpen" class="dropdown">
            <div>Showed {{ showedCount }} items, from {{ from }} to {{ to }}</div>
            <div>Total pages: {{ maxPage }}</div>
            <div><span>Page size</span>&nbsp;<input :value="size" :disabled="value.infinity" class="input-size" @change="sizeInputChange" /></div>
            <div>
              <span>Infinity scroll</span>&nbsp;
              <input :checked="value.infinity" type="checkbox" @change="infinityCheckboxChange" />
            </div>
            <div>
              <span>Fixed pagination</span>&nbsp;
              <input :checked="value.fixed" :disabled="value.infinity" type="checkbox" @change="fixedCheckboxChange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
  data() {
    return {
      page: this.checkPage(this.value.page),
      size: this.checkSize(this.value.size),
      infinityPage: this.checkInfinity(this.value.infinityPage),
      toolsOpen: false,
      position: {
        // Определяет фиксирована ли пагинация на данный момент.
        // this.value.fixed определяет фиксирована ли пагинация вообще.
        fixed: false,
        right: 0,
        height: 0,
      },

      // { 1: { el: <div>, top: 890, }, 2: { el: <div>, top: 1520, }, }
      // Используется для определения страниц при бесконечном скроле.
      // Набор первых элементов для каждой страницы. Ключ - номер страницы, значение - DOM элемент.
      // Создаются при добавлении страниц.
      infinityPoints: {},

      listenFixed: false,
      listenInfinity: false,
    }
  },
  computed: {
    maxPage() {
      const count = this.countTemp || this.count
      return Math.ceil(count / this.size)
    },
    displayCountTemp() {
      return this.countTemp !== 0 && (this.countTemp !== this.count)
    },
    showedCount() {
      return Math.min(this.size * this.page, this.countTemp) - this.size * (this.page - 1)
    },
    from() {
      return ((this.page - 1) * this.size) + 1
    },
    to() {
      return this.from + this.showedCount - 1
    },
    contentStyle() {
      return {
        right: this.position.fixed ? `${this.position.right}px` : undefined,
      }
    },
    containerStyle() {
      return {
        height: this.position.fixed ? `${this.position.height}px` : undefined,
      }
    },
  },
  watch: {
    value(value) {
      this.checkProps(value)
    },
    countTemp() {
      this.$nextTick(() => {
        this.calcPosition()
      })
    },
  },
  mounted() {
    this.checkProps(this.value)
  },
  beforeDestroy() {
    if (this.listenFixed) {
      document.removeEventListener('scroll', this.calcPosition)
      window.removeEventListener('resize', this.calcPosition)
    }
    if (this.listenInfinity) {
      document.removeEventListener('scroll', this.calcInfinityScroll)
      window.removeEventListener('resize', this.calcInfinityPagesCors)
    }
  },
  methods: {
    toolsClick() {
      this.toolsOpen = !this.toolsOpen
    },
    /**
     * Используется при нажатии на кнопки смены страницы
     * @param {number} page
     */
    editPage(page) {
      if (this.value.infinity) {
        window.scrollTo({
          top: this.infinityPoints[page].position,
          behavior: 'smooth',
        })
      }
      this.s_change({ page: this.checkPage(page), })
    },
    /**
     * Используется при изменении инпута
     * @param {Event} event
     */
    pageInputChange(event) {
      if (!this.value.infinity) {
        const page = event.target.value
        const checkedPage = this.checkPage(page)

        // Фикс. Значение в инпуте не меняется, надо обновить
        if (page !== checkedPage) {
          this.page = 0
          this.page = checkedPage
        }

        // Сброс фокуса с инпута
        this.$refs.focusout.focus()

        this.s_change({ page: checkedPage, })
      }
    },
    fixedCheckboxChange() {
      this.s_change({ fixed: !this.value.fixed, })
    },
    infinityCheckboxChange(event) {
      if (event.target.checked) {
        this.s_change({
          page: 1,
          infinityPage: 1,
          infinity: true,
          fixed: true,
        })
      } else {
        this.s_change({
          infinity: false,
        })
        this.clearInfinityPointsClass()
        this.infinityPoints = {}
      }
    },
    sizeInputChange(event) {
      if (!this.value.infinity) {
        const size = this.checkSize(event.target.value)
        const page = this.checkPage(this.page, size)

        this.s_change({ page, size, })
      }
    },

    calcPosition() {
      const container = this.$parent.$el
      const shift = this.$refs.shift

      const height = this.$refs.content.clientHeight
      const right = document.documentElement.clientWidth - shift.getBoundingClientRect().right
      const fixed = shift.getBoundingClientRect().bottom >= window.innerHeight
        && container.getBoundingClientRect().top < window.innerHeight - 200

      this.position = {
        fixed,
        height,
        right,
      }
    },
    calcInfinityScroll() {
      const shift = this.$refs.shift
      const bottomNearly = shift.getBoundingClientRect().bottom < window.innerHeight + 100
      let load = bottomNearly && this.page === this.infinityPage

      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        load = true
      }
      if (this.infinityPage === this.maxPage) {
        load = false
      }

      if (load) {
        this.s_change({
          infinityPage: this.checkInfinity(this.infinityPage + 1),
        })
      }

      let currentPage = 1

      const keys = Object.keys(this.infinityPoints).reverse()
      for (const key in keys) {
        if ({}.hasOwnProperty.call(keys, key)) {
          const page = keys[key]
          const item = this.infinityPoints[page]

          currentPage = page
          if (window.pageYOffset >= item.position - 200) {
            break
          }
        }
      }

      currentPage = this.checkPage(currentPage)
      if (currentPage !== this.page) {
        this.s_change({ page: currentPage, })
      }
    },
    calcInfinityPoints() {
      const items = this.$parent.$el.getElementsByClassName('item')
      const newPoints = {}

      Array(this.infinityPage).fill().map((value, key) => {
        const page = key + 1
        if (!this.infinityPoints[page]) {
          const el = items[(page - 1) * this.size]
          el.classList.add(this.startPageClass)
          newPoints[page] = {
            el,
            position: getCoords(el).top,
          }
        }
      })

      if (Object.keys(newPoints).length) {
        this.infinityPoints = Object.assign({}, this.infinityPoints, newPoints)
      }
    },
    calcInfinityPagesCors() {
      const newPoints = {}
      Object.keys(this.infinityPoints).map((page) => {
        const item = this.infinityPoints[page]
        newPoints[page] = {
          el: item.el,
          position: getCoords(item.el).top,
        }
      })

      this.infinityPoints = newPoints
    },
    clearInfinityPointsClass() {
      Object.keys(this.infinityPoints).map((page) => {
        const item = this.infinityPoints[page]
        item.el.classList.remove(this.startPageClass)
      })
    },
    checkPage(page, size = 0, infinityPage = 0) {
      const maxPage = size ? Math.ceil((this.countTemp || this.count) / size) : this.maxPage

      return checkPage(page, size, infinityPage, maxPage, this.value.page)
    },
    checkInfinity(page, size = 0) {
      page = Number(page)
      const maxPage = size ? Math.ceil((this.countTemp || this.count) / size) : this.maxPage

      if (isNaN(page)) {
        page = this.value.infinity
      }
      if (page < 1) {
        page = 1
      } else if (page > maxPage) {
        page = maxPage
      }

      return page
    },
    checkSize(size) {
      size = Number(size)

      if (isNaN(size)) {
        size = this.value.size
      }
      if (size < 1) {
        size = 1
      } else if (size > this.maxSize) {
        size = this.maxSize
      }

      return size
    },
    /**
     * Проверка на правильность входных данных, в случае ошибки отправляем родителю правильные значения.
     * Если ошибки нет, присваеваем значения.
     *
     * @param {object} value - { page: 1, size: 10, infinity: false, }
     * @return {boolean} Успешно ли прошла проверка
     */
    checkProps(value) {
      const newValue = {}
      let fail = false

      const size = this.checkSize(value.size)
      if (size !== value.size) {
        fail = true
        newValue.size = size
      }

      const infinityPage = this.checkInfinity(value.infinityPage)
      if (infinityPage !== value.infinityPage) {
        fail = true
        newValue.infinityPage = infinityPage
      }

      const page = this.checkPage(value.page, size, value.infinity ? infinityPage : 0)
      if (page !== value.page) {
        fail = true
        newValue.page = page
      }

      if (fail) {
        this.s_change(newValue)
        return false
      }

      this.page = value.page
      this.size = value.size
      this.infinityPage = value.infinityPage


      if (value.fixed) {
        this.$nextTick(() => {
          this.calcPosition()
        })
      } else {
        this.$set(this.position, 'fixed', false)
      }
      if (value.fixed && !this.listenFixed) {
        this.listenFixed = true
        document.addEventListener('scroll', this.calcPosition)
        window.addEventListener('resize', this.calcPosition)
      } else if (!value.fixed && this.listenFixed) {
        this.listenFixed = false
        document.removeEventListener('scroll', this.calcPosition)
        window.removeEventListener('resize', this.calcPosition)
      }


      if (value.infinity) {
        this.calcInfinityScroll()
        this.calcInfinityPoints()
      }
      if (value.infinity && !this.listenInfinity) {
        this.listenInfinity = true
        document.addEventListener('scroll', this.calcInfinityScroll)
        window.addEventListener('resize', this.calcInfinityPagesCors)
      } else if (!value.infinity && this.listenInfinity) {
        this.listenInfinity = false
        document.removeEventListener('scroll', this.calcInfinityScroll)
        window.removeEventListener('resize', this.calcInfinityPagesCors)
      }

      return true
    },
    s_change(value = {}) {
      const newValue = {
        page: this.page,
        size: this.size,
        infinity: this.value.infinity,
        infinityPage: this.infinityPage,
        fixed: this.value.fixed,
        ...value,
      }

      this.$emit('update:value', newValue)
      this['update:value'](newValue)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-pagination {

    &.shift {
      z-index: -1;
      opacity: 0;
      pointer-events: none;
    }

    .content-wrapper {
      &.fixed {
        position: fixed;
        bottom: 0;
        background: #fff;
        box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
        padding: 0 10px;
        margin: 0 -10px 0 0;
      }
    }

    .content {
      padding: 10px 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: .8em;
      margin: 0 -10px;

      &>* {
        margin: 0 10px;
      }
    }

    .n-button {
    }

    .page {
      input {
        border: none;
        outline: none;
        width: 40px;
        text-align: center;
      }
      .focusout-element {
        opacity: 0;
        z-index: -1;
        pointer-events: none;
        position: absolute;
      }
    }
    .tools {
      margin-left: -5px;
      position: relative;

      .dropdown {
        white-space: nowrap;
        text-align: left;
        padding: 10px;
        background: #fff;
        box-shadow: 1px 1px 5px rgba(0, 0, 0, .2);
        border: 1px solid #eee;
        position: absolute;
        right: 0;
        bottom: 30px;

        &>div {
          padding: 4px;
        }
        .input-size {
          width: 50px;
        }
      }
    }
  }
</style>
