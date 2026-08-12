<!-- Design: Observatory Console — エラーを隠さず、SSR値とClient値の不一致を二連の観測窓に並べる。 -->
<script setup>
import { formatReportTime } from '~/shared/report-time.mjs'

useHead({ title: '再現画面 | Nuxt Debug Observatory' })

/**
 * 意図的な不一致を作る境界。
 *
 * <script setup>は、初回アクセスではSSR中にも、HTML受信後にはブラウザのHydration中にも評価される。
 * ここで環境ごとに異なるタイムゾーンを選ぶと、同じDateでも別のテキストノードが作られる。
 * 実務ではこの条件分岐を書かなくても、Node.jsのTZ設定とユーザー環境のTZ設定が異なれば同種の問題が起きる。
 */
const renderTimeZone = import.meta.server ? 'UTC' : 'Asia/Tokyo'
const formattedAt = formatReportTime(renderTimeZone)

// 以下の2値は画面上で原因を説明するための比較専用値である。
// 実際にHydrationされる値はformattedAtであり、固定の入力値を別々の形式で観測できるようにしている。
const serverValue = formatReportTime('UTC')
const clientValue = formatReportTime('Asia/Tokyo')
</script>

<template>
  <main class="lab-page">
    <section class="lab-page__titlebar">
      <NuxtLink class="back-link" to="/">← 演習の概要へ戻る</NuxtLink>
      <p class="eyebrow">STEP 01 / REPRODUCE</p>
      <h1>バグあり：日時が描画後にずれる</h1>
      <p>このページは、SSRとブラウザが同じ時刻を異なるタイムゾーンで整形する状態を意図的に作っています。</p>
    </section>

    <section class="lab-layout">
      <InvestigationRail :active="1" />
      <div class="lab-content">
        <section class="incident-surface incident-surface--bug">
          <div class="incident-surface__flag"><span class="status-dot status-dot--error" /> SSR / CLIENT OUTPUT DIFF</div>
          <div class="incident-surface__body">
            <p class="eyebrow">障害ダッシュボード</p>
            <h2>レポートの生成日時</h2>
            <p class="timestamp" data-testid="rendered-timestamp">{{ formattedAt }}</p>
            <p class="incident-surface__note">初期HTMLとHydration後の仮想DOMで、この文字列が一致しません。</p>
          </div>
        </section>

        <section class="observation-section">
          <div class="section-heading section-heading--compact">
            <p class="eyebrow">観測 01</p>
            <h2>値そのものではなく、表示文字列を比べる。</h2>
          </div>
          <div class="observation-grid observation-grid--mismatch">
            <ObservationWindow label="SSRが描いたHTML" environment="Node.js / UTC" :value="serverValue" tone="error" />
            <ObservationWindow label="Clientが期待する値" environment="Browser / Asia/Tokyo" :value="clientValue" tone="error" />
          </div>
          <p class="evidence-note"><strong>観測結果：</strong>ISO 8601の瞬間は同一でも、表示文字列が異なります。Consoleの警告だけに頼らず、SSR HTMLとHydration後のDOMを直接比較してください。</p>
        </section>

        <section class="code-evidence">
          <div>
            <p class="eyebrow">バグの核</p>
            <h2>サーバーとクライアントで、初回描画の結果を変えている。</h2>
          </div>
          <pre><code>const renderTimeZone = import.meta.server ? 'UTC' : 'Asia/Tokyo'
const formattedAt = formatReportTime(renderTimeZone)</code></pre>
          <p>実務では、明示的な条件分岐がなくても、サーバーのTZ設定とユーザーのブラウザ設定が違うだけで同じ現象が起きます。</p>
        </section>

        <NuxtLink class="next-step" to="/fixed">
          <span>次の工程</span>
          <strong>初回Hydrationの値を一致させて修正する →</strong>
        </NuxtLink>
      </div>
    </section>
  </main>
</template>
