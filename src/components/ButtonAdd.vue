<script setup>
import { computed, inject } from 'vue';
import { useCart } from '../store/useCart';

const props = defineProps({
  event: {
    type: Object,
    required: true,
  }
});

const addToCart = inject('addToCart');


const addToCartHandler = () => {
  addToCart(props.event);
};


const shouldShowButton = computed(() => {
  return props.event.status !== '尚未開始' && props.event.status !== '已結束';
});
</script>

<template>
  <button v-if="shouldShowButton" @click="addToCartHandler" class="btnAdd">
    購票
  </button>
</template>
