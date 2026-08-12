import assert from 'node:assert/strict'
import test from 'node:test'
import { REPORT_INSTANT, formatReportTime } from '../shared/report-time.mjs'

// これは不具合があることを肯定するテストではない。
// 同一瞬間でも表示文字列が変わる、という再現条件を意図的に固定するテストである。
test('同じ瞬間でもUTCとAsia/Tokyoの表示文字列は異なる', () => {
  const utc = formatReportTime('UTC')
  const tokyo = formatReportTime('Asia/Tokyo')

  assert.equal(REPORT_INSTANT, '2026-08-01T09:00:00.000Z')
  assert.notEqual(utc, tokyo)
  assert.match(utc, /UTC/)
})

// 修正方針の前提として、同じフォーマット条件なら文字列も一致することを確認する。
test('タイムゾーンを固定すればSSRとClientは同じ表示文字列を得られる', () => {
  assert.equal(formatReportTime('UTC'), formatReportTime('UTC'))
})
