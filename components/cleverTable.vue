<template>
  <div v-if="lastPageNum">

    <table>
      <thead>
      <tr>
        <td v-for="td of getColumns">{{td}}</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row of getRows">
        <td v-for="td of Object.values(row)">{{td}}</td>
      </tr>
      </tbody>
    </table>
    <div>
      <button @click="page--" :disabled="page==1" class="text-decoration-none text-body-1"><span class="text-h6 text--primary">←&nbsp;</span><span>Назад</span></button>
      {{page}}/{{lastPageNum }}
      <button @click="page++" :disabled="!existNextPage" class="text-decoration-none text-body-1"> <span>Вперед</span><span class="text-h6 text--primary">&nbsp;→</span></button>
    </div>
  </div>

</template>

<script>
  export default {
    name: "cleverTable",
    props: ['data'],
    data: () => ({
      page: 1,
      pageSize: 10
    }),
    computed: {
      getColumns() {
        let firstElement = (0 in this.getData()) ? this.getData()[0] : {}
        return Object.keys(firstElement)
      },
      getRows() {
        return this.getPageRows()
      },
      lastPageNum() {
        return Math.ceil(this.getData().length / this.pageSize)
      },
      existNextPage() {
        return this.page < this.lastPageNum
      }
    },
    methods: {
      getData() {
        return this.data || {}
      },
      getPageRows(page = this.page) {
        return this.getData().slice(this.pageSize * (page-1), this.pageSize * page )
      },
    }
  }
</script>

<style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
  }

  td {
    border: solid 1px grey
  }
  thead td{
    font-weight: bold;
  }
  button:disabled{
    opacity: 0.5;
  }
</style>
