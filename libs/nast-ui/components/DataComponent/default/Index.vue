<template>
  <div class="n-data-component">
    <slot :data="computedData" />
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import props from './../props'
import { paginated, searched, sorted, } from './../utils'

export default {
  name: 'NDataComponent',
  mixins: [ props, ],
  data() {
    return {
      loadedData: [],
      page: 1,
      total: 0,
      loading: 0,
      stopped: false,
    }
  },
  computed: {
    computedData() {
      const value = this.data ? this.paginated(this.sorted(this.filtered(this.searched(this.data)))) : this.loadedData
      this.updated(value)
      this.$emit('updated', value)
      return value
    },
  },
  mounted() {
    if (this.data) {
      this.updated(this.computedData)
      this.$emit('updated', this.computedData)
    }
  },
  methods: {
    update: throttle(function() {
      this.s_load(1)
    }, 200),
    next() {
      this.s_load(this.page + 1)
    },
    stop() {
      this.stopped = true
      this.loading = 0
    },
    s_load(page, parentId = undefined) {
      if (this.load) {
        this.stopped = false
        this.loading++
        this.page = page
        
        const params = {
          page: this.firstPage ? this.page : this.page - 1,
          size: this.size,
          search: this.search,
          parentId,
        }
  
        this.beforeLoad(params)
        this.$emit('beforeLoad', params)
        
        this.load(params).then((response) => {
          if (!this.stopped) {
            this.total = this.getTotalCount(response)
            const data = this.getContent(response)
            this.loadedData = (this.page === this.firstPage) ? data : this.loadedData.concat(data)
  
            this.$nextTick(() => {
              this.loaded()
              this.$emit('loaded')
              this.$nextTick(() => {
                this.loading--
              })
            })
          }
        })
      }
    },
    searched(data) {
      return searched(data, this.search, this.fields)
    },
    filtered(data) {
      return data
    },
    sorted(data) {
      return sorted(data, this.sort, this.fields, this.sortFunction)
    },
    paginated(data) {
      return paginated(data, this.page, this.size)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-data-component {
  
  }
</style>
