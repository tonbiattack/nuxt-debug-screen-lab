<!-- Design: Observatory Console — 画面の差異を、左の工程レールと右の観測記録で読む。 -->
<template>
  <main>
    <section class="hero">
      <div class="hero__shade" />
      <div class="hero__content">
        <p class="eyebrow eyebrow--light">NUXT DEBUG LAB / 01</p>
        <h1>画面がずれた。<br>まず、サーバーが何を描いたかを見る。</h1>
        <p class="hero__lead">
          同じ日時なのに、SSR直後とブラウザの描画後で表示が変わる。<br>
          この小さな演習では、NuxtのHydration mismatchを再現し、観測から修正までを追います。
        </p>
        <div class="hero__actions">
          <NuxtLink class="button button--signal" to="/buggy">バグを再現する <span>→</span></NuxtLink>
          <NuxtLink class="button button--quiet" to="/fixed">修正済みを見る</NuxtLink>
        </div>
      </div>
      <dl class="hero__facts" aria-label="今回の演習の条件">
        <div><dt>症状</dt><dd>日時表示の差し替わり</dd></div>
        <div><dt>対象</dt><dd>SSR / Hydration</dd></div>
        <div><dt>観測</dt><dd>HTML・Console・DOM</dd></div>
      </dl>
    </section>

    <section class="workbench">
      <InvestigationRail :active="1" />
      <div class="workbench__content">
        <header class="section-heading">
          <p class="eyebrow">観測する対象</p>
          <h2>「同じデータ」を、異なる環境で文字列にしている。</h2>
          <p>APIから返った時刻そのものではなく、時刻を表示用の文字列へ整形した結果が、サーバーとブラウザで異なります。</p>
        </header>

        <div class="comparison-card">
          <div class="comparison-card__meta">
            <span class="status-dot status-dot--error" />
            <p>意図的に作った再現条件</p>
          </div>
          <div class="comparison-card__code">
            <code>Intl.DateTimeFormat(...).format(new Date(...))</code>
          </div>
          <p>SSRはUTC、ブラウザは利用者のタイムゾーンで同じ瞬間を表示するため、HTMLの文字列が一致しません。</p>
        </div>

        <div class="route-grid">
          <NuxtLink class="route-card route-card--bug" to="/buggy">
            <div><span class="route-card__index">01</span><span class="state-label state-label--error">BUGGY</span></div>
            <h3>再現画面</h3>
            <p>SSR HTMLとClient値を分けて表示し、最終DOMとの差分を観測します。</p>
            <span class="route-card__link">観測を始める →</span>
          </NuxtLink>
          <NuxtLink class="route-card route-card--fixed" to="/fixed">
            <div><span class="route-card__index">02</span><span class="state-label state-label--ok">FIXED</span></div>
            <h3>修正画面</h3>
            <p>Hydration中は同じプレースホルダーを描画し、マウント後に表示を更新します。</p>
            <span class="route-card__link">修正を確認する →</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </main>
</template>
