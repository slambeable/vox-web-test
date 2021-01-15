export default function ({ store, redirect }) {
  const isAuthenticated = store.getters['user/isAuthenticated']

  if (!isAuthenticated) {
    redirect('/')
  }
}
