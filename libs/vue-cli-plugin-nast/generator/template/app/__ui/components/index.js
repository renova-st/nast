import Aside from 'nast-ui/components/Aside/default/Index.vue'
import AsideHamburger from 'nast-ui/components/Aside/_AsideHamburger/default/Index.vue'
import Breadcrumbs from 'nast-ui/components/Breadcrumbs/default/Index.vue'
import Button from 'nast-ui/components/Button/default/Index.vue'
import Card from 'nast-ui/components/Card/default/Index.vue'
import Center from 'nast-ui/components/Center/default/Index.vue'
import Container from 'nast-ui/components/Container/default/Index.vue'
import DataComponent from 'nast-ui/components/DataComponent/default/Index.vue'
import DataFilter from 'nast-ui/components/DataFilter/default/Index.vue'
import Datalist from 'nast-ui/components/Datalist/default/Index.vue'
import Datatable from 'nast-ui/components/Datatable/default/Index.vue'
import Divide from 'nast-ui/components/Divide/default/Index.vue'
import Dropdown from 'nast-ui/components/Dropdown/default/Index.vue'
import DropdownItem from 'nast-ui/components/Dropdown/_DropdownItem/default/Index.vue'
import DropdownGroup from 'nast-ui/components/Dropdown/_DropdownGroup/default/Index.vue'
import EditableFile from 'nast-ui/components/EditableFile/default/Index.vue'
import File from 'nast-ui/components/File/default/Index.vue'
import Form from 'nast-ui/components/Form/default/Index.vue'
import FormItem from 'nast-ui/components/FormItem/default/Index.vue'
import Header from 'nast-ui/components/Header/default/Index.vue'
import Icon from 'nast-ui/components/Icon/default/Index.vue'
import Image from 'nast-ui/components/Image/default/Index.vue'
import Input from 'nast-ui/components/Input/default/Index.vue'
import Items from 'nast-ui/components/Items/default/Index.vue'
import Link from 'nast-ui/components/Link/default/Index.vue'
import List from 'nast-ui/components/List/default/Index.vue'
import ListGroup from 'nast-ui/components/List/_ListGroup/default/Index.vue'
import ListItem from 'nast-ui/components/List/_ListItem/default/Index.vue'
import Loader from 'nast-ui/components/Loader/default/Index.vue'
import Modal from 'nast-ui/components/Modal/default/Index.vue'
import ModalCard from 'nast-ui/components/ModalCard/default/Index.vue'
import Navigation from 'nast-ui/components/Navigation/default/Index.vue'
import NavigationGroup from 'nast-ui/components/Navigation/_NavigationGroup/default/Index.vue'
import NavigationItem from 'nast-ui/components/Navigation/_NavigationItem/default/Index.vue'
import Pagination from 'nast-ui/components/Pagination/default/Index.vue'
import Popup from 'nast-ui/components/Popup/default/Index.vue'
import Progress from 'nast-ui/components/Progress/default/Index.vue'
import Select from 'nast-ui/components/Select/default/Index.vue'
import Table from 'nast-ui/components/Table/default/Index.vue'
import Tabs from 'nast-ui/components/Tabs/default/Index.vue'
import TabsContent from 'nast-ui/components/Tabs/_TabsContent/default/Index.vue'
import Typography from 'nast-ui/components/Typography/default/Index.vue'
import Upload from 'nast-ui/components/Upload/default/Index.vue'

export default {
  install(Vue) {
    Vue.component('nAside', Aside)
    Vue.component('nAsideHamburger', AsideHamburger)
    Vue.component('nBreadcrumbs', Breadcrumbs)
    Vue.component('nButton', Button)
    Vue.component('nCard', Card)
    Vue.component('nCenter', Center)
    Vue.component('nContainer', Container)
    Vue.component('nDataComponent', DataComponent)
    Vue.component('nDataFilter', DataFilter)
    Vue.component('nDatalist', Datalist)
    Vue.component('nDatatable', Datatable)
    Vue.component('nDivide', Divide)
    Vue.component('nDropdown', Dropdown)
    Vue.component('nDropdownItem', DropdownItem)
    Vue.component('nDropdownGroup', DropdownGroup)
    Vue.component('nEditableFile', EditableFile)
    Vue.component('nFile', File)
    Vue.component('nForm', Form)
    Vue.component('nFormItem', FormItem)
    Vue.component('nHeader', Header)
    Vue.component('nIcon', Icon)
    Vue.component('nImage', Image)
    Vue.component('nInput', Input)
    Vue.component('nItems', Items)
    Vue.component('nLink', Link)
    Vue.component('nList', List)
    Vue.component('nListGroup', ListGroup)
    Vue.component('nListItem', ListItem)
    Vue.component('nLoader', Loader)
    Vue.component('nModal', Modal)
    Vue.component('nModalCard', ModalCard)
    Vue.component('nNavigation', Navigation)
    Vue.component('nNavigationGroup', NavigationGroup)
    Vue.component('nNavigationItem', NavigationItem)
    Vue.component('nPagination', Pagination)
    Vue.component('nPopup', Popup)
    Vue.component('nProgress', Progress)
    Vue.component('nSelect', Select)
    Vue.component('nTable', Table)
    Vue.component('nTabs', Tabs)
    Vue.component('nTabsContent', TabsContent)
    Vue.component('nTypography', Typography)
    Vue.component('nUpload', Upload)
  },
}
