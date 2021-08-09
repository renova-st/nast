<template>
  <n-navigation :data="menu" vertical class="layout-simple-navigation">
    <div slot="item" slot-scope="{ item, }" class="item">
      <n-icon v-if="item.icon" :icon="item.icon" />
      <span class="item-content">{{ item.title }}</span>
      <span v-if="item.children" class="arrow">
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
  .layout-simple-navigation {
    .item {
      display: flex;
      flex-direction: row;
      align-items: center;
    
      .item-content {
        flex-grow: 1;
      }
    
      .n-icon {
        margin-right: 8px;
      }
    
      .arrow {
        opacity: .5;
        width: 8px;
        height: 8px;
        fill: var(--sidebar-color);
        background-repeat: no-repeat;
        transition: transform .3s;
        transform: rotate(-90deg);
      }
    }
  
    .open {
      .arrow {
        transform: rotate(-270deg);
      }
    }
  }
  
  .n-navigation::v-deep {
    margin: 0;
    padding-top: 15px;
    
    .n-navigation-item {
      margin: 0;
      
      .content {
        padding: 14px 15px;
        display: block;
      }
      
      &.active .content {
        border: none;
        background: var(--primary);
      }
      &:hover:not(.active) .content {
        background: var(--primary-t-6);
      }
    }
    
    .n-navigation-group > .n-navigation-item {
      &.active > .content {
        background: transparent;
      }
      &:hover > .content {
        background: var(--primary-t-6);
      }
    }
    
    .dropdown {
      .item { padding-left: var(--n-layout-simple-sidebar-item-offset); }
      .dropdown { .item { padding-left: calc(2 * var(--n-layout-simple-sidebar-item-offset)); } }
      .dropdown { .dropdown { .item { padding-left: calc(3 * var(--n-layout-simple-sidebar-item-offset)); } } }
      .dropdown { .dropdown { .dropdown { .item { padding-left: calc(3 * var(--n-layout-simple-sidebar-item-offset)); } } } }
      .dropdown { .dropdown { .dropdown { .dropdown { .item { padding-left: calc(3 * var(--n-layout-simple-sidebar-item-offset)); } } } } }
    }
  }
</style>
