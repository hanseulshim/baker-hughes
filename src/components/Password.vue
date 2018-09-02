<template>
  <div id="password-container">
    <v-card>
      <v-card-text>
        <div id="input-container">
          <v-text-field
            v-model="password"
            type="password"
            name="password-input"
            label="Enter Password to View Application"
            @keyup.enter="submit"
          />
          <v-btn class="button-primary" @click="submit">submit</v-btn>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'password',
  data() {
    return {
      password: '',
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.password);
    },
  },
};
</script>

<style lang="sass" scoped>
#password-container
  width: 500px
  margin: auto
#input-container
  display: flex
  align-items: center
</style>
