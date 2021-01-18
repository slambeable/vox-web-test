<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
@import '~assets/style/fonts';

html {
  box-sizing: border-box;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  word-spacing: 1px;
}

button {
  touch-action: manipulation;
}

* {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 500;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
</style>
