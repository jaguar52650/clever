<template>
  <div>
    <h1>{{pageTitle}}</h1>
<!--    <button @click="$fetch">Refresh</button>-->
    <v-card>
      <h2>Страны</h2>
      <clever-table v-bind:data="countries" class="mt-5 "></clever-table>
    </v-card>
    <br>

    <v-card>
      <h2>Регионы и города страны </h2>
      Страна: <select @change="onChangeCountry()" v-model="country">
      <option value="0">не выбрана</option>
      <option v-for="country of countries" :value="country.countryID">{{country.country}}</option>
    </select>
      <section>
        <div class="row row--dense">
          <div class="col-sm-6 col-lg-6 col-12">
            <h3>Регионы</h3>
            <clever-table v-bind:data="regions" class="mt-5 "></clever-table>
          </div>
          <div class="col-sm-6 col-lg-6 col-12">
            <h3>Города</h3>
            <clever-table v-bind:data="citiesByCountry" class="mt-5 "></clever-table>
          </div>
        </div>
      </section>
    </v-card>
    <br>
    <v-card>
      <h2>Города</h2>
      Регион: <select @change="onChangeRegion()" v-model="region">
      <option value="0">не выбран</option>
      <option v-for="region of regions" :value="region.regionID">{{region.region}}</option>
    </select>

      <clever-table v-bind:data="cities" class="mt-5 "></clever-table>
    </v-card>
  </div>

</template>

<script>
  import cleverTable from '~/components/cleverTable.vue'

  export default {
    name: "Tasks",
    components: {
      cleverTable
    },
    async fetch() {
      this.pageTitle = 'Task 1,2'
      await this.$store.dispatch('getCountries')
      //todo multiple values
      await this.$store.dispatch('getRegions', this.country)
      await this.$store.dispatch('getCitiesByCountries', this.country)
      // await this.$store.dispatch('getCitiesByRegions', this.region)
    },
    data: () => ({
      pageTitle: 'Tasks',
      country: 1,
      region: 0
    }),
    fetchOnServer: true,
    computed: {
      countries() {
        return this.$store.getters['getCountries']
      },
      regions() {
        return this.$store.getters['getRegions']
      },
      cities() {
        return this.$store.getters['getCities']
      },
      citiesByCountry() {
        return this.$store.getters['getCitiesByCountry']
      }

    },
    methods: {
      async onChangeCountry() {
        await this.$store.dispatch('getRegions', this.country)
        await this.$store.dispatch('getCitiesByCountries', this.country)
      },

      async onChangeRegion() {
        await this.$store.dispatch('getCitiesByRegions', this.region)
      },
    },
    mounted() {
      this.$store.dispatch('getCountries')
      this.$store.dispatch('getRegions', this.country)
      this.$store.dispatch('getCitiesByCountries', this.country)
    }
  }
</script>

<style scoped>
  select {
    color: white;
  }
</style>
