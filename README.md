# Nuxt Debug Observatory

NuxtのSSRで生成された日時と、ブラウザがHydration時に期待する日時が食い違う画面表示バグを、**意図的に再現してから修正する**ための小さな学習プロジェクトです。

このリポジトリでは、固定した同一の瞬間`2026-08-01T09:00:00.000Z`を、サーバー側ではUTC、クライアント側では利用者のタイムゾーンで整形します。データ値が同じでも表示文字列が変わることを観測し、SSR HTMLとHydration後のDOMを分けて確認します。

## このプロジェクトで学べること

Hydrationの問題を「警告が出たから修正する」と扱うのではなく、再現可能な入力、SSRが返すHTML、ブラウザの最終DOM、修正後の初期値を順に比べる方法を学びます。NuxtではSSR時に`onMounted`が実行されず、ブラウザでマウントされた後に実行されます。この性質を使い、ブラウザ固有の表示をHydration完了後に更新します。[1]

| 観点 | バグありの`/buggy` | 修正後の`/fixed` |
| --- | --- | --- |
| SSRの初期表示 | `2026年8月1日 09:00 UTC` | `ブラウザ時刻を取得中…` |
| Clientの初期期待値 | `2026年8月1日 18:00 JST` | `ブラウザ時刻を取得中…` |
| Hydrationの比較対象 | 不一致 | 一致 |
| マウント後 | JST表記 | ブラウザのタイムゾーンで更新 |

## 構成

```text
nuxt-debug-screen-lab/
├── pages/
│   ├── index.vue             # 演習の概要と画面遷移
│   ├── buggy.vue             # 意図的に初期表示を食い違わせる再現画面
│   └── fixed.vue             # Hydrationの初期値をそろえる修正画面
├── shared/
│   └── report-time.mjs       # 固定の瞬間を指定タイムゾーンで整形する関数
├── tests/
│   └── report-time.test.mjs  # 表示差異が発生する前提を守るテスト
└── docs/
    ├── qiita-article.md      # Qiita用Front Matter付きの完成記事
    ├── debugging-record.md   # 実際の観測記録
    └── verification.md       # テスト・SSR HTML・最終DOMの検証結果
```

## 動かし方

Node.js 22以降とpnpmを用意してから、依存関係を導入し、開発サーバーを起動します。

```bash
pnpm install
pnpm dev
```

起動後は、次の順番で確認してください。

| 手順 | URLまたは操作 | 確認する事実 |
| --- | --- | --- |
| 1 | `/` | この演習が「SSR HTML」と「Clientの初期期待値」を比較する題材であることを把握する。 |
| 2 | `/buggy` | SSR観測窓が`09:00 UTC`、Client観測窓が`18:00 JST`であることを確認する。 |
| 3 | `curl http://127.0.0.1:3000/buggy` | ブラウザを通さず、サーバーが返したHTMLにUTCの文字列が含まれることを確認する。 |
| 4 | `/fixed` | SSRとHydrationの初期値が同じプレースホルダーから始まることを確認する。 |
| 5 | ブラウザの開発者ツール | 必要に応じてConsoleとElementsを確認し、最終DOMがいつ更新されるかを観測する。 |

## バグの仕組み

`pages/buggy.vue`では、`import.meta.server`で実行環境を分けています。同じ`Date`を整形していても、`timeZone`が違えばテキストは一致しません。

```js
const renderTimeZone = import.meta.server ? 'UTC' : 'Asia/Tokyo'
const formattedAt = formatReportTime(renderTimeZone)
```

ここで問題になるのは、値が同じ瞬間を指すかではなく、SSRが生成したテキストノードとクライアントがHydration開始時に期待するテキストノードが一致しているかです。Nuxtは、SSRとクライアントの出力が一貫していないこと、時間に依存する表示、ブラウザ専用APIの使用をHydrationの代表的な問題として挙げています。[2]

## 修正方針

`pages/fixed.vue`では、SSRとクライアントの初期値を同じプレースホルダーに固定します。利用者のブラウザに依存するタイムゾーン取得は、SSRでは実行されない`onMounted`の中へ移します。

```js
const formattedAt = ref('ブラウザ時刻を取得中…')

onMounted(() => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  formattedAt.value = formatReportTime(timeZone)
})
```

この実装は、利用者のローカル時刻を最終表示に使いたい場合に適しています。もし初期HTMLにも確定した値を出したいなら、`useState`、`useAsyncData`、`useFetch`などでSSRとクライアントが共有する状態を用意する方針を検討してください。[2]

## 検証コマンド

次のコマンドで、表示差異の前提、型、ビルドをそれぞれ確認できます。

```bash
pnpm test
pnpm typecheck
pnpm build
```

`pnpm test`は、同一の瞬間をUTCとAsia/Tokyoで整形すると異なる文字列になることを確認します。これはバグを再現するための前提をテストとして固定するものです。Hydration全体は、テストだけでなくSSR HTMLとブラウザの最終DOMを併せて確認してください。

## 記事と記録

Qiitaへ投稿できるFront Matter付き記事は[`docs/qiita-article.md`](docs/qiita-article.md)です。記事本文では、仮説、HTTPレスポンスの観測、最終DOMとの比較、修正、再発防止テストまでを説明しています。実際の観測結果は[`docs/debugging-record.md`](docs/debugging-record.md)、検証項目は[`docs/verification.md`](docs/verification.md)に記録しています。

## References

[1] [Nuxt: Nuxt Lifecycle](https://nuxt.com/docs/3.x/guide/concepts/nuxt-lifecycle)

[2] [Nuxt: Nuxt and hydration](https://nuxt.com/docs/3.x/guide/best-practices/hydration)
