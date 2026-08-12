<!-- Design: Observatory Console — 画面の左端に調査の現在地を示す、縦方向の工程レール。 -->
<script setup>
defineProps({
  active: { type: Number, default: 1 },
})

const steps = ['再現', '観測', '原因', '修正', '検証']
</script>

<template>
  <aside class="investigation-rail" aria-label="デバッグの工程">
    <p class="eyebrow">調査の現在地</p>
    <ol>
      <li v-for="(step, index) in steps" :key="step" :class="{ 'is-active': active === index + 1, 'is-done': active > index + 1 }">
        <span>{{ String(index + 1).padStart(2, '0') }}</span>
        <strong>{{ step }}</strong>
      </li>
    </ol>
  </aside>
</template>
