<template>
  <div class="n-table">
    <n-loader :loading="loading" />
    <div :class="[ 'table' , { 'js': js, }, ]">
      <div v-if="!headless" class="row header">
        <div v-for="column in s_columns" :key="column.name"
             :style="columnStyle(column, true)" :class="[ 'cell', column.name, ...column.class, ]"
             @click="s_headerClick($event, column)"
        >
          <slot :column="column" name="headerCell">{{ getTitle(column) }}</slot>
        </div>
      </div>
      <div v-for="(item, i) in data" :key="item[keyName] || i" class="row item">
        <div v-for="column in s_columns" :key="column.name"
             :style="columnStyle(column)" :class="[ 'cell', column.name, ...column.class, ]"
             @click="s_cellClick($event, item, column)">
          <slot :name="column.name" :item="item" :index="i">{{ get(item, column.name) }}</slot>
        </div>
      </div>
    </div>

    <div v-if="!data.length" class="message">
      <slot name="message">No data</slot>
    </div>
  </div>
</template>

<script>
import get from 'lodash/get'
import props from './../props'
import { normalizeColumns, } from './../utils'

export default {
  name: 'NTable',
  mixins: [ props, ],
  computed: {
    s_columns() {
      return normalizeColumns(this.data, this.columns)
    },
  },
  methods: {
    get,
    columnStyle(column, header = false) {
      const style = {}

      if (!header) {
        if (column.align) {
          style.textAlign = column.align
        }
      }

      if (this.js) {
        style.minWidth = column.width
      } else {
        style.width = column.width
      }

      return style
    },
    getTitle(column) {
      return column.title === undefined ? column.name : column.title
    },

    s_headerClick(event, column) {
      this.headerClick(event, column)
      this.$emit('headerClick', event, column)
    },
    s_cellClick(event, item, column) {
      this.cellClick(event, item, column)
      this.$emit('cellClick', event, item, column)
    },
  },
}
</script>

<style lang="scss">
  html {
    --n-table-cell-padding: 12px 12px;

    --n-table-cell-margin-top: 0px;
    --n-table-cell-margin-right: 0px;
    --n-table-cell-margin-bottom: 0px;
    --n-table-cell-margin-left: 0px;

    --n-table-border-top-width: 1px;
    --n-table-border-right-width: 0;
    --n-table-border-bottom-width: 1px;
    --n-table-border-left-width: 0;
    --n-table-border: solid #e0e0e0;
  }
</style>
<style lang="scss" scoped>
  .n-table {
    overflow-x: auto;
    position: relative;
    display: block;
    width: 100%;

    .table {
      display: table;
      border-collapse: collapse;
      width: 100%;
    }
    .row {
      display: table-row;
      &.header {
        display: table-header-group;
        .cell {
          font-weight: 500;
        }
      }
    }
    .cell {
      display: table-cell;
      vertical-align: top;
      padding: var(--n-table-cell-padding);
      border: var(--n-table-border);
      border-width: var(--n-table-border-top-width) var(--n-table-border-right-width)
      var(--n-table-border-bottom-width) var(--n-table-border-left-width);
      &:first-child { padding-left: 0; }
      &:last-child { padding-right: 0; }
    }

    .table.js {
      display: block;

      .row {
        display: flex;
        flex-wrap: nowrap;
        justify-content: flex-start;
        width: 100%;
      }
      .cell {
        flex-basis: 0;
        flex-grow: 1;
        width: 0;
        word-break: break-word;
        box-sizing: border-box;
        white-space: normal;
        $mb-top: calc(var(--n-table-cell-margin-top) - var(--n-table-border-top-width));
        $mb-left: calc(var(--n-table-cell-margin-left) - var(--n-table-border-left-width));
        margin: $mb-top var(--n-table-cell-margin-right) var(--n-table-cell-margin-bottom) $mb-left;
      }
      .row:first-child .cell {
        margin-top: var(--n-table-cell-margin-top);
      }
      .cell:first-child {
        margin-left: var(--n-table-cell-margin-left);
      }
    }

    .message {
      padding: 20px 40px 40px;
      text-align: center;
    }
  }
</style>
