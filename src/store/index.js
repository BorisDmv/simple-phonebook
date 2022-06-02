import { createStore } from 'vuex'

export default createStore({
  state: {
    testUsers: [{name: "Иван", surname: "Петков", phone: "0876091723", address: "София ул. Македонска"},
    {name: "Добри", surname: "Иванов", phone: "0887463543", address: "Бургас ул.Солунска"},
    {name: "Димитър", surname: "Димитров", phone: "0883287147", address: "Пловдив ул.Демокрация"}]
  },
  getters: {
  },
  mutations: {
    addUser(state){
      state.testUsers.push({name: "БОРИС", surname: "ДИМИТРОВ", phone: "0876079546", address: "БАНКЯ"})
    }
  },
  actions: {
  },
  modules: {
  }
})
