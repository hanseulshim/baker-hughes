<template>
  <div>
    <GmapMap
      :center="{lat:10, lng:10}"
      :zoom="7"
      map-type-id="terrain"
      class="google-map"
    >
      <!-- <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      /> -->
    </GmapMap>
  </div>
</template>

<script>
export default {
  name: 'benchmark-overview-map',
};
</script>

<style lang="sass">
.google-map
  width: 100%
  height: 350px
  margin-bottom: 1em
</style>
