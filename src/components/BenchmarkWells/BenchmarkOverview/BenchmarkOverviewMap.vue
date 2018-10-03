<template>
  <div>
    <well-detail />
    <gmap-map
      :center="{lat:35.39, lng:-98.091}"
      :options="{streetViewControl: false, mapTypeControl: false}"
      class="google-map"
      ref="mapRef"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div>Latitude: {{infoContent.lat}}</div>
        <div>Longitude: {{infoContent.lng}}</div>
      </gmap-info-window>
      <gmap-marker
        v-for="(well, index) in wellList"
        :key="index"
        :clickable="true"
        :icon="{
          path,
          fillColor: well.color,
          fillOpacity: !selectedWell.wellName || selectedWell.wellName === well.wellName ? 1 : .5,
          strokeWeight: 0,
          scale: 1.2,
        }"
        :position="well.coord"
        :zIndex="!selectedWell.wellName || selectedWell.wellName === well.wellName ? 1 : 0"
        @click="toggleInfoWindow(well,index)"
      />
    </gmap-map>
  </div>
</template>

<script>
import { gmapApi } from 'vue2-google-maps';
import WellDetail from './WellDetail';

export default {
  name: 'benchmark-overview-map',
  components: {
    WellDetail,
  },
  data() {
    return {
      currentMidx: null,
      infoContent: '',
      infoOptions: {
        pixelOffset: {
          width: 15,
          height: 0,
        },
      },
      infoWindowPos: null,
      infoWinOpen: false,
      path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
    };
  },
  computed: {
    google: gmapApi,
    selectedWell() {
      return this.$store.state.well.selectedWell;
    },
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
  methods: {
    toggleInfoWindow(well, index) {
      this.$store.dispatch('updateSelectedWell', well.wellName);
      this.infoWindowPos = well.coord;
      this.infoContent = well.coord;
      if (this.currentMidx === index) {
        this.infoWinOpen = !this.infoWinOpen;
      } else {
        this.infoWinOpen = true;
        this.currentMidx = index;
      }
    },
  },
};
</script>

<style lang="sass">
.google-map
  width: 100%
  height: 350px
  margin-bottom: 1em
</style>
