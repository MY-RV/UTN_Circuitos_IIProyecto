<template>
  <div>
    Hola
  </div>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
  components: [RouterLink],
  created() {
    console.log('Hola Mundo')
  },
};
</script>
