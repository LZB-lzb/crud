import axios from 'axios'
import Cookie from 'js-cookie'
export default {
  state: {
    menu: [{
      "path": "/",
      "name": "home",
      "label": "首页",
      "icon": "s-home",
      "url": "Home/Home"
    }],
    currentmenu: 0,
    login: false,
    register: false,
    wrong: false,
    wrong2: false,
  },
  mutations: {
    getmenu(state) {
      if (!Cookie.get('login')) {
        return
      }
      state.login = JSON.parse(Cookie.get('login'))
      state.register = JSON.parse(Cookie.get('register'))
      if (state.login || state.register) {
        axios.get('/menu').then(res => state.menu = res.data)
      }
    },
    selectMenu(state, val) {
      state.currentmenu = val
    },
    Rlogin(state, form) {
      if (!form.rpassword) {
        axios.get('/user').then(res => {
          // console.log(res.data[0])
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].name == form.name && res.data[i].password == form.password) {
              // state.login = true
              // state.register = true
              state.login = Cookie.set('login', JSON.stringify(true), { expires: 1, path: '/' })
              state.register = Cookie.set('register', JSON.stringify(true), { expires: 1, path: '/' })
              window.location.reload()
            } else {
              return state.wrong = !state.wrong
            }
          }
        })
      } else {
        // for循环法
        axios.get('/user').then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].name == form.name) {
              return state.wrong2 = !state.wrong2
            }
          }
          axios.post('/user', form).then(res => {
            console.log(res.data)
            state.login = Cookie.set('login', JSON.stringify(true), { expires: 1, path: '/' })
            state.register = Cookie.set('register', JSON.stringify(true), { expires: 1, path: '/' })
            window.location.reload()
          })
        })

        //find法 代码行数差不多 
        // axios.get('/user').then(res => {
        //   let i = res.data.find(item => {
        //     if (item.name == form.name) {
        //       return state.wrong2 = !state.wrong2
        //     }
        //   })
        //   if (!i) {
        //     axios.post('/user', form).then(res => {
        //       console.log(res.data)
        //       state.login = Cookie.set('login', JSON.stringify(true), { expires: 1, path: '/' })
        //       state.register = Cookie.set('register', JSON.stringify(true), { expires: 1, path: '/' })
        //       window.location.reload()
        //     })
        //   }
        // })
      }

    },
    Qlogin(state) {
      state.login = Cookie.set('login', JSON.stringify(false), { expires: 1, path: '/' })
      state.register = Cookie.set('register', JSON.stringify(false), { expires: 1, path: '/' })
      window.location.reload()
    },
  },
  actions: {
  },
  modules: {
  }
}