<template>
  <div>
    <Head>
      <Title>Merchantise | {{ fetchblog.title_blog }}</Title>
      <Meta name="description" :content="fetchblog.content_blog" />
    </Head>
    <ProductDetails :item="fetchblog" />
    <hr />
    <div>
      <h1 class="text-lg m-2">Your May Also Like.</h1>

      <!-- ramdom product -->
      <ClientOnly>
        <div
          class="grid grid-cols-2 lg:grid-cols-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5"
        >
          <template v-if="allProducts">
            <div v-for="(item, index) in displayProducts" :key="index">
              <ProductCard :item="item" />
            </div>
          </template>
          <template v-else>
            <h3>No results found</h3>
          </template>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup>
const { id } = useRoute().params;

const { data: item } = await useAsyncData(() => $fetch(`/api/bukti/${id}`));
const { data: products } = useFetch("/api/sun");

const showCount = ref(4); // show 4 random products
const isMobile = ref(false);

const detectScreenSize = () => {
  const width = window.innerWidth;
  isMobile.value = width <= 1025;

  // Check for specific conditions for iPad Pro and Air
  if (width <= 760) {
    showCount.value = 4;
  } else if (width < 1024) {
    showCount.value = 3;
  } else {
    showCount.value = 4;
  }
};

onMounted(() => {
  detectScreenSize();
  window.addEventListener("resize", detectScreenSize);
  return () => window.removeEventListener("resize", detectScreenSize);
});

// Decode HTML entities Description
function decodeHTMLEntities(text) {
  if (process.client) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }
  return text;
}

const fetchblog = computed(() => {
  return item.value
    ? {
        ...item.value,
        content_blog: decodeHTMLEntities(item.value.content_blog),
      }
    : {};
});

const allProducts = computed(() => {
  return products.value.bukti
    ? products.value.bukti.map((item) => {
        return {
          ...item,
          title_blog: decodeHTMLEntities(item.title_blog),
          content_blog: decodeHTMLEntities(item.content_blog),
        };
      })
    : [];
});

function getRandomItems(arr, num) {
  if (process.client) {
    return arr.sort(() => 0.5 - Math.random()).slice(0, num);
  }
}

const displayProducts = computed(() => {
  return getRandomItems(allProducts.value, showCount.value);
});
</script>

<style></style>
