
export default () => ({
  api: {
    servers: {
      default: $env('server'),
    },
    then: (response) => {
      if (!response.data.content) {
        response.data.content = response.data.data
      }
      if (response.data.message) {
        // Vue.$toast.open({
        //   message: response.data.message,
        //   type: 'success',
        //   position: 'top-right',
        //   duration: 5000,
        // })
      }
      return response
    },
    catch: (error) => {
      if (error.response?.status === 401) {
        $app.auth.logout()
      } else if (error.response?.status === 422) {
        const message = error.response?.data.message
        const data = error.response?.data.data
        let errors = ''
        $n.each(data, (item) => {
          errors += item[0]
        })
        // Vue.$toast.open({
        //   message: 'Ошибка: ' + message + ', ' + errors,
        //   type: 'error',
        //   position: 'top-right',
        //   duration: 5000,
        // })
      } else {
        const message = error.response?.data.message || 'Сервер недоступен'
        // Vue.$toast.open({
        //   message: 'Ошибка: ' + message,
        //   type: 'error',
        //   position: 'top-right',
        //   duration: 5000,
        // })
      }
      throw error
    },
  },
  router: {
    config: {
      base: $env('baseUrl'),
      mode: 'history',
    },
  },
  store: {
    saveDepth: 2,
  },
  auth: {
    loginRoute: 'login',
    authRoute: 'index',
    apiAuth: (token) => {
      $app.api.config({
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
    },
  },
  date: {
    formats: {
      date: 'DD.MM.YYYY',
      time: 'HH:mm',
      datetime: 'DD.MM.YYYY HH:mm',
    },
    default: 'datetime',
  },
  form: {
    input: (self, name, type, form) => {
      if (type === 'select') {
        return {
          name,
          value: self.$form.get(name, form),
          input: (value) => self.$form.set(name, value, form),
          danger: self.$form.errors(name, form),
          text: self.$form.editable(form) === false,
        }
      }
      return {
        name,
        value: self.$form.get(name, form),
        input: (value) => self.$form.set(name, value, form),
        danger: self.$form.errors(name, form),
        text: self.$form.editable(form) === false,
      }
    },
    validations: {
      required(value) {
        return value.length > 0
      },
      email(value) {
        return value.indexOf('@') !== -1
      },
      phone(value) {
        return value.indexOf('+') !== -1
      },
    },
    messages: {
      required: 'Поле обязательно для заполнения',
      email: 'Поле должно быть email адресом',
      phone: 'Поле должно быть корректным телефонным номером',
      between: (name, params, value) => `Поле должно быть от ${params[0]} до ${params[1]}`,
    },
  },
  secure: {
    whiteList: { p: [], br: [], },
  },
})
