<template>
  <div class="card text-center">
    <div
      class="group relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
    >
      <img
        loading="lazy"
        :src="item.resources"
        alt="product thumb"
        class="object-cover transition-all duration-500 group-hover:rotate-3 group-hover:scale-125"
        @click="$router.push(`/products/${item.id}`)"
      />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"
      ></div>
      <div
        class="absolute inset-0 sm:flex 2xl:flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0 hidden md:hidden"
      >
        <h3 class="font-dmserif font-bold text-white">
          {{ item.title_blog }}
        </h3>
        <p
          class="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 truncate"
          v-html="item.content_blog"
        ></p>
        <NuxtLink
          :to="`/products/${item.id}`"
          class="rounded-full py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60"
          :style="{ backgroundColor: button_color }"
        >
          See More
        </NuxtLink>
      </div>
    </div>
    <div class="2xl:hidden">
      <p class="font-bold m-4 truncate">
        {{ item.title_blog }}
      </p>
      <NuxtLink
        :style="{ backgroundColor: button_color }"
        :to="`/products/${item.id}`"
        class="btn my-4 rounded-full"
        >View</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const { data: web } = useFetch("/api/web");

const backgroundProduct = "./assets/images/backgroundproduct.webp";

const button_color = computed(() => {
  const buttonColor = web.value?.websources?.data?.find(
    (item) => item.assets_type === "button_color"
  );
  return buttonColor ? buttonColor.assets_code : "#000";
});

const { item } = defineProps(["item"]);
</script>

<style></style>
