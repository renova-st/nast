<template>
  <div class="n-list-item">
    <div :class="[ 'n-content', {'n-group': isGroup}, {'n-open': s_open}, ]">
      <n-icon v-if="sortable" class="n-handle" icon="arrows-alt" />
      <n-icon v-if="isGroup" class="n-caret" icon="angle-right" @click="s_click" />
      <div class="n-title" @click="s_click">
        <slot name="item" :item="item" :isGroup="isGroup">{{ getTitle(item) }}</slot>
      </div>
      <slot name="tools" :item="item" :is-group="isGroup">
        <n-dropdown :data="tools" side="right" @update:value="toolsClick"><n-icon class="n-tools" icon="cog" /></n-dropdown>
      </slot>
    </div>
    <n-list-group v-if="isGroup && s_open" :data="item[itemChildren]" :sortable="sortable" :opened="opened">
      <template #item="{ item, isGroup, }"><slot name="item" :item="item" :is-group="isGroup" /></template>
      <template #tools="{ item, isGroup, }"><slot name="tools" :item="item" :is-group="isGroup" /></template>
    </n-list-group>
  </div>
</template>

<script>
import props from './../props'
import { getTitle, } from 'nast-ui/utils/functions'

export default {
  name: 'NListItem',
  mixins: [ props, ],
  data() {
    return {
      s_open: this.open || this.opened,
      tools: [
        'Редактировать',
        'Удалить',
      ],
    }
  },
  computed: {
    isGroup() {
      const children = this.item[this.itemChildren]
      return children === [] ? false : Boolean(children)
    },
  },
  watch: {
    open(value) {
      this.s_open = value
    },
  },
  methods: {
    toolsClick(value) {
      if (value === 'Редактировать') {
        this.$router.push({ query: { modal: 'project', id: this.item.value, }, })
      }
    },
    getTitle(item) {
      return getTitle(item, this.itemTitle)
    },
    s_click(event) {
      if (this.isGroup) {
        if (this.open === null) {
          this.s_open = !this.s_open
        }
        this['update:open'](!this.open)
        this.$emit('update:open', !this.open)
      }
      
      this.click(this.item, event)
      this.$emit('click', this.item, this.isGroup, event)
    },
  },
}
</script>

<style lang="scss">
  .sortable-ghost {
    opacity: .2;
  }
  .sortable-drag {
    opacity: 0;
  }
</style>
<style lang="scss" scoped>
  .n-list-item {
    --n-popup-width: 200px;
    
    .n-content {
      display: flex;
      align-items: center;
      margin: 0 -5px;
      &>* {
        padding: 5px;
      }
      &:hover {
        .n-tools { opacity: .2; }
      }
      &.n-group {
        .n-title { cursor: pointer; }
      }
      &.n-open {
        .n-caret { transform: rotate(90deg); }
      }
      
      .n-title {
        padding: 12px 5px;
      }
      .n-handle {
        cursor: grab;
        &:active {
          cursor: grabbing;
        }
      }
      .n-tools {
        cursor: pointer;
        opacity: 0;
        transition: opacity var(--transition-slow);
        &:hover {
          opacity: .5;
        }
      }
      .n-caret {
        cursor: pointer;
        opacity: .5;
        transition: transform var(--transition-fast);
      }
    }
    
    .n-list-group {
      padding-left: 40px;
    }
  }
</style>
