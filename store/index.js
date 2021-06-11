import {NetDistanceClient} from '~/assets/NetDistance/NetDistanceClient'
import {CountryResponseDto} from "~/assets/NetDistance/Dtos/CountriesResponseDto";

export const state = () => ({
  countries: [
    // {
    //   countryID: 1,
    //   country: 'Russia',
    // },
    // {
    //   countryID: 2,
    //   country: 'Not Russia',
    // }
  ],
  regions: [
    // {
    //   RegionID: 1,
    //   Region: 'lenoblast',
    //   CountryID: 1,
    // }
  ],
  cities: [
    // {
    //   cityID: 1,
    //   city: 'spb',
    //   countryID: 1,
    //   regionID: 1
    // },
    // {
    //   cityID: 2,
    //   city: 'Tallin',
    //   countryID: 2,
    //   regionID: 2
    // }
  ],
  countryCities: [
    // {
    //   cityID: 1,
    //   city: 'spb',
    //   countryID: 1,
    //   regionID: 1
    // },
    // {
    //   cityID: 2,
    //   city: 'Tallin',
    //   countryID: 2,
    //   regionID: 2
    // }
  ],
  distance:{}
})

export const mutations = {
  setCountries(state, countries) {
    state.countries = countries
  },
  setRegions(state, regions) {
    state.regions = regions
  },
  setCities(state, cities) {
    state.cities = cities
  },
  setCountryCities(state, cities) {
    state.countryCities = cities
  },
  setDistance(state, distance) {
    state.distance = distance
  },
}

export const actions = {
  nuxtServerInit({dispatch}) {
    console.log('nuxtServerInit')
  },
  async getCountries({commit}) {
    new NetDistanceClient(this.$axios)
      .getCountries()
      .then(countries => {
        commit('setCountries', countries.data)
      })
  },
  async getRegions({commit}, countries) {
    new NetDistanceClient(this.$axios)
      .getRegions(countries.toString())
      .then(regions => {
        commit('setRegions', regions.data)
      })
  },
  async getCitiesByRegions({commit}, region) {
    new NetDistanceClient(this.$axios)
      .getCitiesByCountries(region.toString())
      .then(cities => {
        commit('setCities', cities.data)
      })
  },
  async getCitiesByCountries({commit}, countries) {
    new NetDistanceClient(this.$axios)
      .getCitiesByCountries(countries.toString())
      .then(cities => {
        commit('setCountryCities', cities.data)
      })
  },
  async getDistance({commit}, points) {
    new NetDistanceClient(this.$axios)
      .getDistance(points.toString())
      .then(distance => {
        commit('setDistance', distance.data)
      })
  }
}

export const getters = {
  getCountries: s => s.countries,
  getRegions: s => s.regions,
  getCities: s => s.cities,
  getCitiesByCountry: s => s.countryCities,
  getDistance: s => s.distance,
}
