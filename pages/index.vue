<template>
  <div class="">
    <div
      class="grid grid-cols-2 lg:grid-cols-4 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-5"
    >
      <template v-if="paginatedItems">
        <div v-for="(item, index) in paginatedItems" :key="index">
          <ProductCard :item="item" />
        </div>
      </template>
      <template v-else>
        <h3>No results found</h3>
      </template>
    </div>

    <div class="flex justify-center items-center space-x-2 text-center mt-4">
      <button
        @click="currentPage > 1 ? currentPage-- : currentPage"
        :disabled="currentPage === 1"
        class="btn bg-gradient-to-r from-[#010206] to-[#0F83F7]"
      >
        Prev
      </button>
      <button
        @click="currentPage < totalPages ? currentPage++ : currentPage"
        :disabled="currentPage === totalPages"
        class="btn bg-gradient-to-r from-[#010206] to-[#0F83F7]"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
const { data: products } = useAsyncData("product", () => $fetch("/api/sun"));

const currentPage = ref(1);
const itemsPerPage = 12;
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
  return products.value?.bukti
    ? products.value.bukti.map((item) => {
        return {
          ...item,
          title_blog: decodeHTMLEntities(item.title_blog),
          content_blog: decodeHTMLEntities(item.content_blog),
        };
      })
    : [];
});

const filterItems = computed(() => {
  return fetchblog.value
    .filter((item) => item.title_blog.toLowerCase())
    .sort((a, b) => b.id - a.id);
});

// Pagination
const totalPages = computed(() => {
  return Math.ceil(filterItems.value?.length / itemsPerPage) || 1;
});

// data with pagination
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filterItems.value.slice(start, end) || [];
});
</script>

<style></style>
