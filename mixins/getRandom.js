export default {
  methods: {
    getRandom (min, max) {
      return Math.floor(Math.random() * (max - min))
    },
    getRandomWithNegative (min, max) {
      return Math.floor(((Math.random() - 0.5) * 2) * Math.random() * (max - min))
    }
  }
}
