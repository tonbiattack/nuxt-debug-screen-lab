<!-- Design: Observatory Console — 修正後は苔色の実線で、初期値の一致と確定状態を示す。 -->
<script setup>
import { formatReportTime } from '~/shared/report-time.mjs'

useHead({ title: '修正画面 | Nuxt Debug Observatory' })

/**
 * SSRとHydrationの最初の比較対象をそろえるための初期値。
 *
 * refの初期値はサーバーとクライアントで同じ文字列になる。ここでIntlやwindowの値を読まないことが重要である。
 * 利用者固有の表示は、Hydration完了後にだけ更新する。
 */
const formattedAt = ref('ブラウザ時刻を取得中…')
const browserTimeZone = ref('未取得')

onMounted(() => {
  // onMountedはSSRでは実行されない。したがって、このブラウザ専用APIは初期HTMLを変えない。
  // Hydrationが終わってから表示を置き換えるため、初回のDOM比較対象を壊さずにローカル時刻を出せる。
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  browserTimeZone.value = timeZone
  formattedAt.value = formatReportTime(timeZone)
})
</script>

<template>
  <main class="lab-page">
    <section class="lab-page__titlebar">
      <NuxtLink class="back-link" to="/">← 演習の概要へ戻る</NuxtLink>
      <p class="eyebrow">STEP 04 / FIX</p>
      <h1>修正後：Hydration中は同じ値を描く</h1>
      <p>ブラウザにしか存在しないタイムゾーン情報は、Hydrationが完了してから読み取ります。</p>
    </section>

    <section class="lab-layout">
      <InvestigationRail :active="4" />
      <div class="lab-content">
        <section class="incident-surface incident-surface--fixed">
          <div class="incident-surface__flag"><span class="status-dot status-dot--ok" /> HYDRATION VALUE ALIGNED</div>
          <div class="incident-surface__body">
            <p class="eyebrow">障害ダッシュボード</p>
            <h2>レポートの生成日時</h2>
            <p class="timestamp timestamp--fixed" data-testid="fixed-timestamp">{{ formattedAt }}</p>
            <p class="incident-surface__note">SSRとhydrationは同じプレースホルダーから始まり、マウント後だけ利用者のタイムゾーン表示に更新します。</p>
          </div>
        </section>

        <section class="observation-section">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">観測 04</p>
            <h2>初回のHTMLと仮想DOMを一致させる。</h2>
          </div>
          <div class="observation-grid observation-grid--aligned">
            <ObservationWindow label="SSRとHydrationの初期値" environment="Server + Client" value="ブラウザ時刻を取得中…" tone="ok" />
            <ObservationWindow label="マウント後の表示" :environment="`Browser / ${browserTimeZone}`" :value="formattedAt" tone="ok" />
          </div>
          <p class="evidence-note evidence-note--ok"><strong>修正結果：</strong>Hydrationの比較対象を一致させたため、画面差し替えの警告を出さずにブラウザ用の表示へ更新できます。</p>
        </section>

        <section class="code-evidence code-evidence--fixed">
          <div>
            <p class="eyebrow">修正の核</p>
            <h2>環境依存のAPIはマウント後に読む。</h2>
          </div>
          <pre><code>const formattedAt = ref('ブラウザ時刻を取得中…')

onMounted(() => {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
  formattedAt.value = formatReportTime(tz)
})</code></pre>
          <p>SEOや初期HTMLに時刻が必要な要件であれば、`useState`でサーバー値をペイロードへ引き継ぐ選択肢もあります。この演習では、利用者固有の時刻表示を優先しています。</p>
        </section>

        <NuxtLink class="next-step next-step--ok" to="/">
          <span>演習を完了</span>
          <strong>観測の順番をもう一度確認する →</strong>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
