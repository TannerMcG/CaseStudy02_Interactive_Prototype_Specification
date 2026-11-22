<script setup lang="ts">
import { computed, reactive, ref } from 'vue'

import AppHeader from './components/AppHeader.vue'
import FilterBar from './components/FilterBar.vue'
import PartCard from './components/PartCard.vue'
import EmptyState from './components/EmptyState.vue'
import CartDrawer from './components/CartDrawer.vue'
import ProfileModal from './components/ProfileModal.vue'

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

const filteredParts = computed(() => {
    const normalizedSearch = filters.search.toLowerCase().trim()
    
    let results = catalog.value.filter((part) => {
        const matchesSearch =
          part.name.toLowerCase().includes(normalizedSearch) ||
          part.category.toLowerCase().includes(normalizedSearch)

        const matchesCategory =
          filters.category === 'All' ||
          part.category === filters.category

        const matchesBudget =
          filters.maxPrice === null ||
          part.price <= filters.maxPrice

        return matchesSearch && matchesCategory && matchesBudget
    })

    if (filters.sort === 'price-low') {
        results = results.sort((a, b) => a.price - b.price)
    }

    if (filters.sort === 'price-high') {
        results = results.sort((a, b) => b.price - a.price)
    }

    if (filters.sort === 'name') {
        results = results.sort((a, b) => a.name.localeCompare(b.name))
    }

    return results
})

const cartCount = computed(() => {
    cartItems.value.reduce(
        (total, item) => total + item.quantity,
        0
    )
})

const cartSubTotal = computed(() => {
    cartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )
})

function resetFilters(): void {
    filters.search = ''
    filters.category = 'All'
    filters.maxPrice = null
    filters.sort = 'default'
}

function addToCart(part: PartItem): void {
    // TODO
}

function changeQuantity(id: string, amount: number): void {
    // TODO
}

function removeFromCart(id: string): void {
    // TODO
}

function clearCart(): void {
    cartItems.value = []
    liveMessage.value = 'Cart cleared'
}

function openCart(): void {
    isCartOpen.value = true
}

function closeCart(): void {
    isCartOpen.value = false
}

function openProfile(): void {
    isCartOpen.value = false
    isProfileOpen.value = true
}
</script>

<template>
    <AppHeader
        :cart-count="cartCount"
        :cart-subtotal="cartSubTotal"
        @open-cart="openCart"
    />

    <main id="main-content" class="page-container">
        <section class="hero" aria-labelledby="page-title">
            <p class="eyebrow">PC Catalog</p>

            <h1 id="page-title">
                Build you dream PC.
            </h1>

            <p class="hero-description">
                Find the best parts for your PC build.
                Browse the catalog, compare prices,
                and add your items to the cart.
            </p>
        </section>

        <div class="shop-layout">
            <section id="catalog" class="catalog-column">
                <FilterBar
                    :filters="filters"
                    @update:filters="Object.assign(filters, $event)"
                    @reset="resetFilters"
                />

                <section aria-labelledby="catalog-heading">
                    <div class="results-header">
                        <div>
                            <p class="eyebrow">Components</p>
                            <h2 id="catalog-heading">Browse Parts</h2>
                        </div>

                        <p
                          class="results-summary"
                          role="status"
                          aria-live="polite"
                          aria-atomic="true"
                        >
                          {{ filteredParts.length }} parts found
                        </p>
                    </div>

                    <EmptyState
                        v-if="filteredParts.length === 0"
                        @reset="resetFilters"
                    />

                    <div v-else class="product-gird">
                        <PartCard
                          v-for="part in filteredParts"
                          :key="part.id"
                          :part="part"
                          @add="addToCart"
                        />
                    </div>
                </section>
            </section>
        </div>
    </main>

    <CartDrawer
      :open="isCartOpen"
      :items="cartItems"
      :subtotal="cartSubTotal"
      @close="closeCart"
      @change-quantity="changeQuantity"
      @remove="removeFromCart"
      @clear="clearCart"
      @checkout="openProfile"
    />

    <ProfileModal
      :open="isProfileOpen"
      @close="isProfileOpen = false"
    />

    <p
      class="live-status"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      {{ liveMessage }}
    </p>

    <footer class="site-footer">
        <div class="footer-inner">
            <span>PC Parts</span>
            <span>PC Parts Catalog Prototype</span>
        </div>
    </footer>
</template>