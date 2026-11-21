<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import FilterBar from './components/FilterBar.vue'
import PartCard from './components/PartCard.vue'
import EmptyState from './components/EmptyState.vue'
import CartDrawer from './components/CartDrawer.vue'
import ProfileModal from './components/ProfileModel.vue'

import { components } from './data/components.ts'
import type {
    CartItem,
    FilterState,
    PartItem
} from './types/hardware.ts'

const filters = reactive<FilterState>({
    search: '',
    category: 'All',
    maxPrice: null,
    sort: 'default'
})

const catalog = ref<PartItem[]>(components)
const cartItems = ref<CartItem[]>([])
const isCartOpen = ref(false)
const isProfileOpen = ref(false)
const liveMessage = ref('')

</script>

<template>
  
</template>