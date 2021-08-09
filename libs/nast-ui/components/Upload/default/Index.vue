<template>
  <div class="n-upload">
    <n-form-item :title="title" active>
      <div class="n-input-area">
        <n-button @click="click">Выбрать файл</n-button>
        <input ref="input" type="file" :multiple="multi" @change="s_input" />
      </div>
      <div v-if="files.length" class="n-files">
        <n-editable-file v-for="(file, i) in files" :key="i" :file="file" @remove="remove(i)" />
      </div>
    </n-form-item>
  </div>
</template>

<script>
import each from 'lodash/each'
import props from './../props'

export default {
  name: 'NUpload',
  mixins: [ props, ],
  data() {
    return {
      files: this.clearValue(this.value),
    }
  },
  watch: {
    value(value) {
      this.files = this.clearValue(value)
    },
  },
  methods: {
    clearValue(value) {
      if (this.multi) {
        return value || []
      } else {
        return value ? [ value, ] : []
      }
    },
    click() {
      this.$refs.input.click()
    },
    remove(i) {
      if (!this.multi) {
        this.s_change(null)
      } else {
        const newFiles = this.files
        newFiles.splice(i, 1)
        this.s_change(newFiles)
      }
    },
    s_input() {
      let newFiles = []
      if (this.multi) {
        newFiles = this.files
        each(this.$refs.input.files, (file) => {
          newFiles.push(file)
        })
      } else {
        newFiles = this.$refs.input.files
      }
    
      this.s_change(newFiles)
    },
    s_change(newFiles) {
      if (!this.multi) {
        newFiles = newFiles[0]
      }
      if (this.value === null) {
        this.$set(this, 'files', newFiles)
      }

      this.input(newFiles)
      this.$emit('input', newFiles)
      this['update:value'](newFiles)
      this.$emit('update:value', newFiles)
    },
  },
}
</script>

<style lang="scss" scoped>
  .n-upload {
    
    .n-button {
      font-size: .8em;
    }

    .n-input-area {
      input {
        visibility: hidden;
        pointer-events: none;
        position: absolute;
        z-index: -1;
        width: 0;
      }
    }

    .n-files {
      margin: 0 -8px -8px;
      display: flex;
      flex-wrap: wrap;
      & > * {
        margin: 8px;
      }
    }

  }
</style>
