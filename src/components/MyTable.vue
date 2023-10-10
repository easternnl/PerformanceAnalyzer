<script>

export default {
  name: "MyTable",
  data() {
    return {
      sortkey: '',
      sortreverse: false,
    }
  },
  props: {
    tabledata: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    sortBy: function (sortkey) {

      this.sortreverse = (this.sortkey == sortkey) ? !this.sortreverse : false

      console.log('Setting sortkey to: ' + sortkey + ' reverse: ' + this.sortreverse)

      this.sortkey = sortkey

    },
  },
  computed: {
    columns: function () {
      return Object.keys(this.tabledata[0])
    },
    tabledatasorted: function() {
      if (this.sortkey != '') {

        var sortedarray = []

        if (this.sortreverse == true)
        {
          console.log('Sorting on ' + this.sortkey + ' REVERSE')

          sortedarray = this.$d3.sort (this.tabledata,(a,b) => this.$d3.descending (a[this.sortkey], b[this.sortkey]))
        }
        else
        {
          console.log('Sorting on ' + this.sortkey + ' ASCENDING')


          sortedarray = this.$d3.sort (this.tabledata,(a,b) => this.$d3.ascending(a[this.sortkey], b[this.sortkey]))

        }

        return sortedarray
      }
      else
      {
        console.log('Returning default sortedarray')
        return this.tabledata
      }

    }

  },
}
</script>

<template>
  <div>
    <table class="table table-striped table-hover">
      <thead>
      <tr>
        <th v-for="(column, idx) in columns" :key="idx" v-on:click="sortBy(column)">
          {{ column }}
          <div class="d-inline" v-if="column == this.sortkey && this.sortreverse == false"> &#x2191;</div>
          <div class="d-inline" v-if="column == this.sortkey && this.sortreverse == true"> &#x2193;</div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(data, idx) in tabledatasorted " :key="idx">
        <td v-for="(column, idx) in columns" :key="idx">
          <div>
            {{ data[column] }}
          </div>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<style scoped>

</style>