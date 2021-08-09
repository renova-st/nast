<template>
  <div class="n-datalist">
    <n-data-component v-bind="dataProps" @updated="updatedData" />
    <n-input title="Search" :value.sync="search" />
    <n-list v-bind="listProps" />
  </div>
</template>

<script>
import props from './../props'
import { getTitle, getValue, } from 'nast-ui/utils/functions'

export default {
  name: 'NDatalist',
  mixins: [ props, ],
  data() {
    return {
      search: [],
      s_data: [],
    }
  },
  computed: {
    listProps() {
      return {
        data: this.s_data,
        name: this.name,
        itemTitle: this.itemTitle,
        itemValue: this.itemValue,
        itemChildren: this.itemChildren,
        sortable: this.sortable,
      }
    },
    dataProps() {
      return {
        data: this.data,
        load: this.load,
        fields: undefined,
        search: this.search,
        filter: undefined,
        size: this.size,
        firstPage: this.firstPage,
        sortFunction: this.sortFunction,
        getContent: this.getContent,
        getTotalCount: this.getTotalCount,
      }
    },
  },
  methods: {
    getTitle(item) {
      return getTitle(item, this.itemTitle)
    },
    getValue(item) {
      return getValue(item, this.itemValue)
    },
    updatedData(data) {
      this.s_data = data
    },
  },
}
</script>

<style lang="scss">
  html {
    --n-list-tree-padding: 20px;
  }
</style>
<style lang="scss" scoped>
  .n-datalist {
    font-size: .8rem;
    overflow: hidden;
  }
</style>
