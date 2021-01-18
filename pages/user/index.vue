<template>
  <div>
    <h1 class="title">
      Мой профиль
    </h1>
    <profile-settings />
  </div>
</template>

<script>
import ProfileSettings from '@/components/ProfileSettings'

export default {
  components: {
    ProfileSettings
  },
  layout: 'main',
  middleware: 'checkAuth'
}
</script>

<style lang='scss'>
@import '../../assets/style/mixins';

@include title();
</style>
