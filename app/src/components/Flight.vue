<template>
  <div></div>
</template>
<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator'
  import { FlightModel } from '../models/flight'
  @Component
  export default class Flight extends Vue {
    @Prop() private flight!: Flight;
  }
</script>
