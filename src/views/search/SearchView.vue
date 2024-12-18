<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import FormInput from '@/components/base/form/FormInput.vue'
import PaginationBar from '@/components/base/PaginationBar.vue'
import SearchCard from '@/components/search/SearchCard.vue'
import SearchCardPlaceholder from '@/components/search/SearchCardPlaceholder.vue'
import type { User } from '@/types/User'
import axios from 'axios'
import { computed, ref, watch } from 'vue'

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

async function loadData() {
  isLoading.value = true
  axios
    .get(
      `https://dummyjson.com/users?${userParams.value}&${paginationParams.value}&${delayParams.value}`,
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
      <FormInput id="searchText" type="text" />
      <FormInput id="dateFrom" type="date" />
      <FormInput id="dateTo" type="date" />
      <BaseButton label="Search" color="info" />
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
