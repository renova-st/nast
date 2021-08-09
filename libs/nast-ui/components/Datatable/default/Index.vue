<template>
  <div class="n-datatable">
    <n-data-component :data="data" :fields="columns" @updated="updated" />

    <n-loader :loading="loading" />

    <div class="top">
      <div class="left">
        <slot name="topLeft">
          <n-input v-model="input" class="search" placeholder="Поиск" />
        </slot>
      </div>
      <div class="right">
        <slot name="topRight">
          <n-data-filter v-if="filters.length" v-model="filtersData" :filters="filters" />
        </slot>
      </div>
    </div>


    <n-table ref="table" :data="s_dataPaginated" :columns="showedColumns" :js="js" :key-name="keyName" @headerClick="onHeaderClick">
      <template v-slot:headerCell="{ column, }">
        <span>{{ column.title }}</span>
        <span v-if="column.sort" :class="[ 'sort', { active: s_sort[column.name] !== undefined, }, ]">
          <n-icon :icon="getSortIcon(column)" />
        </span>
      </template>

      <template v-for="{ name, } in s_columns" :slot="name" slot-scope="{ item, }">
        <slot v-if="!canSearch(name)" :name="name" :item="item" />
        <v-nodes v-else :key="name" :vnodes="getItemNode(name, item)" :search="search" />
      </template>

      <template v-slot:message>
        <slot v-if="search.length" name="nosearch">Nothing found</slot>
        <slot v-else name="nodata">No data</slot>
      </template>
    </n-table>


    <div class="bottom">
      <div class="left">
        <slot name="bottomLeft" />
      </div>
      <div class="right">
        <slot name="bottomRight">
          <n-pagination v-model="pagination" :count="data.length" :count-temp="s_data.length" />
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import props from './../props'
import VNodes from './private/VNodes'
import { searched, sorted, paginated, normalizeColumns, parsedData, } from './../utils'


export default {
  name: 'NDatatable',
  components: { VNodes, },
  mixins: [ props, ],
  data() {
    return {
      search: [],
      input: '',
      s_sort: this.sort,
      s_hidden: this.hidden,
      count: 0,
      s_data: this.data,
      s_dataPaginated: [],
      infinityPage: 0,
      pagination: {
        size: this.size,
        page: this.page,
        infinity: false,
        fixed: true,
      },
      loading: false,
      filtersData: {},
    }
  },
  computed: {
    s_columns() {
      return normalizeColumns(this.data[0], this.columns)
    },
    s_columnsByName() {
      return this.s_columns.reduce((result, column) => {
        result[column.name] = column
        return result
      }, {})
    },
    showedColumns() {
      const showedColumns = []
      this.s_columns.map((column) => {
        if (!this.s_hidden.includes(column.name)) {
          showedColumns.push(column)
        }
      })

      return showedColumns
    },
    parsedData() {
      return parsedData(this.data, this.columns, this.$scopedSlots, this.keyName)
    },
  },
  watch: {
    input(value) {
      this.search = [ value.trim(), ]
      this.searchData()
    },
    sort(value) {
      this.s_sort = value
      this.sortData()
    },
    pagination(value) {
      if (value.infinity) {
        if (!this.infinityPage) {
          this.infinityPage = 1
          if (value.page !== 1) {
            this.$set(this.pagination, 'page', 1)
          }
        }
        if (value.infinityPage === this.infinityPage) {
          return
        }
        if (value.infinityPage !== this.infinityPage + 1) {
          this.$set(this.pagination, 'infinityPage', this.infinityPage + 1)
        }
      }
      this.paginateData()
    },
    data(value) {
      this.searchData()
    },
    page(value) {
      this.$set(this.pagination, 'page', value)
    },
    size(value) {
      this.$set(this.pagination, 'size', value)
    },
    hidden(value) {
      this.s_hidden = value
    },
  },
  mounted() {
    this.searchData()
  },
  created() {
    if (this.hidden.length === 0) {
      const newHidden = []
      this.s_columns.map((column) => {
        if (column.hidden) {
          newHidden.push(column.name)
        }
      })
      this.s_hidden = newHidden
    }
  },
  methods: {
    searchData() {
      let data = this.data

      if (this.search.length) {
        data = searched(this.data, this.parsedData, this.search, this.s_columns, this.keyName)
      }
      if (Object.keys(this.s_sort).length) {
        data = sorted(data, this.parsedData, this.s_sort, this.s_columnsByName, this.keyName)
      }
      this.s_data = data

      this.infinityPage = 0
      this.paginateData()
    },
    sortData() {
      this.s_data = sorted(this.s_data, this.parsedData, this.s_sort, this.s_columnsByName, this.keyName)

      this.infinityPage = 0
      this.paginateData()
    },
    paginateData() {
      if (this.pagination.infinity) {
        this.infinityPage++
        const newData = paginated(this.s_data, this.infinityPage, this.pagination.size)
        this.s_dataPaginated = this.s_dataPaginated.concat(newData)
      } else {
        this.infinityPage = 0
        this.s_dataPaginated = paginated(this.s_data, this.pagination.page, this.pagination.size)
      }
    },
    onHeaderClick(event, column) {
      if (column.sort) {
        const current = this.s_sort[column.name]

        if (!event.shiftKey) {
          this.s_sort = {}
        }

        if (current === 0) {
          this.$set(this.s_sort, column.name, 1)
        } else if (current === 1) {
          this.$delete(this.s_sort, column.name)
        } else {
          this.$set(this.s_sort, column.name, 0)
        }

        this.sortData()
      }
    },
    getItemNode(name, item) {
      const slot = this.$scopedSlots[name]
      if (slot) {
        return slot({ item, })
      } else {
        return [ { text: item[name] + '', }, ]
      }
    },
    canSearch(name) {
      return this.s_columnsByName[name].searchable !== false
    },
    getSortIcon(column) {
      const value = this.s_sort[column.name]
      if (value) {
        return 'long-arrow-alt-up'
      } else if (value === undefined) {
        return 'arrows-alt-v'
      } else {
        return 'long-arrow-alt-down'
      }
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-datatable {

  }
</style>
