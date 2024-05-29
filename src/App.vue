<script setup>
import { provide, ref, computed } from 'vue';
import { useCart } from './store/useCart';
import { useRouter } from 'vue-router';

const router = useRouter();
const { cart, addToCart, removeFromCart, cartCount } = useCart();

const cartItemCount = computed(() => cartCount.value);

const pageTitle = ref('響樂拾光基金會');

const updateTitle = (title) => {
  pageTitle.value = title;
};

provide('cart', cart);
provide('addToCart', addToCart);
provide('removeFromCart', removeFromCart);
provide('cartCount', cartItemCount);

</script>

<template>
  <div class="container mx-auto">
    <header class="mb-4">
      <h1 class="text-5xl">{{ pageTitle }}</h1>
      <nav class="mt-4">
        <router-link to="/" class="mr-4">活動</router-link>
        <span> l </span>
        <router-link to="/cart">
          結帳 <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
        </router-link>
      </nav>
    </header>
    <main class="m-4">
      <router-view @update-title="updateTitle"></router-view>
    </main>
  </div>
</template>


<style>

html {
  scroll-behavior: smooth;
}
body {
  background-color: #eee;
  color: #666;
  font-size: 1.1em;
  line-height: 1.5;
}
h1 {
  font-weight: bold;
  font-family: 'Times New Roman', Times, serif;
  padding: 2rem 1rem 1rem;
  text-align: center;
}
h2.title {
  font-size: 1em;
  font-weight: bold;
  letter-spacing: 0;
  margin: .5rem auto;
  min-height: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.event p {
  color:#777;
}
.event p.deco {
  border-top: 2px solid #777;
  border-bottom: 1px dashed #777;
}
.item {
  max-width: 260px;
  margin: 1rem 1rem 2rem;
}
.itemImg {
  height: 338px;
  margin-bottom: 2rem;
  position: relative;
  width: 260px;
}
.itemImg img {
  border: 10px solid #fff;
  box-shadow: 0px 0 5px rgba(0,0,0,.3);
  border-radius: .5rem;
}
.btnAdd {
	background: orange;
  border: 5px solid #fff;
	color: #fff;
  position: absolute;
  bottom: -13px;
  margin: 0;
	right: 5px;
  width: 100px;
}
.btnAdd:hover,
.btnAdd:focus {
  border: 5px solid #fff;
}
nav {
  border-bottom: 5px dotted #ccc;
  border-top: 5px dotted #ccc;
  margin: 1rem;
  padding-bottom: 1rem;
  padding-top: 1rem;
  text-align: center;
}
.cart-count {
  background-color: #333;
  color: white;
  border-radius: 50%;
  padding: 0.2em 0.6em;
  font-size: 0.8em;
  margin-left: 0.5em;
  width: 20px;
  height: 20px;
}
nav a:hover {
  color: #535bf2;
}
.cart-count:hover,
nav :last-child:hover span {
  background-color: #535bf2;
}
nav {
  color: #999;
}
nav a {
  color: #999;
  margin-left: 1rem;
  margin-right: 1rem;
}
.itemList {
  border-left: 8px solid #ccc;
  padding: 1rem;
}
footer {
  border-top: 4px solid #999;
  margin-top: 1rem;
  padding-top: 1rem;
}
</style>