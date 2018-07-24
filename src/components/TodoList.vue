<template>
  <div class='container'>
    <p>Completed Tasks: {{todos.filter(todo => todo.done).length}}</p>
    <p>Pending Tasks: {{todos.filter(todo => !todo.done).length}}</p>
    <todo
      v-for='(todo, index) in todos'
      :key='index' v-bind:todo='todo'
      v-on:delete-todo='deleteTodo'
    />
  </div>
</template>

<script type = 'text/javascript' >
import Todo from './Todo';

export default {
  props: ['todos'],
  components: {
    Todo,
  },
  methods: {
    deleteTodo(todo) {
      const todoIndex = this.todos.indexOf(todo);
      this.todos.splice(todoIndex, 1);
    },
  },
};
</script>
<style>
  .container {
    margin: auto;
    border: 1px solid brown;
    padding: 10px;
  }
</style>
