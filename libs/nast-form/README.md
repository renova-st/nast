# nast-form

## Installation
```
npm i -S nast-form
```

## Prepare
```
import Vue from 'vue'
import App from './App'
import NastForm from 'nast-form'

Vue.use(NastForm.vue(), {})

new Vue({
  render: (h) => h(App),
}).$mount('#app')
```

## Basic usage
```
&lt;div id=&quot;app&quot;&gt;
&lt;form @submit.prevent=&quot;submit&quot;&gt;
  {{ $form.errors() }}
  &lt;div&gt;&lt;input title=&quot;Name&quot; :v-bind=&quot;$form.input(&#39;name&#39;)&quot; @input=&quot;($event) =&gt; change($event, &#39;name&#39;)&quot; /&gt;&lt;/div&gt;
  &lt;div&gt;&lt;input title=&quot;Email&quot; :v-bind=&quot;$form.input(&#39;email&#39;)&quot; @input=&quot;($event) =&gt; change($event, &#39;email&#39;)&quot; /&gt;&lt;/div&gt;
  &lt;div&gt;&lt;button type=&quot;submit&quot;&gt;Submit&lt;/button&gt;&lt;/div&gt;
&lt;/form&gt;
&lt;/div&gt;

export default {
  name: 'App',
  mounted() {
    this.$form.init({
      name: '',
      email: '',
    })
    this.$form.rules({
      name: [ 'required', ],
      email: [ 'email', ],
    })
  },
  methods: {
    change(event, name) {
      this.$form.set(name, event.target.value)
    },
    submit() {
      if (this.$form.check()) {
        console.log(this.$form.get())
      }
    },
  },
}
```