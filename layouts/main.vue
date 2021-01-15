<template>
  <div class="container">
    <aside class="side-panel-mobile">
      <button
        :class="[
          'side-panel-mobile__toggle',
          !sidePanelToggle ? '' : 'side-panel-mobile__toggle_hide'
        ]"
        @click="switchSidePanel"
      >
        <img src="@/assets/images/menu/menuToggleMobile.svg">
      </button>
      <img
        :class="[
          'side-panel-mobile__logo',
          !sidePanelToggle ? '' : 'side-panel-mobile__logo_hide'
        ]"
        src="@/assets/images/logo.svg"
        alt="logo"
      >
    </aside>
    <aside
      :class="[
        'side-panel',
        sidePanelToggle ? '' : 'side-panel_hide'
      ]"
    >
      <button
        :class="[
          'side-panel__toggle',
          sidePanelToggle ? '' : 'side-panel__toggle_hide'
        ]"
        @click="switchSidePanel"
      >
        <img
          :src="buttonImage"
        >
      </button>
      <img
        :class="[
          'side-panel__logo',
          sidePanelToggle ? '' : 'side-panel__logo_hide'
        ]"
        :src="logoImage"
        alt="logo"
      >
      <nav class="navigation">
        <ul class="navigation-list">
          <li
            :class="[
              'navigation-list__item',
              sidePanelToggle ? '' : 'navigation-list__item_hide'
            ]"
            @click="[$router.push('/user'), sidePanelToggle = !isMobile]"
          >
            <a>Мой профиль</a>
          </li>
          <li
            :class="[
              'navigation-list__item',
              sidePanelToggle ? '' : 'navigation-list__item_hide'
            ]"
            @click="[$router.push('/user/tasks'), sidePanelToggle = !isMobile]"
          >
            <a>Список задач</a>
          </li>
          <li
            :class="[
              'navigation-list__item',
              sidePanelToggle ? '' : 'navigation-list__item_hide'
            ]"
            @click="[$router.push('/user/charts'), sidePanelToggle = !isMobile]"
          >
            <a>Статистика</a>
          </li>
          <li
            :class="[
              'navigation-list__item',
              sidePanelToggle ? '' : 'navigation-list__item_hide'
            ]"
            @click="handleExit"
          >
            <a>Выход</a>
          </li>
        </ul>
      </nav>
    </aside>
    <div
      :class="
        [
          'wrapper',
          sidePanelToggle ? '' : 'wrapper_hide'
        ]"
    >
      <Nuxt />
    </div>
  </div>
</template>

<script>
import menuToggle from '@/assets/images/menu/menuToggle.svg'
import menuToggleMobileHide from '@/assets/images/menu/menuToggleMobileHide.svg'
import logo from '@/assets/images/logo.svg'
import logoWord from '@/assets/images/logo-word.svg'
import sizeDeviceDetecter from '@/mixins/sizeDeviceDetecter'

export default {
  mixins: [sizeDeviceDetecter],
  data () {
    return {
      sidePanelToggle: null,
      isMobile: null
    }
  },
  computed: {
    buttonImage () {
      return this.isMobile ? menuToggleMobileHide : menuToggle
    },
    logoImage () {
      return this.sidePanelToggle ? logo : logoWord
    }
  },
  watch: {
    isMobile () {
      this.sidePanelToggle = !this.isMobile
    }
  },
  created () {
    this.handleDeviseSize()
    this.sidePanelToggle = this.isMobile
  },
  methods: {
    switchSidePanel () {
      this.sidePanelToggle = !this.sidePanelToggle
    },
    handleExit () {
      this.$store.commit('user/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  word-spacing: 1px;
}

body {
  background: #eff1f9;
}

* {
  font-size: 16px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.container {
  display: flex;
}

.side-panel-mobile {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 64px;
  background: #fff;

  &__toggle {
    position: absolute;
    z-index: 100;
    top: 23px;
    left: 22px;
    width: 20px;
    height: 20px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;

    &_hide {
      display: none;
    }
  }

  &__logo {
    width: 80px;
    height: 20px;
    margin-top: 22px;
    margin-left: 88px;

    &_hide {
      display: none;
    }
  }

  @media (min-width: 769px) {
    display: none;
  }
}

.side-panel {
  position: fixed;
  z-index: 10;
  width: 256px;
  height: 100vh;
  background: #fff;

  &_hide {
    width: 60px;

    @media (max-width: 768px) {
      display: none;
    }
  }

  &__toggle {
    position: absolute;
    z-index: 10;
    top: 12px;
    right: -22px;
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    outline: none;

    &_hide {
      transform: scale(-1, 1);
    }

    @media (max-width: 768px) {
      top: 24px;
      left: 24px;
      width: 16px;
      height: 16px;
    }
  }

  &__logo {
    width: 80px;
    height: 20px;
    margin: 24px 0 38px 56px;

    @media (max-width: 768px) {
      margin-top: 22px;
      margin-left: 72px;
    }

    &_hide {
      width: 15.5px;
      margin-left: 15px;
    }
  }

  @media (max-width: 768px) {
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
}

.navigation-list {
  padding: 0;
  margin: 0;

  &__item {
    height: 41px;
    cursor: pointer;
    line-height: 36px;
    list-style-type: none;

    &_hide > a {
      color: transparent;
      user-select: none;
    }

    &:nth-child(4) {
      position: absolute;
      bottom: 48px;
      width: 100%;
      color: #6f849c;

      @media (max-width: 768px) {
        bottom: 12%;
      }
    }

    & > a {
      position: relative;
      margin-left: 84px;

      @media (max-width: 768px) {
        margin-left: 66px;
      }
    }

    & > a::before {
      position: absolute;
      top: 0;
      left: -28px;
      width: 20px;
      height: 20px;
      content: '';

      @media (max-width: 768px) {
        left: -38px;
      }
    }

    &_hide > a::before {
      left: -65px;
    }

    &:nth-child(1) > a::before {
      background: url('../assets/images/icons/profile.svg') no-repeat center;
    }

    &:nth-child(2) > a::before {
      background: url('../assets/images/icons/task.svg') no-repeat center;
    }

    &:nth-child(3) > a::before {
      background: url('../assets/images/icons/statistic.svg') no-repeat center;
    }

    &:nth-child(4) > a::before {
      background: url('../assets/images/icons/exit.svg') no-repeat center;
    }

    &:hover {
      background: darken(#fff, 12.5%);
    }
  }
}

.wrapper {
  width: 70.3%;
  margin-right: 20px;
  margin-left: 306px;

  &_hide {
    width: 86%;
    margin-left: 108px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin: 40px 16px 0 17px;
  }
}
</style>
