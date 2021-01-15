<template>
  <div
    :class="
      [
        'task-list',
        className.length !== 0 ? className : ''
      ]"
  >
    <div class="task-list-header">
      <span class="task-list-header__task">
        Задача
      </span>
      <span
        class="task-list-header__status"
      >
        Статус
      </span>
    </div>
    <hr class="line">
    <div class="task-list-body">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        class="task-list-body-wrapper"
      >
        <span
          class="task-list-body__task"
        >
          {{ task.title }}
        </span>
        <span
          :class="
            [
              'task-list-body__status',
              task.completed ? 'task-list-body__status_completed' : ''
            ]"
        >Выполнено</span>
        <hr class="line">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      default: '',
      type: String
    },
    tasks: {
      default: () => [],
      type: Array
    }
  }
}
</script>

<style lang='scss'>
.task-list {
  min-height: 359px;
  padding: 1px;
  margin-top: 24px;
  background: #fff;
  border-radius: 10px;

  &-header,
  &-body {
    font-size: 14px;
  }

  &-header {
    display: flex;
    height: 46px;
    justify-content: space-between;
    margin-top: 32px;
    color: #bababa;

    &__task {
      margin-left: 40px;

      @media (max-width: 768px) {
        margin-left: 16px;
      }
    }

    &__status {
      margin-right: 100px;

      @media (max-width: 768px) {
        margin-right: 16px;
      }
    }
  }

  .line {
    border: 1px solid #eff1f9;
    margin-right: 44px;
    margin-left: 40px;

    @media (max-width: 768px) {
      margin: 0 16px;
    }
  }

  &-body {
    &-wrapper {
      display: flex;
      min-height: 46px;
      flex: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: 16px;

      & > .line {
        display: inline-table;
        flex: 100%;
        margin-top: 16px;
      }
    }

    &__task {
      width: 50%;
      max-width: 300px;
      margin-left: 40px;
      line-height: 16px;

      @media (max-width: 768px) {
        margin-left: 16px;
      }
    }

    &__status {
      position: relative;
      margin-right: 44px;

      @media (max-width: 768px) {
        margin-right: 16px;
      }

      &::before {
        position: absolute;
        top: -2px;
        left: -31px;
        width: 24px;
        height: 24px;
        border: 1px solid #bababa;
        content: '';
      }

      &_completed {
        color: #51cb3d;
      }

      &_completed::before {
        background: url('../assets/images/check.svg') no-repeat center;
      }
    }
  }
}
</style>
