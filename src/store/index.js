import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [{
      id: 0,
      name: "admin",
      email: "admin@admin.admin",
      password: "admin",
      userType: 1,
      adress: "adress admin",
      zip_code: "4795-000",
      number: "111111111",
    }],
    loggedUser: [],
    userExists: false
  },
  mutations: {
    STORE_ITEMS(state) {
      if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    ADD_USER(state, payload) {
      if (!state.users.some(user => user.email === payload.email)) {
        if (payload.password != payload.confPassword) {
          alert('As palavras-passe não coincidem!')
        } else {
          state.users.push({
            id: payload.id,
            name: payload.name,
            email: payload.email,
            password: payload.password,
            userType: 2,
            adress: payload.adress,
            zip_code: payload.zip_code,
            number: payload.number,
          });
          localStorage.setItem("users", JSON.stringify(state.users));
          alert('Registado com sucesso!')
          router.push({
            name: 'login'
          })
        }
      } else {
        alert('Este email já tem conta associada!')
      }
    },
    LOGIN(state, payload) {
      for (const user of state.users) {
        if (user.email === payload.email && user.password === payload.password) {
          state.loggedUser = ({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            userType: user.userType,
            adress: user.adress,
            zip_code: user.zip_code,
            number: user.number,
          });
          state.userExists = true
          localStorage.setItem("loggedUser", JSON.stringify(state.loggedUser));
          alert('Bem-vindo ' + state.loggedUser.name)
          if (state.loggedUser.userType == 1) {
            alert("admin")
            router.push({
              name: 'adminHome'
            })
          } else {
            alert("user")
            router.push({
              name: 'home'
            })
          }
          break;
        } else {
          state.userExists = false;
        }
      }
      if (state.userExists === false) {
        alert("Credenciais erradas!")
      }
    },
    LOGOUT(state) {
      state.loggedUser = []
      localStorage.removeItem("loggedUser", JSON.stringify(state.loggedUser));
      router.push({
        name: '/'
      })
      location.reload();
    },
  },
  getters: {
    lastId(state) {
      if (state.users.length) {
        return state.users[state.users.length - 1].id;
      } else {
        return 0;
      }
    },
    getUserOn(state) {
      if (state.loggedUser.length) {
        state.logged = true
        return state.logged;
      } else {
        state.logged = false
        return state.logged;
      }
    },
    getName(state) {
      if (state.loggedUser.length == 0) {
        return state.notLogged
      } else {
        return state.loggedUser.name
      }
    },
    getEmail(state) {
      return state.loggedUser.email
    }
  }
})