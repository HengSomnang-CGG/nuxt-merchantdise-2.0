<template>
  <div class="">
    <header
      class="flex items-center justify-between"
      :style="{
        backgroundColor: headerTheme,
      }"
    >
      <div class="">
        <img
          :src="headerLogoUrl"
          class="w-72 lg:w-80 md:w-80 cursor-pointer"
          alt="Logo"
          @click="$router.push('/')"
        />
      </div>
      <ul class="flex items-center space-x-4 ml-auto lg:mr-10">
        <li>
          <NuxtLink
            to="#"
            class="rounded-full btn bg-gradient-to-r from-[#506cf4] to-[#f897cd]"
            >LOGIN+</NuxtLink
          >
        </li>
        <li>
          <NuxtLink
            to="#"
            class="rounded-full btn bg-gradient-to-r from-[#506cf4] to-[#f897cd]"
            >Drafter</NuxtLink
          >
        </li>
      </ul>
    </header>
    <hr />

    <marquee
      class="font-bold text-white text-center py-2"
      :style="{
        backgroundColor: containerTheme,
      }"
    >
      <p class="animate-marquee">{{ marquee_title }}</p>
    </marquee>
    <div class="flex items-center justify-center cursor-pointer">
      <img
        src="/assets/images/title.png"
        alt=""
        class="lg:w-[40vh] w-72 md:w-[40vh] 2xl:w-[60vh]"
        @click="$router.push('/')"
      />
    </div>
  </div>
</template>

<script setup>
const { data: web } = useFetch("/api/web");

const headerLogoUrl = computed(() => {
  const headerLogo = web.value.websources?.data?.find(
    (item) => item.assets_type === "header_logo"
  );
  return headerLogo
    ? headerLogo.resources
    : `https://placehold.co/2067x554/EEE/31343C`;
});

const headerTheme = computed(() => {
  return web.value.websources?.data?.find(
    (item) => item.assets_type === "header_theme"
  ).assets_code;
});

const marquee_title = computed(() => {
  const eventText = web.value.websources?.data?.find(
    (item) => item.assets_type === "title_event_marquee"
  );
  return eventText
    ? eventText.assets_name
    : `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. `;
});

const containerTheme = computed(() => {
  const containerCode = web.value.websources?.data?.find(
    (item) => item.assets_type === "container_marquee"
  );
  return containerCode ? containerCode.assets_code : `#000`;
});
</script>

<style></style>
