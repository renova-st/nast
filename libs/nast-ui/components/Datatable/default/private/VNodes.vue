<script type="text/jsx">
import { splitStringBySearch, } from './utils'

export default {
  name: 'VNodes',
  props: {
    vnodes: {
      type: Array,
      required: true,
    },
    search: {
      type: Array,
      default: () => ([]),
    },
  },
  methods: {
    highlightNode(nodes) {
      if (nodes) {
        return nodes.map((node) => {
          if (node.text) {
            return this.highlightText(node.text)
          } else if (node.children) {
            node.children = this.highlightNode(node.children)
          } else if (node.componentOptions && node.componentOptions.children) {
            node.componentOptions.children = this.highlightNode(node.componentOptions.children)
          }
          return node
        })
      }
      return []
    },
    highlightText(text) {
      const newValue = splitStringBySearch(text, this.search).reduce((result, item) => {
        if (item.search) {
          result.push(<span class="search-hl">{item.string}</span>)
        } else {
          result.push(item.string)
        }
        return result
      }, [])

      return <span>{newValue}</span>
    },
  },
  render(h) {
    return this.highlightNode(this.vnodes)[0]
  },
}
</script>
