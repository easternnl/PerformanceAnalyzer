<script>
export default {
  name: "MyTable",
  props: {
    tabledata: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    chartid: function () {
      return uuidv4()
    }
  },
}
</script>

<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th v-for="(column, idx) in columns" :key="idx">
          <a href="#" v-on:click="sortBy(column)" >
            {{ column }}
          </a>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(x, idx) in orderedtop20highest " :key="idx">
        <td v-for="(column, idx) in columns" :key="idx">
          <div v-if="column.search('epoch') > -1">
            {{ moment.unix(x[column]).format('YYYY-MM-DD HH:mm:ss') }}
          </div>
          <div v-else>
            {{ x[column] }}
          </div>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>