<template>
  <div class="n-data-filter">
    <div class="title" @click="toggleOpen">Filters</div>
    <div v-show="open" class="filters">
      <div v-for="filter in filters" :key="filter.name" class="filter">
        <template v-if="filter.type === 'search'">
          <n-input :name="filter.name" :value="data[filter.name]" :title="filter.title" @change="(value) => filterChange(filter.name, value)" />
        </template>
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
      open: false,
    }
  },
  methods: {
    toggleOpen() {
      this.open = !this.open
    },
    filterChange(name, value) {
      const newData = Object.assign({}, this.data)
      if (value) {
        newData[name] = value
      } else {
        delete(newData[name])
      }

      this.$emit('update:data', newData)
      this['update:data'](newData)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-data-filter {
    position: relative;

    .title {
      cursor: pointer;
      border-bottom: 1px dotted var(--text-color);
      display: inline-block;
    }

    .filters {
      background: #fff;
      box-shadow: 1px 1px 3px 0 #777;
      border-radius: 5px;
      padding: 20px;
      position: absolute;
      right: 0;
    }
  }
</style>
