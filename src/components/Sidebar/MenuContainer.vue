<template>
  <div id="menu-container">
    <div
      class="menu-item"
      v-for="menu in menuItems"
      :key="menu.name"
    >
      <router-link
        :to="menu.route"
        class="menu-route"
        :class="{'sub-menu': menu.subMenu}"
        exact
      >
        <i class="material-icons">{{menu.icon}}</i>
        <span class="menu-item-name">{{menu.name}}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menu-container',
  data() {
    return {
      menuItems: [
        {
          name: 'Dashboard',
          icon: 'view_quilt',
          route: '/dashboard',
          subMenu: false,
        },
        {
          name: 'My Fields',
          icon: 'view_list',
          route: '/myFields',
          subMenu: false,
        },
        {
          name: 'Benchmarks',
          icon: 'insert_chart',
          route: '/myFields/benchmarks',
          subMenu: true,
        },
        {
          name: 'Benchmark Wells',
          icon: 'view_compact',
          route: '/myFields/benchmarkWells',
          subMenu: true,
        },
        {
          name: 'Well Data',
          icon: 'mail',
          route: '/myFields/wellData',
          subMenu: true,
        },
        {
          name: 'Actions',
          icon: 'offline_bolt',
          route: '/actions',
          subMenu: false,
        },
        {
          name: 'Performance',
          icon: 'trending_up',
          route: '/performance',
          subMenu: false,
        },
      ],
    };
  },
};
</script>

<style lang="sass">
.menu-route
  display: flex
  align-items: center
  padding: 5%
  font-size: 100%
  text-decoration: none
  color: #C5C5C5
  &:hover
    cursor: pointer
    background: #000
    color: #FFF
.sub-menu
  padding-left: 10%
  background: #212121
  color: #BCBCBC
.router-link-active
  background: #000
  color: #FFF
.menu-item-name
  margin-left: 5%
</style>
