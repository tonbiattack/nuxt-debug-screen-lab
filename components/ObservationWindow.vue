<!-- Design: Observatory Console — 未確定の点線と確定済みの実線で、観測値の信頼度を示す。 -->
<script setup>
defineProps({
  label: { type: String, required: true },
  environment: { type: String, required: true },
  value: { type: String, required: true },
  tone: { type: String, default: 'neutral' },
})
</script>

<template>
  <section class="observation-window" :class="`observation-window--${tone}`">
    <div class="observation-window__head">
      <p>{{ label }}</p>
      <span>{{ environment }}</span>
    </div>
    <output class="observation-window__value">{{ value }}</output>
  </section>
</template>
