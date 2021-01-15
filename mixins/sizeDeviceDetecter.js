export default {
  methods: {
    handleDeviseSize () {
      this.assignStartValueDeviseSize()
      window.addEventListener('resize', this.assignStartValueDeviseSize)
    },
    assignStartValueDeviseSize () {
      const mediaQuery = window.matchMedia('(max-width: 768px)').matches

      this.isMobile = mediaQuery
    }
  }
}
