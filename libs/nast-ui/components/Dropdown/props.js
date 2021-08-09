export default {
  props: {
    open: { type: Boolean, default: null, },
    data: { type: Array, default: () => [], },
    load: { type: Function, default: null, }, // props - ({ page, size, }, parent)
    value: { type: [ String, Object, Boolean, Number, Array, ], default: null, },
    closeByOutside: { type: Boolean, default: true, },
    closeOnSelect: { type: Boolean, default: null, }, // false if multi
    itemValue: { type: String, default: 'value', },
    itemTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    size: { type: Number, default: 10, },
    filterBySearch: { type: Boolean, default: null, }, // if load - false, if data - true
    search: { type: [ String, Number, Array, ], default: '', },
    getContent: { type: Function, default: (response) => response.data, },
    getTotalCount: { type: Function, default: (response) => {
      if (response.pagination) {
        return response.pagination.total || null
      }
      if (response.headers) {
        return response.headers['x-total-count'] || null
      }
      return null
    }, },
    
    side: { type: String, default: 'bottom', }, // top, bottom, left, right
    up: { type: Boolean, default: false, },
    align: { type: String, default: 'left', }, // left, right, center
    inline: { type: Boolean, default: false, },
    absolute: { type: Boolean, default: false, },
    fit: { type: Boolean, default: false, },
    target: { type: String, default: '', },
    
    click: { type: Function, default: (item, isGroup, event) => {}, },
    select: { type: Function, default: (item, items, indexes) => {}, },
    scroll: { type: Function, default: (event) => {}, },
    focus: { type: Function, default: (event) => {}, },
    blur: { type: Function, default: (event) => {}, },
    'update:value': { type: Function, default: (value) => {}, },
  },
  
  computed: {
    props() {
      return {
        open: this.open,
        data: this.data,
        load: this.load,
        value: this.value,
        closeByOutside: this.closeByOutside,
        closeOnSelect: this.closeOnSelect,
        itemValue: this.itemValue,
        itemTitle: this.itemTitle,
        itemChildren: this.itemChildren,
        size: this.size,
        filterBySearch: this.filterBySearch,
        search: this.search,
        getContent: this.getContent,
        getTotalCount: this.getTotalCount,
        side: this.side,
        up: this.up,
        align: this.align,
        inline: this.inline,
        absolute: this.absolute,
        fit: this.fit,
      }
    },
    events() {
      return {
        click: this.click,
        select: this.select,
        scroll: this.scroll,
        focus: this.focus,
        blur: this.blur,
        'update:value': this['update:value'],
      }
    },
  },
}
