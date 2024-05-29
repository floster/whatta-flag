import { defineStore } from 'pinia'
import type { Country } from '@/types'
import { Colors } from '@/types'
import { countries } from '@/constants'

export const useCountriesStore = defineStore({
  id: 'coutries',
  state: () => ({
    countries,
    filters: {
      colors: [] as (keyof typeof Colors)[]
    },

    extendedFlagInfo: false,

    flagsWithSymbol: false,
    flagsWithOrigami: false,
    gbRelatedFlags: false
  }),
  getters: {
    getCountriesCodes: (state) => state.countries.map((country) => country.code.toLowerCase()),
    getCountryByCode:
      (state) =>
      (code: string): Country | undefined =>
        state.countries.find((country) => country.code === code),

    getFlagsWithSymbol: (state): Country[] =>
      state.countries.filter((country) => country.flagData.symbol),

    getFlagsWithOrigami: (state): Country[] =>
      state.countries.filter((country) => country.flagData.origami),

    getGbRelatedFlags: (state): Country[] =>
      state.countries.filter((country) => country.flagData.gb_related),

    getFilteredFlags(state): string[] {
      let flags: Country[] = this.flagsWithSymbol ? this.getFlagsWithSymbol : state.countries

      flags = this.flagsWithOrigami ? flags.filter((country) => country.flagData.origami) : flags

      flags = this.gbRelatedFlags ? flags.filter((country) => country.flagData.gb_related) : flags

      return flags
        .filter((country) => state.filters.colors.every((color) => country.flagData.colors[color]))
        .map((country) => country.code)
    },

    getGroupedByFirstLetterFlags(): Record<string, string[]> {
      // object with keys as first letter of country code and values as array of country codes
      const grouped = this.getFilteredFlags.reduce(
        (acc, code) => {
          const firstLetter = code[0].toUpperCase()
          acc[firstLetter] = acc[firstLetter] ? [...acc[firstLetter], code] : [code]
          return acc
        },
        {} as Record<string, string[]>
      )

      // sort object by keys and return it
      return Object.keys(grouped)
        .sort()
        .reduce(
          (acc, key) => {
            acc[key] = grouped[key]
            return acc
          },
          {} as Record<string, string[]>
        )
    },

    getResultsQty(): number {
      return this.getFilteredFlags.length
    }
  },
  actions: {
    toggleFilteredColor(color: keyof typeof Colors) {
      const index = this.filters.colors.indexOf(color)

      if (index === -1) {
        this.filters.colors.push(color)
      } else {
        this.filters.colors.splice(index, 1)
      }
    },
    toggleExtendedFlagInfo() {
      this.extendedFlagInfo = !this.extendedFlagInfo
    },
    toggleFlagsWithSymbol() {
      this.flagsWithSymbol = !this.flagsWithSymbol
    },
    toggleFlagsWithOrigami() {
      this.flagsWithOrigami = !this.flagsWithOrigami
    },
    toggleGbRelatedFlags() {
      this.gbRelatedFlags = !this.gbRelatedFlags
    },
    resetFilters() {
      this.filters.colors = []
      this.flagsWithSymbol = false
      this.flagsWithOrigami = false
      this.gbRelatedFlags = false
    }
  }
})
