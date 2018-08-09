<template>
  <div id='header-container'>
    <div class='header-name'>{{name}}</div>
    <avatar class='header-option' :username='name' :size=25 :src='`/static/${avatar}`'/>
    <i class='material-icons header-option'>notifications</i>
    <i class='material-icons header-option'>settings</i>
  </div>
</template>

<script>
import Avatar from 'vue-avatar';

export default {
  name: 'header-container',
  components: {
    Avatar,
  },
  computed: {
    name() {
      return this.$store.state.user.name;
    },
    avatar() {
      return this.$store.state.user.avatar;
    },
  },
};
</script>

<style lang="sass">
#header-container
  display: flex
  justify-content: flex-end
  align-items: center
  padding: 2%
  margin-bottom: 5%
  background: #FFF
  box-shadow: 0 .2em .4em 0 rgba(139,139,139,0.5)
.header-name
  font-size: 80%
.header-option
  margin-left: 2%
  color: #919192
  cursor: pointer
  font-size: 150%
</style>
