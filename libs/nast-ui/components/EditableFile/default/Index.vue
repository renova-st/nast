<template>
  <div :class="[ 'n-editable-file', {'n-inline':inline}, {'n-round':round}, {'n-bg':bg}, `n-${size}`, ]">
    <div class="n-info">
      <div class="n-name">{{ file.name }}</div>
      <a @click="s_remove">x</a>
      <div class="n-size">{{ sizeUnits(file.size) }}</div>
    </div>
    <component :is="component" :file="file" bg class="n-file-component" />
  </div>
</template>

<script>
import each from 'lodash/each'
import props from './../props'

export default {
  mixins: [ props, ],
  data: () => ({
    extensions: {
      image: [ 'jpeg', 'jpg', 'png', 'gif', ],
      video: [],
    },
  }),
  computed: {
    extension() {
      let ext = 'unknown'

      const filename = this.file ? this.file.name : (this.src || '')
      const parts = filename.split('.')
      if (parts.length > 1) {
        ext = parts[parts.length - 1]
      }

      return ext
    },
    component() {
      let component = 'file'
      each(this.extensions, (exts, name) => {
        if (exts.includes(this.extension)) {
          component = name
        }
      })

      return `n-${component}`
    },
  },
  methods: {
    sizeUnits(bytes) {
      let sOutput = bytes + ' bytes'
      const aMultiples = [ 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', ]
      for (let nMultiple = 0, nApprox = bytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {
        sOutput = nApprox.toFixed(2) + ' ' + aMultiples[nMultiple]
      }
      return sOutput
    },
    s_remove() {
      this.remove()
      this.$emit('remove')
    },
  },
}
</script>

<style lang="scss">
  html {
    --n-file-size: 3em;
    --n-image-bg-color: rgba(127, 127, 127, .07)
  }
</style>
<style lang="scss" scoped>
  .n-editable-file {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    &.n-bg {
      background-image:
        linear-gradient(45deg, var(--n-image-bg-color) 25%, transparent 25%),
        linear-gradient(-45deg, var(--n-image-bg-color) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--n-image-bg-color) 75%),
        linear-gradient(-45deg, transparent 75%, var(--n-image-bg-color) 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    }
    &.n-center {
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-color);
    }
    &.n-inline {
      display: inline-flex;
    }

    &.n-preview {
      width: 100px;
      height: 100px;
      .n-file-component {
        width: 100%;
        height: 100%;
      }
    }

    &:hover {
      .n-info {
        opacity: 1;
      }
    }
    .n-info {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 4px 4px 10px;
      opacity: 0;
      transition: opacity var(--transition-slow);
      color: #fff;
      background: rgb(0,0,0);
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.7) 50%, rgba(9,9,121,0) 100%);

      .n-name {
        line-height: 1.1;
        font-size: .8em;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .n-size {
        font-size: .6em;
        opacity: .5;
      }
      a {
        cursor: pointer;
        float: right;
        line-height: 1;
        font-size: .8em;
        position: relative;
        z-index: 1;
      }
    }
  }
</style>
