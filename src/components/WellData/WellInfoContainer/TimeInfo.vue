<template>
  <div class="well-info-subcontainer">
    <div>
      <span class="well-info-title">Time</span>
      <div class="well-info-total-container">
        <i class="material-icons">access_time</i>
        <span class="well-info-total">150 hr</span>
      </div>
    </div>
    <div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Operating</span>
        <span class="well-info-unit">138</span>
      </div>
      <div class="well-info-unit-container">
        <span class="well-info-title">Bit Change</span>
        <span class="well-info-unit">12</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'time-info',
};
</script>

<style lang="sass">
.well-info-subcontainer
  width: 50%
  padding: 1em
  background-color: #F9F9F9
  margin: 1em
  display: flex
  justify-content: space-between
  .well-info-title
    font-weight: bold
    text-align: right
  .well-info-unit
    margin-left: 2em
    font-weight: 300
  .well-info-unit-container
    display: flex
    justify-content: space-between
  .well-info-total-container
    display: flex
    align-items: center
    .material-icons
      font-size: 250%
      font-weight: 300
    .well-info-total
      font-size: 250%
      font-weight: 300
</style>
