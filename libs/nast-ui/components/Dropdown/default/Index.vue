<template>
  <div ref="dropdown" class="n-dropdown">
    <n-popup ref="popup" v-click-outside="clickOutside" :open.sync="s_open" :fit="fit" :up="up" :align="align" :side="side" :target="target">
      <template #action>
        <slot>open</slot>
      </template>
      <div class="n-content">
        <div v-show="parents.length" class="n-parents">
          <template v-for="(item, i) in parents">
            <n-dropdown-item :key="getValue(item)" :value="item" @click="parentClick(i)">
              <div class="n-parent-item">
                <div v-for="n in i" :key="n" class="n-shift" />
                <n-icon icon="arrow-left" />
                <slot name="item" :item="item">
                  <span class="n-text">{{ getTitle(item) }}</span>
                </slot>
              </div>
            </n-dropdown-item>
          </template>
        </div>
        <div ref="items" :class="[ 'n-items', {'n-loading': loading}, ]" @scroll="s_scroll">
          <n-loader :loading="Boolean(loading)" />
          <template v-if="s_data.length">
            <template v-for="(item, i) in searchedData">
              <n-dropdown-group v-if="isGroup(item)" :key="getValue(item)" :value="item" :indexes="[ i, ]"
                                :item-title="itemTitle" :item-value="itemValue" :item-children="itemChildren" @click="s_click">
                <template #group="{item}">
                    <div class="n-group-item">
                      <slot name="group" :item="item">
                        <div class="n-text">
                          {{ getTitle(item) }}
                        </div>
                      </slot>
                      <n-icon icon="angle-down" />
                    </div>
                </template>
              </n-dropdown-group>
              <n-dropdown-item v-else :key="getValue(item)" :value="item" :indexes="[ i, ]" :active="isActive(item)"
                               :item-title="itemTitle" :item-value="itemValue" @click="s_click">
                <template #default="{item}">
                  <slot name="item" :item="item" />
                </template>
              </n-dropdown-item>
            </template>
          </template>
          <div v-else-if="!loading" class="n-empty">
            No data
          </div>
        </div>
      </div>
    </n-popup>
  </div>
</template>

<script>
import size from 'lodash/size'
import isArray from 'lodash/isArray'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import filter from 'lodash/filter'
import { getValue, getTitle, } from 'nast-ui/utils/functions'
import props from './../props'
import clickOutside from 'nast-ui/directives/click-outside'

