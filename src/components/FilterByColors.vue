<script setup lang="ts">
// import coutries store
import { useCountriesStore } from '@/stores/coutries'
const countriesStore = useCountriesStore()

import { flagColors } from '@/constants'
import { Colors } from '@/types'

const getColorClass = (color: Colors) => {
  switch (color) {
    case Colors.black:
      return 'bg-black [--chkbg:theme(colors.black)] [--chkfg:white] disabled:bg-black'
    case Colors.white:
      return 'bg-white [--chkbg:theme(colors.white)] [--chkfg:black] disabled:bg-white'
    case Colors.red:
      return 'bg-red-400 [--chkbg:theme(colors.red.500)] [--chkfg:white] disabled:bg-red-400'
    case Colors.green:
      return 'bg-green-400 [--chkbg:theme(colors.green.500)] [--chkfg:white] disabled:bg-green-400'
    case Colors.blue:
      return 'bg-blue-400 [--chkbg:theme(colors.blue.500)] [--chkfg:white] disabled:bg-blue-400'
    case Colors.yellow:
      return 'bg-yellow-400 [--chkbg:theme(colors.yellow.500)] [--chkfg:white] disabled:bg-yellow-400'
    default:
      return ''
  }
}
</script>

<template>
  <form class="flex gap-x-2">
    <input
      v-for="color in flagColors"
      :key="color"
      type="checkbox"
      class="checkbox checkbox-lg"
      :class="getColorClass(color)"
      :value="color"
      :disabled="!countriesStore.getAvailableColorsToBeFiltered.includes(color)"
      v-model="countriesStore.filters.colors"
    />
  </form>
</template>
