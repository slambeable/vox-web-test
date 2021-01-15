export const state = () => ({
  isRegistered: window.localStorage.getItem('registered'),
  isAuthenticated: window.localStorage.getItem('authenticated'),
  login: window.localStorage.getItem('login'),
  password: window.localStorage.getItem('password'),
  firstName: window.localStorage.getItem('firstName'),
  lastName: window.localStorage.getItem('lastName')
})

export const getters = {
  isAuthenticated: state => JSON.parse(state.isAuthenticated),
  isRegistered: state => JSON.parse(state.isRegistered),
  login: state => state.login,
  password: state => state.password,
  firstName: state => state.firstName,
  lastName: state => state.lastName
}

export const mutations = {
  authorize: (state) => {
    const storage = window.localStorage

    storage.setItem('authenticated', true)
    state.isAuthenticated = true
  },
  logout: (state) => {
    const storage = window.localStorage

    storage.setItem('authenticated', false)
    state.isAuthenticated = false
  },
  register: (state) => {
    const storage = window.localStorage

    storage.setItem('registered', true)
    state.isRegistered = true
  },
  setLogin: (state, login) => {
    const storage = window.localStorage

    storage.setItem('login', login)
    state.login = login
  },
  setPassword: (state, password) => {
    const storage = window.localStorage

    storage.setItem('password', password)
    state.password = password
  },
  setFirstName: (state, firstName) => {
    const storage = window.localStorage

    storage.setItem('firstName', firstName)
    state.firstName = firstName
  },
  setLastName: (state, lastName) => {
    const storage = window.localStorage

    storage.setItem('lastName', lastName)
    state.lastName = lastName
  }
}
