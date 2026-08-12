<!-- Design: Observatory Console — 左工程レールと右観測領域を持つ、非対称の科学計測UI。 -->
<script setup>
const brandLogoUrl = '/manus-storage/nuxt-debug-logo_b1ab8e3c.png'
</script>

<template>
  <div class="app-shell">
    <header class="topbar">
      <NuxtLink class="brand" to="/" aria-label="Nuxt Debug Observatory のホーム">
        <span class="brand__mark" aria-hidden="true">
          <img
            class="brand__mark-asset"
            :src="brandLogoUrl"
            alt=""
            width="44"
            height="44"
          >
          <i class="brand__window brand__window--left" />
          <i class="brand__window brand__window--right" />
          <b class="brand__axis" />
        </span>
        <span>
          <strong>Nuxt Debug</strong>
          <small>OBSERVATORY</small>
        </span>
      </NuxtLink>
      <nav class="topbar__nav" aria-label="演習ページ">
        <NuxtLink to="/buggy">再現する</NuxtLink>
        <NuxtLink to="/fixed">修正を確認</NuxtLink>
      </nav>
    </header>
    <NuxtPage />
  </div>
</template>
