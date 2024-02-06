<script>
import {v4 as uuidv4} from "uuid";
import { ref } from 'vue'

export default {
  name: "MyFilterDropdown",
  emits: ['selecteditems'],
  props: {
    selectableitems: {
      type: Object,
      default: () => {}
    },
    caption: {
      type: String,
      default: ''
    },
    selected: {
      // is everything selected or unselected
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      selecteditems: ref([])
    }
  },
  computed: {
    dropdownid: function () {
      return uuidv4()
    }
  },
  mounted() {
    if (this.selected == true)
    {
      this.selecteditems = this.selectableitems
    }
  }
}
</script>

<template>


  <div class="dropdown">

    <button class="btn dropdown-toggle float-end" type="button" v-bind:id="dropdownid" data-bs-toggle="dropdown" aria-expanded="false">
      {{ caption }}
    </button>


    <ul class="dropdown-menu" v-bind:aria-labelledby="dropdownid">

        <button type="button" data-bs-auto-close="outside" class="dropdown-item" @click="this.selecteditems = this.selectableitems; this.$emit('selecteditems', this.selecteditems)" data-keepOpenOnClick>Select all</button>

      <button type="button" class="dropdown-item" @click="this.selecteditems = []; this.$emit('selecteditems', this.selecteditems)">Deselect all</button>

      <hr class="dropdown-divider">

      <a class="dropdown-item" v-for="(selectableitem, index) in selectableitems" :key="index">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" :value="selectableitem" :id="selectableitem" v-model="selecteditems"  checked @change="this.$emit('selecteditems', this.selecteditems)" />
            <label class="form-check-label" :for="selectableitem">{{ selectableitem }}</label>
          </div>

      </a>

    </ul>
  </div>

<!--  <p>-->
<!--    Selected items are: {{ selecteditems }}-->
<!--  </p>-->

</template>

<style scoped>

</style>