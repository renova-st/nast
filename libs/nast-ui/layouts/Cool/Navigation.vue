<template>
  <n-navigation :data="menu" vertical class="layout-navigation">
    <div slot="item" slot-scope="{ item, }" class="n-item">
      <n-icon :icon="item.icon || 'genderless'" />
      <span class="n-item-content">{{ item.title }}</span>
      <span v-if="item.children" class="n-arrow">
        <svg x="0px" y="0px" viewBox="0 0 14 30">
          <path d="M9.148 2.352l-4.148 4.148 4.148 4.148q0.148 0.148 0.148 0.352t-0.148 0.352l-1.297 1.297q-0.148
            0.148-0.352 0.148t-0.352-0.148l-5.797-5.797q-0.148-0.148-0.148-0.352t0.148-0.352l5.797-5.797q0.148-0.148
            0.352-0.148t0.352 0.148l1.297 1.297q0.148 0.148 0.148 0.352t-0.148 0.352z"
          ></path>
        </svg>
      </span>
    </div>
  </n-navigation>
</template>

<script>
export default {
  name: 'LayoutSimpleNavigation',
  props: {
    menu: { type: Array, default: () => ([]), },
  },
}
</script>

<style lang="scss" scoped>
  .layout-navigation {
    justify-content: flex-start;
    flex-grow: 1;
    
    .n-item {
      display: flex;
      flex-direction: row;
      align-items: center;
    
      .n-item-content {
        flex-grow: 1;
      }
    
      .n-icon {
        margin-right: 8px;
      }
    
      .n-arrow {
        opacity: .5;
        width: 8px;
        height: 8px;
        fill: var(--n-layout-sidebar-color);
        background-repeat: no-repeat;
        transition: transform .3s;
        transform: rotate(-90deg);
      }
    }
  
    .n-open {
      .n-arrow {
        transform: rotate(-270deg);
      }
    }
  }
  
  .n-navigation::v-deep {
    margin: 0;
    padding-top: 15px;
    
    .n-navigation-item {
      margin: 0;
      
      .n-content {
        margin-left: -15px;
        padding: 8px 15px;
        display: block;
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        color: var(--n-layout-sidebar-color);
      }
      
      &.n-active .n-content {
        border: none;
        background: var(--primary-t-2);
        color: var(--primary-text)
      }
      &:hover:not(.n-active) .n-content {
        background: rgba(0, 0, 0, .2);
      }
    }
    
    .n-navigation-group > .n-navigation-item {
      &.n-active > .n-content {
        background: transparent;
      }
      &:hover > .n-content {
        background: rgba(0, 0, 0, .2);
      }
    }
    
    .n-dropdown {
      .n-item { padding-left: var(--n-layout-sidebar-item-offset); }
      .n-dropdown { .n-item { padding-left: calc(2 * var(--n-layout-sidebar-item-offset)); } }
      .n-dropdown { .n-dropdown { .n-item { padding-left: calc(3 * var(--n-layout-sidebar-item-offset)); } } }
      .n-dropdown { .n-dropdown { .n-dropdown { .n-item { padding-left: calc(3 * var(--n-layout-sidebar-item-offset)); } } } }
      .n-dropdown { .n-dropdown { .n-dropdown { .n-dropdown { .n-item { padding-left: calc(4 * var(--n-layout-sidebar-item-offset)); } } } } }
    }
  }
</style>
