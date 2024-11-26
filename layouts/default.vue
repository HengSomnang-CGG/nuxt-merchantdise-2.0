<template>
  <div class="bg-cover bg-center">
    <Header />
    <div class="container mx-auto p-4">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<script setup>
const { data: datamanager } = useFetch("/api/web");

const backgroundUrl = computed(() => {
  const backgroundsources = datamanager.value.websources?.data?.find(
    (item) => item.assets_type === "background_image"
  );
  return backgroundsources
    ? backgroundsources.resources
    : `https://placehold.co/1920x1080/EEE/31343C`;
});

onMounted(() => {
  document.body.style.backgroundImage = `url(${
    backgroundUrl.value
      ? backgroundUrl.value
      : `https://placehold.co/1920x1080/EEE/31343C`
  })`;
  document.body.style.backgroundRepeat = "no-repeat";
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
