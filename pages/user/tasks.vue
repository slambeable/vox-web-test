<template>
  <div>
    <h1 class="title">
      Список задач
    </h1>
    <tasks-list
      :class-name="'user'"
      :tasks="tasks"
    />
  </div>
</template>

<script>
import TasksList from '@/components/TasksList'
import random from '@/mixins/getRandom'

export default {
  components: {
    TasksList
  },
  mixins:
    [random],
  data () {
    return {
      tasks: [],
      maxTasks: 199
    }
  },
  created () {
    this.giveTasks()
  },
  methods: {
    async giveTasks () {
      const request = await this.$axios.$get('https://jsonplaceholder.typicode.com/todos')
      const randomNumber = this.getRandom(0, this.maxTasks)
      this.tasks = request.slice(randomNumber)
    }
  },
  layout: 'main',
  middleware: 'checkAuth'
}
</script>

<style lang='scss'>
@import '../../assets/style/mixins';

@include title();
</style>
