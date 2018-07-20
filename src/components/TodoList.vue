<template>
  <div>
    <p>Completed Tasks: {{todos.filter(todo => todo.done).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => !todo.done).length}}</p>
    <div v-for="(todo, key) in todos" v-bind:key="key">
      <div>
        <div>{{todo.title}}</div>
        <div>{{todo.project}}</div>
        <button>Edit Me!</button>
        <button v-show="todo.done">Completed</button>
        <button v-show="!todo.done">Complete</button>
      </div>
    </div>
  </div>
</template>

<script type = "text/javascript" >
export default {
  props: ['todos'],
};
</script>
<style>
</style>
