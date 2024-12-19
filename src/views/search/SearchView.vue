<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import FormInput from '@/components/base/form/FormInput.vue'
import PaginationBar from '@/components/base/PaginationBar.vue'
import SearchCard from '@/components/search/SearchCard.vue'
import SearchCardPlaceholder from '@/components/search/SearchCardPlaceholder.vue'
import type { User } from '@/types/User'
import { mdiCalendar, mdiCloseThick, mdiMagnify } from '@mdi/js'
import axios from 'axios'
import { computed, ref, watch } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const people = ref<User[]>()

const userOptions = ['id', 'firstName', 'lastName', 'age', 'gender', 'phone', 'address', 'image']

const delay = 5000
const limit = ref(20)
const skip = ref(0)
const total = ref(0)
const paginationParams = computed(() => `limit=${limit.value}&skip=${skip.value}`)
const userParams = computed(() => `select=${userOptions.join(',')}`)
const delayParams = computed(() => `delay=${delay}`)
const isLoading = ref(false)
const showDatePicker = ref(false)
const dateRange = ref()
const searchText = ref<string>('')
const searchParams = computed(() => `/search?q=${searchText.value}&`)

async function loadData() {
  isLoading.value = true
  axios
    .get(
      `https://dummyjson.com/users${searchText.value ? searchParams.value : '?'}${userParams.value}&${paginationParams.value}&${delayParams.value}`,
    )
    .then((response) => {
      people.value = response.data.users as User[]
      total.value = response.data.total
      isLoading.value = false
    })
    .catch((error) => {
      console.error(error)
    })
}

watch(skip, () => {
  loadData()
})

loadData()
</script>

<template>
  <main class="pt-5 flex flex-col gap-5 items-center content-center">
    <div id="searchBar" class="flex gap-2 py-3 px-10 rounded-full bg-zinc-100 shadow-md">
      <FormInput id="searchText" type="text" borderless class="shadow-md" v-model="searchText" />
      <!-- <FormInput id="dateFrom" type="date" borderless class="shadow-md" />
      <FormInput id="dateTo" type="date" borderless class="shadow-md" /> -->
      <div class="relative">
        <BaseButton
          :icon="mdiCalendar"
          @click="showDatePicker = !showDatePicker"
          class="w-12 h-12 z-20"
          color="lightdark"
        />
        <BaseButton
          v-if="dateRange"
          :icon="mdiCloseThick"
          class="absolute -right-3 -top-3 z-50 h-6 w-6"
          rounded-full
          color="danger"
          @click="dateRange = undefined"
        />

        <div v-if="showDatePicker" class="w-fit -inset-x-[calc(131.5px-50%)] absolute z-20 p-5">
          <Datepicker
            v-model="dateRange"
            range
            inline
            @blur="showDatePicker = false"
            @update:model-value="showDatePicker = false"
            class="shadow-xl"
          />
        </div>
      </div>
      <BaseButton :icon="mdiMagnify" color="info" class="w-12 h-12" @click="loadData" />
    </div>
    <div id="searchBody" class="flex flex-col gap-3 w-[90%]">
      <div
        id="searchResults"
        class="grid grid-cols-10 gap-5"
        :class="isLoading ? 'animate-pulse' : ''"
      >
        <SearchCardPlaceholder v-if="isLoading" v-for="i in 20" :key="i" />
        <SearchCard v-else v-for="user in people" :key="user.id" :user="user" />
      </div>
      <PaginationBar
        :skip="skip"
        :limit="limit"
        :total="total"
        :key="total"
        @change="(newValue: number) => (skip = newValue)"
      />
    </div>
  </main>
</template>
