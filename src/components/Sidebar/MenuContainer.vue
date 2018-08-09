<template>
  <div id='menu-container'>
    <div
      class='menu-item'
      v-for='menu in menuItems'
      :key='menu.name'
    >
      <i class='material-icons'>{{menu.icon}}</i>
      <span class='menu-item-name'>{{menu.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuContainer',
  data() {
    return {
      menuItems: [
        {
          name: 'Dashboard',
          icon: 'view_quilt',
          route: '',
        },
        {
          name: 'My Fields',
          icon: 'view_list',
          route: '',
        },
        {
          name: 'Actions',
          icon: 'offline_bolt',
          route: '',
        },
        {
          name: 'Performance',
          icon: 'trending_up',
          route: '',
        },
      ],
    };
  },
};
</script>

<style lang="sass">
#menu-container
  color: #C5C5C5
.menu-item
  display: flex
  align-items: center
  padding: 10px 0 10px 20px
  font-size: 1.3em
  &:hover
    cursor: pointer
    background: #000
    color: #FFF
.menu-item-name
  margin-left: 10px
</style>
