<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import PaginationBar from '@/components/base/PaginationBar.vue'
import SearchCard from '@/components/search/SearchCard.vue'
import type { User } from '@/types/User'
import axios from 'axios'
import { computed, ref, watch } from 'vue'

const people = ref<User[]>()

const userOptions = ['id', 'firstName', 'lastName', 'age', 'gender', 'phone', 'address', 'image']

const delay = 0
const limit = ref(20)
const skip = ref(0)
const total = ref(0)
const paginationParams = computed(() => `limit=${limit.value}&skip=${skip.value}`)
const userParams = computed(() => `select=${userOptions.join(',')}`)
const delayParams = computed(() => `delay=${delay}`)

async function loadData() {
  axios
    .get(
      `https://dummyjson.com/users?${userParams.value}&${paginationParams.value}&${delayParams.value}`,
    )
    .then((response) => {
      people.value = response.data.users as User[]
      total.value = response.data.total
    })
}

watch(skip, () => {
  loadData()
})

loadData()
</script>

<template>
  <main class="mt-10 flex flex-col gap-5 items-center content-center">
    <div id="searchBar" class="border border-zinc-300 flex gap-2">
      <input id="searchText" type="text" />
      <input id="dateFrom" type="date" />
      <input id="dateTo" type="date" />
      <BaseButton label="Search" />
    </div>
    <div id="searchBody" class="flex flex-col gap-3">
      <div id="searchResults" class="grid grid-cols-10 gap-5">
        <SearchCard v-for="user in people" :key="user.id" :user="user" />
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
