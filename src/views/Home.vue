<script setup>
  import { ref, onMounted, inject } from 'vue';
  import ButtonAdd from '../components/ButtonAdd.vue';

  const events = ref([]);
  const addToCart = inject('addToCart');

  onMounted(async () => {
    try {
      const response = await fetch('/service/API.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      events.value = data;
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  });
</script>

<template>
  <div>
    <div v-if="events.length" class="sm:flex flex-wrap">
      <div v-for="event in events" :key="event.id" class="event sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
        <div class="item">
          <div class="itemImg">
            <ButtonAdd :event="event" />
            <img :src="event.imageUrl" :alt="event.name" />
          </div>
          <h2 class="title">{{ event.name }}</h2>
          <p class="flex deco">
            <span class="basis-1/2 text-start">{{ event.displayCategory }}</span>
            <strong class="basis-1/2 text-end">{{ event.status }}</strong>
          </p>
          <p class="text-start">
            日期：
            {{ new Date(event.startDateTime * 1000).toLocaleDateString() }} ~ 
            {{ new Date(event.endDateTime * 1000).toLocaleDateString() }}
          </p>
          <p class="text-start">票價：{{ event.minPrice }} ~ {{ event.maxPrice }}</p>
          <p class="text-start">年齡限制：{{ event.ageRestriction }}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading events...</p>
    </div>
  </div>
</template>
