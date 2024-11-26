<template>
  <ClientOnly>
    <div class="card">
      <div class="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-1 gap-10">
        <div class="p-7 relative">
          <div class="relative overflow-hidden max-w-[640px] max-h-[480px]">
            <img
              class="mx-auto w-full transition duration-150 ease-out hover:ease-in hover:cursor-zoom-in object-cover"
              :src="item.resources"
              :alt="item.title_blog"
              @mousemove="handleMouseMove"
              @mouseleave="resetZoom"
              ref="zoomImage"
            />
          </div>
        </div>

        <div class="p-7">
          <h2 class="lg:text-4xl md:text-2xl text-xl my-7">
            {{ item.title_blog }}
          </h2>
          <h3 class="font-bold border-b-2 mb-4 pb-2">Product description:</h3>
          <p class="mb-7" v-html="item.content_blog"></p>
          <button
            class="btn flex rounded-full"
            :style="{ backgroundColor: button_color }"
          >
            <i class="material-icons mr-2">KLAIM</i>
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, defineProps, computed } from "vue";
const { item } = defineProps(["item"]);
const { data: web } = useFetch("/api/web");

const button_color = computed(() => {
  const buttonColor = web.value?.websources?.data?.find(
    (item) => item.assets_type === "button_color"
  );
  return buttonColor ? buttonColor.assets_code : "#000";
});

const zoomImage = ref(null);

function handleMouseMove(e) {
  const img = zoomImage.value;
  const rect = img.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = "scale(2)";
}

function resetZoom() {
  const img = zoomImage.value;
  img.style.transformOrigin = "center";
  img.style.transform = "scale(1)";
}
</script>

<style></style>