export default {
  name: 'NDropdown',
  directives: { clickOutside, },
  mixins: [ props, ],
  data() {
    return {
      s_open: this.open || false,
      s_data: this.data,
      searchedData: [],
      selected: [],
      parents: [], // открытые на данный момент группы
      indexes: [], // TODO скорее всего не нужно
      loading: 0,
      page: 0,
      total: null,
    }
  },
  computed: {
    action() {
      return this.$slots.default[0].elm
    },
    multi() {
      return isArray(this.value)
    },
    s_search() {
      let search = isArray(this.search) ? this.search : [ this.search, ]
      search = filter(search, (s) => s.length >= 3)
      return search
    },
    s_closeOnSelect() {
      return this.closeOnSelect !== null ? this.closeOnSelect : !this.multi
    },
    s_filterBySearch() {
      if (this.filterBySearch === null) {
        return !this.load
      }
      return this.filterBySearch
    },
  },
  watch: {
    open(value) {
      this.s_open = value
    },
    s_open(value) {
      if (value) {
        if (this.load) {
          this.s_data = []
        }
        this.update()
      }
    },
    value(value) {
      if (!size(value)) {
        this.parents = []
      }
    },
    data(value) {
      this.s_data = value
    },
    s_data(value) {
      this.computeData(value, this.s_search)
      this.$nextTick(() => {
        this.$refs.popup.update()
      })
    },
    s_search(value) {
      if (this.load) {
        this.update()
      } else {
        this.computeData(this.s_data, value)
      }
      if (this.$refs.popup) {
        this.$nextTick(() => {
          this.$refs.popup.calcStyle()
        })
      }
    },
  },
  mounted() {
    if (this.s_open) {
      this.update()
    }
    if (this.open === null) {
      this.action.addEventListener('click', this.actionClick)
    }
    this.computeData(this.s_data, this.s_search)
  },
  beforeDestroy() {
    this.action.removeEventListener('click', this.actionClick)
  },
  methods: {
    computeData(dataProp, search) {
      let data = dataProp
      if (this.s_filterBySearch) {
        if (search.length) {
          data = filter(data, (item) => {
            const title = this.getTitle(item)
            for (const i in search) {
              if ({}.hasOwnProperty.call(search, i)) {
                const string = search[i]
                if (title.toUpperCase().includes(string.toUpperCase())) {
                  return true
                }
              }
            }
            return false
          })
        }
      }
      this.searchedData = data
    },
    getTitle(item) {
      return getTitle(item, this.itemTitle)
    },
    getValue(item) {
      return getValue(item, this.itemValue)
    },
    actionClick() {
      this.toggle()
    },
    toggle(valueProp) {
      const value = valueProp === undefined ? !this.s_open : valueProp
      if (this.value === null && value) {
        this.update()
      }
      if (this.open === null) {
        this.s_open = value
      }
      this.$emit('update:open', value)
    },
    clickOutside(event) {
      if (this.s_open && this.closeByOutside) {
        this.toggle()
      }
    },
    parentClick(index) {
      this.parents.length = index
      this.indexes.length = index
      
      if (this.load) {
        this.s_data = []
        this.update()
      } else {
        this.s_data = index === 0 ? this.data : this.parents[index-1][this.itemChildren]
      }
    },
    groupClick(item, indexes) {
      this.parents = [ ...this.parents, item, ]
      this.indexes = [ ...this.indexes, indexes[0], ]
      
      if (item.children === true && this.load) {
        this.s_data = []
        this.update()
      } else {
        this.s_data = item[this.itemChildren]
      }
    },
    isGroup(item) {
      return (isArray(item[this.itemChildren]) && item[this.itemChildren].length) || item[this.itemChildren] === true
    },
    isActive(item) {
      if (this.multi) {
        return Boolean(this.value.filter((i) => this.getValue(i) === this.getValue(item)).length)
      } else {
        return this.getValue(item) === this.getValue(this.value)
      }
    },
    s_click(item, indexes, event, isGroup) {
      this.$emit('click', item, indexes, isGroup, event)
      this.click(item, indexes, isGroup, event)
    
      if (isGroup) {
        this.groupClick(item, indexes)
      } else {
        this.s_select(item, indexes)
      }
    },
    s_select(item, indexes) {
      let value = item
      if (this.multi) {
        value = this.value.filter((i) => this.getValue(i) !== this.getValue(item))
        if (value.length === this.value.length) {
          value = [ ...this.value, item, ]
        }
      }
      
      if (this.s_closeOnSelect) {
        this.toggle(false)
      }
      
      this.$emit('update:value', value)
      this['update:value'](value)
      this.$emit('select', item, this.parents)
      this.select(item, this.parents)
    },
    s_scroll: debounce(function(event = null) {
      this.checkScroll()
      
      this.$emit('scroll', event)
      this.scroll(event)
    }, 100),
    checkScroll() {
      const target = this.$refs.items
      if (target && this.load) {
        if (target.scrollTop + target.clientHeight >= target.scrollHeight - 50) {
          this.loadNextPage()
        }
      }
    },
    loadNextPage() {
      if (this.total !== null) {
        if ((this.page + 1) * this.size < this.total) {
          this.s_load(this.page + 1)
        }
      }
    },
    s_load(page) {
      if (this.load) {
        const params = { page, size: this.size, search: this.search, }
        const promise = this.load(params, this.parents[this.parents.length - 1])
        
        if (promise) {
          this.loading++
          this.page = page
          
          promise.then((response) => {
            const data = this.getContent(response)
            this.total = this.getTotalCount(response)
            
            if (this.page < params.page) { // if closed dropdown while loading data, it can load old data when dropdown opened again
              this.loading--
              return
            }
      
            if (this.page) {
              this.s_data = this.s_data.concat(data)
            } else {
              this.s_data = data
            }
            
            this.$nextTick(() => {
              this.checkScroll()
              this.$nextTick(() => {
                this.loading--
              })
            })
          })
        }
      }
    },
    s_focus(e) {
      this.$emit('focus', e)
      this.focus(e)
    },
    s_blur(e) {
      this.$emit('blur', e)
      this.blur(e)
    },
    update: throttle(function() {
      this.s_load(0)
    }, 300),
    isArray,
  },
}
</script>

<style lang="scss">
  html {
    --n-popup-width: 400px;
  }
</style>
<style lang="scss" scoped>
  .n-dropdown {
    text-align: left;
    
    .n-content {
      font-size: .8rem;
    
      .n-parents {
        box-shadow: 0 2px 2px -2px #9c9c9c;
        padding: 5px 0;
        
        .n-shift {
          width: 10px;
          display: inline-block;
        }
      }
      
      .n-items {
        padding: 5px 0;
        max-height: 300px;
        overflow-y: auto;
        text-align: left;
        
        &.n-loading {
          min-height: 100px;
        }
      }
  
      .n-empty {
        padding: 30px 5px;
      }
      
      .n-parent-item, .n-group-item {
        display: flex;
        align-items: center;
        .n-text {
          flex-grow: 1;
        }
        .n-icon {
          font-size: .8em;
          opacity: .8;
        }
      }
      .n-parent-item .n-icon { margin-right: 10px; }
      .n-group-item .n-icon { margin-left: 10px; }
    }
  }
</style>
