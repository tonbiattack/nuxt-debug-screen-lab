// Design: Observatory Console — SSRとClientの観測値を対比し、事実を順に絞り込む。
export default defineNuxtConfig({
  compatibilityDate: '2026-08-12',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro: {
    publicAssets: [
      {
        baseURL: '/manus-storage',
        dir: '/home/ubuntu/webdev-static-assets',
      },
    ],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ja' },
      title: 'Nuxt Debug Observatory',
      meta: [
        {
          name: 'description',
          content: 'NuxtのSSRとクライアント描画差異を再現して切り分けるデバッグ演習',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/manus-storage/nuxt-debug-logo_b1ab8e3c.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Noto+Sans+JP:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@500;700;900&display=swap',
        },
      ],
    },
  },
})
