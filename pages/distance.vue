<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="8">
      <div class="text-center">
        <section>
          <div class="row row--dense">
            <div class="col-sm-6 col-lg-6 col-12">
              <v-select
                :items="getSelectItems"
                label="From"
                dense
                outlined
                @change="onChangeCity()"
                v-model="from"
                :value="to"
              ></v-select>
            </div>
            <div class="col-sm-6 col-lg-6 col-12">
              <v-select
                :items="getSelectItems"
                label="To"
                dense
                outlined
                @change="onChangeCity()"
                v-model="to"
                :value="to"
              ></v-select>
            </div>
          </div>
        </section>
        <clever-table v-bind:data="citiesByCountry" class="mt-5 "></clever-table>
        <div v-if="getDistance.distance">
          Distance: {{getDistance.distance}}<br>
          PointsCount: {{getDistance.pointsCount}}
          <clever-table v-bind:data="getDistance.path" class="mt-5 "></clever-table>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  import cleverTable from '~/components/cleverTable.vue'
  import {mapState, mapGetters} from 'vuex';

  export default {
    components: {
      cleverTable
    },
    async fetch() {
      this.pageTitle = 'Task 3'
      await this.$store.dispatch('getCitiesByCountries', 1)
    },
    data: () => ({
      from: 0,
      to: 0
    }),
    fetchOnServer: true,
    mounted() {
      this.$store.dispatch('getCitiesByCountries', 1)
    },
    computed: {
      ...mapGetters(['getDistance']),
      citiesByCountry() {
        return this.$store.getters['getCitiesByCountry'] || []
      },
      getSelectItems() {
        return [
          {
            text: 'не выбран',
            value: 0
          },
          ...this.citiesByCountry
            .map(city => ({
              value: city.cityID,
              text: city.city
            }))]
      }
    },
    methods: {
      async onChangeCity() {
        let points = this.from + ';' + this.to
        await this.$store.dispatch('getDistance', points)
      },
    }
  }
</script>
