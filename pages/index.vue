<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <div class="text-center">
        <tasks/>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import Tasks from '~/components/Tasks.vue'

  export default {
    components: {
      Tasks
    }
  }
</script>
