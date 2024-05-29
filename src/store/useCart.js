import { ref, computed } from 'vue';

export function useCart() {
  const cart = ref([]);

  const addToCart = (event) => {
    const existingItemIndex = cart.value.findIndex(item => item.id === event.id);
    if (existingItemIndex === -1) {
      cart.value.push(event);
    }
  };

  const removeFromCart = (event) => {
    const index = cart.value.findIndex(item => item.id === event.id);
    if (index !== -1) {
      cart.value.splice(index, 1);
    }
  };

  const cartCount = computed(() => cart.value.length);

  return {
    cart,
    addToCart,
    removeFromCart,
    cartCount
  };
}
