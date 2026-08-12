export const REPORT_INSTANT = '2026-08-01T09:00:00.000Z'

/**
 * 表示用日時をタイムゾーン付きで整形する。
 * SSRとブラウザで異なるtimeZoneを渡すと、同一の瞬間でもHTML文字列が変わる。
 */
export function formatReportTime(timeZone) {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
    timeZoneName: 'short',
  }).format(new Date(REPORT_INSTANT))
}
