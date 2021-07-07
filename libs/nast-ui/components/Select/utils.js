

const dropdownProps = (self) => {
  return {
    open: self.open,
    data: self.data,
    value: self.value,
    fullValue: self.fullValue,
    closeByOutside: self.closeByOutside,
    closeOnSelect: self.closeOnSelect,
    itemValue: self.itemValue,
    itemTitle: self.optionTitle,
    itemChildren: self.itemChildren,
    size: self.size,
    load: self.load,
    getContent: self.getContent,
    getTotalCount: self.getTotalCount,
  }
}

const inputProps = (self) => {
  return {
    clear: self.clear,
    name: self.name,
    title: self.title,
    value: self.value,
    required: self.required,
    placeholder: self.placeholder,
    disabled: self.disabled,
    text: self.text,
    inline: self.inline,
    icon: self.icon,
    iconInner: self.iconInner,
    iconRight: self.iconRight,
    iconRightInner: self.iconRightInner,
    primary: self.primary,
    success: self.success,
    warning: self.warning,
    danger: self.danger && self.danger.length > 0,
    secondary: self.secondary,
    tertiary: self.tertiary,
    animate: self.animate,
    itemTitle: self.selectedTitle,
  }
}


export {
  dropdownProps,
  inputProps,
}
