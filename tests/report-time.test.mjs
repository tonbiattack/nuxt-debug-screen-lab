import assert from 'node:assert/strict'
import test from 'node:test'
import { REPORT_INSTANT, formatReportTime } from '../shared/report-time.mjs'

test('同じ瞬間でもUTCとAsia/Tokyoの表示文字列は異なる', () => {
  const utc = formatReportTime('UTC')
  const tokyo = formatReportTime('Asia/Tokyo')

  assert.equal(REPORT_INSTANT, '2026-08-01T09:00:00.000Z')
  assert.notEqual(utc, tokyo)
  assert.match(utc, /UTC/)
})

test('タイムゾーンを固定すればSSRとClientは同じ表示文字列を得られる', () => {
  assert.equal(formatReportTime('UTC'), formatReportTime('UTC'))
})
