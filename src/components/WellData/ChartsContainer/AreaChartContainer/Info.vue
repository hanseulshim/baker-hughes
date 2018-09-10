<template>
  <div class="info-menu-container">
    <span class="info-menu-title">Slope Difference</span>
    <v-menu offset-y middle>
      <i class="material-icons" slot="activator">info_outline</i>
      <v-card class="info-card">
        <v-card-text>
          <div class="info-title">
            <i class="material-icons info-icon">info_outline</i>
            <span>Slope Difference vs. Depth</span>
          </div>
          <div class="info-text">{{info}}</div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  name: 'area-chart-info',
  data() {
    return {
      info: 'This chart represents the difference in the Rate of Penetration (ROP) between the selected well and the benchmark well (x-axis) for each depth (y-axis.) The ROP is calculated by depth/time, and averaged across 10 depth readings (~200ft.) Where the difference is negative, the selected well out-performed the ROP of the benchmark well. Where the difference is positive, the selected well under-performed the ROP of the benchmark well. A slope difference in the range of 0–0.1 is considered normal.',
    };
  },
};
</script>
