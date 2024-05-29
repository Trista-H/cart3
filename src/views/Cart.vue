<script setup>
import { inject, ref, computed } from 'vue';

const cart = inject('cart');
const removeFromCart = inject('removeFromCart');

// 新增對 count 的引用
const count = inject('cartCount');

const selectedItems = ref([]);

const toggleSelection = (item) => {
  if (selectedItems.value.includes(item)) {
    selectedItems.value = selectedItems.value.filter(i => i !== item);
  } else {
    selectedItems.value.push(item);
  }
};

const removeMulti = () => {
  selectedItems.value.forEach(item => removeFromCart(item));
  selectedItems.value = [];
};

const submitCart = () => {
  showModal.value = true;  // 顯示模態視窗
  console.log('送出訂單:', cart.value);
  clearCart(); // 清空購物車
};

const clearCart = () => {
  cart.value = [];
  count.value = 0; // 重置 count
};

// 計算總金額
const totalPrice = computed(() => {
  return cart.value.reduce((sum, item) => sum + item.maxPrice, 0);
});

// 控制模態視窗的顯示與隱藏
const showModal = ref(false);
const closeModal = () => {
  showModal.value = false;
};
</script>

<template>
  <div>
    <div v-if="cart && cart.length > 0">
      <ul class="flex flex-wrap">
        <li v-for="item in cart" :key="item.id" class="mb-6 w-full lg:w-1/2">
          <div class="flex itemList">
            <div class="itemMulti">
              <input type="checkbox" :value="item" @change="toggleSelection(item)" class="mr-2 checkbox">
            </div>
            <div class="itemOrder w-32">
              <img :src="item.imageUrl" :alt="item.name" />
            </div>
            <div class="detail pl-3 pr-3">
              <h2 class="title">{{ item.name }}</h2>
              <div>票價：{{ item.maxPrice }}</div>
              <button @click="removeFromCart(item)" class="bg-red-600 p-2 text-white">移除</button>
            </div>
          </div>
        </li>
      </ul>

      <footer class="mb-4 flex justify-between">
        <div class="btnDelete text-start">
          <button @click="clearCart" class="m-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            清空購物車<small>( 操作前請確定 )</small>
          </button>
          <button @click="removeMulti" class="m-4 bg-orange-500 hover:bg-orange-700 p-2 text-white">
            刪除已勾選項目<small>( 操作前請確定 )</small>
          </button>
        </div>

        <div class="text-2xl text-center self-center">目前總計金額：{{ totalPrice }}</div>
        <button @click="submitCart" class="m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          送出訂單
        </button>
      </footer>
    </div>
    <p v-else class="text-2xl text-center empty" style="line-height: 1.8">
      哇耶？還沒預定活動！<br />快購票參加吧，啾咪 ^3^
    </p>

    <!-- 模態視窗 -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white p-8 rounded shadow-lg text-center">
        <h3 class="title">超級棒的訂單已送出！</h3>
        <p class="mb-3">記得<span class="text-red-600">完成繳費取票手續</span></p>
        <p class="mb-5">前往參加活動吧 ^O^</p>
        <button @click="closeModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded">
          關閉
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
h3.title {
  font-weight: 2em!important;
  font-weight: bold;
  padding: 1rem;
}
</style>