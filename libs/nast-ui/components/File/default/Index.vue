<template>
  <div :class="[ 'n-file', {'n-inline':inline}, {'n-round':round}, {'n-bg':bg}, `n-${size}`, ]">
    <n-icon :icon="icon" />
  </div>
</template>

<script>
import props from './../props'

export default {
  mixins: [ props, ],
  data: () => ({
    icons: {
      txt: 'file-alt',
      png: 'file-image',
      jpg: 'file-image',
      jpeg: 'file-image',
      mp3: 'file-audio',
      mp4: 'file-video',
      avi: 'file-video',
      doc: 'file-word',
      docx: 'file-word',
      pdf: 'file-pdf',
    },
  }),
  computed: {
    extension() {
      let ext = ''

      const filename = this.file ? this.file.name : (this.src || '')
      const parts = filename.split('.')
      if (parts.length > 1) {
        ext = parts[parts.length - 1]
      }

      return ext
    },
    icon() {
      return this.icons[this.extension.toLowerCase()] || 'file'
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
  .n-file {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 500px;
    max-height: 500px;

    &.n-bg {
      background-image:
        linear-gradient(45deg, var(--n-image-bg-color) 25%, transparent 25%),
        linear-gradient(-45deg, var(--n-image-bg-color) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--n-image-bg-color) 75%),
        linear-gradient(-45deg, transparent 75%, var(--n-image-bg-color) 75%);
      background-size: 20px 20px;
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
      border: 1px solid var(--border-color);
    }
    &.n-center {
    }
    &.n-inline {
      display: inline-flex;
    }

    &.n-preview {
      .n-icon {
        font-size: var(--n-file-size);
      }
    }
  }
</style>
