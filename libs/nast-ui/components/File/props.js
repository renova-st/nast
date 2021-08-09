/**
 * Используется для визуального отображения разных файлов, содержимое которых показать невозможно.
 * Подбирает иконку в зависимости от разрешения.
 */
export default {
  name: 'NFile',
  props: {
    src: { type: String, default: undefined, },
    file: { type: File, default: undefined, },

    inline: { type: Boolean, default: false, },
    round: { type: Boolean, default: false, },
    bg: { type: Boolean, default: false, },
    size: { type: String, default: 'preview', }, // line, preview, full
  },

  computed: {
    props() {
      return {
      }
    },
    events() {
      return {
      }
    },
    functions() {
      return {
      }
    },
  },
}
