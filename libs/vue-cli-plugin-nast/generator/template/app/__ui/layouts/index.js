import Simple from "nast-ui/src/layouts/Simple/Index.vue";
import Cool from "nast-ui/src/layouts/Cool/Index.vue";

export default {
  install(Vue) {
    Vue.component("nLayoutSimple", Simple);
    Vue.component("nLayoutCool", Cool);
  },
};
