export default {
  props: {
    value: { type: [ String, Object, Boolean, Number, Array, ], default: null, }, // multi if array
    data: { type: Array, default: () => [], },
    load: { type: Function, default: null, }, // props - ({ page, size, }, parent)
    creatable: { type: Boolean, default: false, },
    
    title: { type: String, default: '', },
    name: { type: String, default: () => `select-${Math.random()}`, },
    placeholder: { type: String, default: '', },
    
    disabled: { type: Boolean, default: false, },
    required: { type: Boolean, default: false, },
    text: { type: [ Boolean, String, ], default: false, },
    inline: { type: Boolean, default: false, },
    icon: { type: String, default: '', },
    iconInner: { type: String, default: '', },
    iconRight: { type: String, default: '', },
    iconRightInner: { type: String, default: '', },
    primary: { type: [ String, Boolean, ], default: false, },
    success: { type: [ String, Boolean, ], default: false, },
    warning: { type: [ String, Boolean, ], default: false, },
    danger: { type: [ String, Boolean, ], default: false, },
    secondary: { type: [ String, Boolean, ], default: false, },
    tertiary: { type: [ String, Boolean, ], default: false, },
    animate: { type: String, default: 'shake', },
    
    clear: { type: Boolean, default: true, },
    open: { type: Boolean, default: false, },
    closeOnSelect: { type: Boolean, default: null, }, // false if multi
    size: { type: Number, default: 10, },
    itemValue: { type: String, default: 'value', },
    optionTitle: { type: [ Function, String, ], default: (item) => item.title, },
    selectedTitle: { type: [ Function, String, ], default: (item) => item.title, },
    itemChildren: { type: String, default: 'children', },
    getContent: { type: Function, default: (response) => response.data, },
    getTotalCount: { type: Function, default: (response) => {
      if (response.data && response.data.pagination) {
        return response.data.pagination.total || null
      }
      if (response.headers) {
        return response.headers['x-total-count'] || null
      }
      return null
    }, },
  
    input: { type: Function, default: (value) => {}, },
    select: { type: Function, default: (value) => {}, },
    click: { type: Function, default: (event) => {}, },
    focusin: { type: Function, default: (event) => {}, },
    focusout: { type: Function, default: (event) => {}, },
    keydown: { type: Function, default: (event) => {}, },
    keyup: { type: Function, default: (event) => {}, },
    'update:value': { type: Function, default: (value) => {}, },
  },
  
  computed: {
    props() {
      return {
        value: this.value,
        data: this.data,
        load: this.load,
        creatable: this.creatable,
  
        title: this.title,
        name: this.name,
        placeholder: this.placeholder,
  
        disabled: this.disabled,
        required: this.required,
        text: this.text,
        inline: this.inline,
        icon: this.icon,
        iconInner: this.iconInner,
        iconRight: this.iconRight,
        iconRightInner: this.iconRightInner,
        primary: this.primary,
        success: this.success,
        warning: this.warning,
        danger: this.danger,
        secondary: this.secondary,
        tertiary: this.tertiary,
        animate: this.animate,
  
        clear: this.clear,
        open: this.open,
        closeOnSelect: this.closeOnSelect,
        size: this.size,
        itemValue: this.itemValue,
        optionTitle: this.optionTitle,
        selectedTitle: this.selectedTitle,
        itemChildren: this.itemChildren,
        getContent: this.getContent,
        getTotalCount: this.getTotalCount,
        
        input: this.input,
        select: this.select,
        'update:value': this['update:value'],
      }
    },
    events() {
      return {
        input: this.input,
        select: this.select,
        focusout: this.focusout,
        focusin: this.focusin,
        'update:value': this['update:value'],
      }
    },
    functions() {
      return {
      }
    },
  },
}
