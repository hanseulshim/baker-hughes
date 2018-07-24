<template>
  <div class="container">
    <div v-show="!isEditing">
      <div>{{todo.title}}</div>
      <div>{{todo.project}}</div>
      <button v-on:click="showForm">Edit Me!</button>
      <button v-on:click="deleteTodo(todo)">Delete Me!</button>
      <button v-show="todo.done">Completed</button>
      <div class="complete" v-show="!todo.done">Complete</div>
    </div>
    <div v-show="isEditing">
      <div>
        <label>Title</label>
        <input type="text" v-model="todo.title">
      </div>
      <div>
        <label>Project</label>
        <input type="text" v-model="todo.project">
      </div>
      <button v-on:click="hideForm">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['todo'],
  data() {
    return {
      isEditing: false,
    };
  },
  methods: {
    showForm() {
      this.isEditing = true;
    },
    hideForm() {
      this.isEditing = false;
    },
    deleteTodo(todo) {
      this.$emit('delete-todo', todo);
    },
  },
};
</script>

<style>
  .complete {
    margin: 10px 0;
    color: blue;
  }
</style>
