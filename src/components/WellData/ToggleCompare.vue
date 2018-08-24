<template>
  <div class="toggle-compare-container">
    <v-btn
      @click="toggleCompare('time')"
      class="toggle-button-time"
      :class="{
          'button-primary': currentCompare === 'time',
          'button-secondary': currentCompare !== 'time',
        }"
    >Compare Time</v-btn>
    <v-btn
      @click="toggleCompare('cost')"
      class="toggle-button-cost"
      :class="{
          'button-primary': currentCompare === 'cost',
          'button-secondary': currentCompare !== 'cost',
        }"
    >Compare Cost</v-btn>
  </div>
</template>

<script>
export default {
  name: 'ToggleCompare',
  props: {
    currentCompare: {
      type: String,
      required: true,
    },
  },
  methods: {
    toggleCompare(compare) {
      this.$emit('toggleCompare', compare);
    },
  },
};
</script>

<style lang="sass" scoped>
.toggle-compare-container
  margin: 1em
  display: flex
.toggle-button-time
  margin: 0
  border-top-right-radius: 0
  border-bottom-right-radius: 0
.toggle-button-cost
  margin: 0
  border-top-left-radius: 0
  border-bottom-left-radius: 0
</style>
