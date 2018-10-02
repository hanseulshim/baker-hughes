<template>
  <div>
    <GmapMap
      :center="{lat:35.39, lng:-98.091}"
      :options="{streetViewControl: false, mapTypeControl: false}"
      class="google-map"
      ref="mapRef"
    >
      <GmapMarker
        v-for="(well, index) in wellList"
        :key="index"
        :position="well.coord"
        :icon="{
          url: 'static/location.svg',
        }"
      />
    </GmapMap>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';

export default {
  name: 'benchmark-overview-map',
  computed: {
    google: gmapApi,
    wellList() {
      return this.$store.getters.combinedWells.wellList;
    },
  },
  mounted() {
    this.$refs.mapRef.$mapPromise.then((map) => {
      const bounds = new this.google.maps.LatLngBounds();
      this.wellList.forEach((well) => {
        bounds.extend(well.coord);
      });
      map.fitBounds(bounds);
    });
  },
};
</script>

<style lang="sass">
.google-map
  width: 100%
  height: 350px
  margin-bottom: 1em
</style>
