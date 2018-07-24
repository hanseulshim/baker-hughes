<template>
  <div id="app">
    <div class="logo-container"><img src="./assets/logo.png"></div>
    <!-- <todo-list v-bind:todos="todos"></todo-list> -->
    <line-chart />
    <div v-for="(well, index) in wellNameList" :key="index">
      <div>{{well}}</div>
    </div>
  </div>
</template>

<script>
import TodoList from './components/TodoList';
import LineChart from './components/LineChart';

import data from './data/data.json';

export default {
  name: 'app',
  components: {
    TodoList,
    LineChart,
  },
  data() {
    return {
      todos: [{
        title: 'Todo A',
        project: 'Project A',
        done: false,
      }, {
        title: 'Todo B',
        project: 'Project B',
        done: true,
      }, {
        title: 'Todo C',
        project: 'Project C',
        done: false,
      }, {
        title: 'Todo D',
        project: 'Project D',
        done: false,
      }],
      data,
    };
  },
  computed: {
    wellNameList() {
      return this.data.filter((v, i, a) =>
        a.findIndex(value => value.wellNameNo === v.wellNameNo) === i)
        .map(x => ({ name: x.wellNameNo, value: x.medianWOB }));
    },
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
.logo-container {
  margin: auto;
}
</style>
